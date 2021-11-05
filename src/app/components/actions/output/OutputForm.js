import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import firebase from "firebase/app";

import "./OutputForm.css";

export function OutputForm() {
  const { register, handleSubmit, reset } = useForm();
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const productsList = [];
  const toastId = React.useRef(null);

  useEffect(() => {
    let isMounted = true;
    const dbRef = firebase.database().ref();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
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
    if (data) {
      let index = 0;
      Object.keys(data).map((key) => {
        index++;
        productsList.push({
          label: `${index} - ${data[key].categoria} - ${data[key].qt_atual} disponível`,
          id: key,
          qt_atual: data[key].qt_atual,
        });

        return 1;
      });
    }
  });

  const onSubmit = (data) => {
    const productChosen = productsList.find(
      (item) => item.label === data.produto
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
      .ref(`filiais/${user.id_filial}/estoque/acoes`);
    const newProductRef = productRef.push();
    const productKey = newProductRef.key;

    newProductRef
      .set({
        data: today,
        hora: time,
        id_prod: productChosen.id,
        obs: data.obs,
        quantidade: parseFloat(data.quantidade),
        realizado_por: user.nome,
        tipo: "retirada",
      })

      .then(() => {
        notify();
        const storageRef = firebase.storage().ref();
        let index = 0;
        const dataFilesLenght = Array.from(data.files).length;

        Array.from(data.files).forEach((file) => {
          storageRef
            .child(`filiais/${user.id_filial}/acoes/${productKey}/${file.name}`)
            .put(file)
            .then(function (snapshot) {
              index = index + 1;

              if (index === dataFilesLenght) {
                toast.success(
                  `Todas os dados e fotos foram salvos com sucesso`,
                  {
                    theme: "dark",
                    hideProgressBar: true,
                    autoClose: 4000,
                  }
                );
                dismiss();
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
    toast.clearWaitingQueue();
  };

  const notify = () =>
    (toastId.current = toast.loading(`Salvando Dados Aguarde...`, {
      theme: "dark",
      autoClose: false,
    }));

  const dismiss = () => toast.dismiss(toastId.current);

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Form elements </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Forms
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Form elements
            </li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Retirada do Estoque</h4>
              {data && (
                <form className="form-sample" onSubmit={handleSubmit(onSubmit)}>
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
                          required
                          {...register("produto")}
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
                      }}
                      label="Quantidade"
                      InputLabelProps={{
                        style: {
                          height: "100%",
                          color: "white",
                        },
                      }}
                      {...register("quantidade")}
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
                      label="Observação"
                      {...register("obs")}
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
                      <i className="icon-md mdi mdi-image-multiple"> Fotos</i>
                      <input
                        style={{ cursor: "pointer" }}
                        id="myInput"
                        type="file"
                        accept="image/*"
                        multiple
                        className="form-control"
                        required
                        {...register("files")}
                      />
                    </label>
                  </Form.Group>

                  <div>
                    <button type="submit" className="btn btn-primary mr-2">
                      Salvar
                    </button>
                    <ToastContainer limit={3} />
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
