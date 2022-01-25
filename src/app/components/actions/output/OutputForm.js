import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { CircularProgress } from "@mui/material";
import firebase from "firebase/app";

import "./OutputForm.css";

export function OutputForm() {
  const history = useHistory();
  const { register, handleSubmit, reset } = useForm();
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(null);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);
  const [constructions, setConstructions] = useState([]);
  const productsList = [];
  const constructionsList = [];
  const [loading, setLoading] = useState(true);
  const toastId = React.useRef(null);

  useEffect(() => {
    let isMounted = true;
    const dbRef = firebase.database().ref();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserID(user.uid);
        dbRef
          .child(`usuarios/${user.uid}`)
          .get()
          .then((snapshot) => {
            if (isMounted) {
              if (snapshot.exists()) {
                setUser({ ...snapshot.val() });
              } else {
                console.log("No data available");
                setUser({});
              }
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        console.log("no user");
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (user) {
      firebase
        .database()
        .ref(`/filiais/${user.id_filial}/estoque/produtos/`)
        .orderByChild("tipo")
        .once("value", (snapshot) => {
          if (isMounted) {
            const items = [];

            snapshot.forEach((childSnapshot) => {
              items[childSnapshot.key] = childSnapshot.val();
            });
            setData(items);
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [user]);

  useEffect(() => {
    let isMounted = true;
    if (user) {
      firebase
        .database()
        .ref(`/filiais/${user.id_filial}/obras/`)
        .once("value", (snapshot) => {
          if (isMounted) {
            const items = [];

            snapshot.forEach((childSnapshot) => {
              items[childSnapshot.key] = childSnapshot.val();
            });
            setConstructions(items);
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [user]);

  useEffect(() => {
    if (data) {
      let index = 0;
      Object.keys(data).map((key) => {
        index++;
        productsList.push({
          label: `${index} - ${data[key].descricao} - ${data[key].qt_atual} ${data[key].unidade_medida}`,
          id: key,
          qt_atual: data[key].qt_atual,
          unidade_medida: data[key].unidade_medida,
        });

        setLoading(false);

        return 1;
      });
    }
  });

  useEffect(() => {
    if (constructions) {
      let index = 0;
      Object.keys(constructions).map((key) => {
        index++;
        constructionsList.push({
          label: `${index} - ${constructions[key].nome_obra} - ${constructions[key].endereco_obra}`,
          id: key,
        });
        setLoading(false);

        return 1;
      });
    }
  });

  // useEffect(() => {
  //   if (constructions && data && user) {
  //     console.log(constructions);
  //     console.log(data);
  //   }
  // }, [constructions, data, user]);

  const onSubmit = (data) => {
    if (toFindDuplicates(data.produto)) {
      toast.error("Produtos duplicados, favor verificar e corrigir", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    const amountOK = data.produto.map((item, index) => {
      let ok = true;

      productsList.map((product) => {
        if (item === product.label) {
          if (
            data.quantidade[index] > product.qt_atual ||
            data.quantidade[index] <= 0
          ) {
            dismiss();
            toast.error(`Quantidade indisponível (${product.label})`, {
              position: "top-right",

              theme: "dark",
              style: {
                width: "100%",
              },
            });
            // dismiss();
            ok = false;
          }
        }
        return ok;
      });
      return ok;
    });

    if (!amountOK.includes(false)) {
      notify();
      for (let i = 0; i < count; i++) {
        const productChosen = productsList.find(
          (item) => item.label === data.produto[i]
        );
        const constructionChosen = constructionsList.find(
          (item) => item.label === data.construction[i]
        );

        const date = new Date();
        const dd = String(date.getDate()).padStart(2, "0");
        const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = date.getFullYear();
        const today = `${dd}/${mm}/${yyyy}`;
        const seconds = date.getSeconds();
        const minutes = date.getMinutes();
        const hour = date.getHours();
        const time = `${hour}:${minutes}:${seconds}`;

        const productRef = firebase
          .database()
          .ref(
            `filiais/${user.id_filial}/estoque/produtos/${productChosen.id}`
          );

        productRef.once("value", (snapshot) => {
          if (snapshot) {
            const actiontRef = firebase
              .database()
              .ref(`filiais/${user.id_filial}/estoque/acoes`);
            const newActiontRef = actiontRef.push();
            const actionKey = newActiontRef.key;
            newActiontRef
              .set({
                data: today,
                hora: time,
                id_prod: productChosen.id,
                id_usuario: userID,
                id_obra: constructionChosen.id,
                obs: data.observacao[i],
                quantidade_retirada: parseFloat(data.quantidade[i]),
                quantidade_devolvida: 0,
                tipo: "retirada",
                status: "pendente",
              })
              .then(() => {
                productRef.update({
                  qt_atual: snapshot.val().qt_atual - data.quantidade[i],
                });

                const storageRef = firebase.storage().ref();
                let index = 0;
                const dataFilesLenght = Array.from(data.fotos[i]).length;

                Array.from(data.fotos[i]).forEach((file) => {
                  storageRef
                    .child(
                      `filiais/${user.id_filial}/acoes/${actionKey}/${file.name}`
                    )
                    .put(file)
                    .then(function (snapshot) {
                      index = index + 1;

                      if (index === dataFilesLenght && i === count - 1) {
                        dismiss();

                        console.log("Finalizado");
                        toast.success(`Dados salvos com sucesso`, {
                          theme: "dark",
                          hideProgressBar: false,
                          autoClose: 2000,
                          onClose: () => {
                            history.push("/actions/return");
                          },
                        });
                        reset();
                      }
                    })
                    .catch(() => {
                      console.log("upload fail");
                    });
                });
              })
              .catch(() => {
                toast.error("Algo deu errado tente novamente", {
                  theme: "dark",
                });
              });
          }
        });
      }
    }

    toast.clearWaitingQueue();
  };

  const notify = () =>
    (toastId.current = toast.loading(`Salvando Dados Aguarde...`, {
      theme: "dark",
      autoClose: false,
    }));

  const dismiss = () => toast.dismiss();

  function toFindDuplicates(products) {
    let arry = products;
    let resultToReturn = false;
    // call some function with callback function as argument
    resultToReturn = arry.some((element, index) => {
      if (element.length > 0) {
        return arry.indexOf(element) !== index;
      }
      return false;
    });
    if (resultToReturn) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Retiradas </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Ações
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Retiradas
            </li>
          </ol>
        </nav>
      </div>
      {loading && (
        <CircularProgress style={{ marginLeft: "50%", marginTop: "20%" }} />
      )}
      {!loading && (
        <TextField
          style={{
            backgroundColor: "#30343c",
            borderRadius: "5px",
            width: "100%",
            marginBottom: "10px",
          }}
          type="number"
          defaultValue={1}
          label="Quantidade de produtos que serão retirados"
          InputLabelProps={{
            style: {
              height: "100%",
              color: "white",
            },
          }}
          sx={{ input: { color: "white" } }}
          required
          onChange={(event) => {
            setCount(event.target.value < 50 ? event.target.value : 50);
          }}
        />
      )}

      {!loading && (
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <form className="form-sample" onSubmit={handleSubmit(onSubmit)}>
                  {count > 0 &&
                    Array.from({ length: count }).map((item, index) => (
                      <div key={index}>
                        <Form.Group>
                          <Autocomplete
                            style={{
                              backgroundColor: "#30343c",
                              borderRadius: "5px",
                            }}
                            disablePortal
                            id="combo-box-demo"
                            options={productsList}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Produto"
                                InputLabelProps={{
                                  style: {
                                    height: "100%",
                                    color: "white",
                                  },
                                }}
                                sx={{ input: { color: "white" } }}
                                required
                                {...register(`produto[${index}]`)}
                              />
                            )}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Autocomplete
                            style={{
                              backgroundColor: "#30343c",
                              borderRadius: "5px",
                            }}
                            disablePortal
                            id="combo-box-demo"
                            options={constructionsList}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Obra"
                                InputLabelProps={{
                                  style: {
                                    height: "100%",
                                    color: "white",
                                  },
                                }}
                                sx={{ input: { color: "white" } }}
                                required
                                {...register(`construction[${index}]`)}
                              />
                            )}
                          />
                        </Form.Group>
                        <Form.Group>
                          <TextField
                            type="number"
                            style={{
                              width: "100%",
                              backgroundColor: "#30343c",
                              borderRadius: "5px",
                              color: "white",
                            }}
                            label="Quantidade"
                            InputLabelProps={{
                              style: {
                                height: "100%",
                                color: "white",
                              },
                            }}
                            sx={{ input: { color: "white" } }}
                            {...register(`quantidade[${index}]`)}
                            required
                          />
                        </Form.Group>
                        <Form.Group>
                          <TextField
                            style={{
                              width: "100%",
                              backgroundColor: "#30343c",
                              borderRadius: "5px",
                            }}
                            id="exampleTextarea1"
                            InputLabelProps={{
                              style: {
                                height: "100%",
                                color: "white",
                              },
                            }}
                            sx={{ input: { color: "white" } }}
                            label="Observação"
                            {...register(`observacao[${index}]`)}
                            required
                          />
                        </Form.Group>
                        <Form.Group
                          style={{
                            textAlign: "center",
                            border: "1px solid white",
                          }}
                        >
                          <label
                            style={{
                              width: "100%",
                              display: "inline-block",
                              marginBottom: "0%",
                              cursor: "pointer",
                            }}
                          >
                            <i className="icon-md mdi mdi-image-multiple">
                              {" "}
                              Fotos
                            </i>
                            <input
                              style={{ cursor: "pointer" }}
                              id="myInput"
                              type="file"
                              accept="image/*"
                              multiple
                              className="form-control"
                              required
                              {...register(`fotos[${index}]`)}
                            />
                          </label>
                        </Form.Group>
                      </div>
                    ))}
                  {count > 0 && (
                    <div>
                      <button type="submit" className="btn btn-primary mr-2">
                        Salvar
                      </button>
                      <ToastContainer limit={3} />
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
