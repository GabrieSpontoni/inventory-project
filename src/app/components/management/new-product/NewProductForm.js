import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase/app";
// import CSVReader from "react-csv-reader";

import "./NewProductForm.css";
import { TextField } from "@mui/material";

export default function NewProductForm() {
  const { register, handleSubmit, reset } = useForm();
  const toastId = React.useRef(null);

  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [amountUniqueIds, setAmountUniqueIds] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  // const [dataCsv, setDataCsv] = useState(null);

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
                setUserId(snapshot.key);
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

  const onSubmit = (data) => {
    const date = new Date();
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = date.getFullYear();
    const today = `${dd}/${mm}/${yyyy}`;
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hour = date.getHours();
    const time = `${hour}:${minutes}:${seconds}`;
    console.log(data);
    if (data.uniquesIds && data.checked) {
      const uniqueIds = [];
      data.uniquesIds.forEach((uniqueId) => {
        if (uniqueId !== "") {
          uniqueIds.push(uniqueId);
        }
      });
      if (checkDuplicate(uniqueIds)) {
        toast.error("Identificadores repetidos favor corrigir", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
        return;
      }
    }
    notify();

    Array.from({
      length: data.checked ? parseInt(amountUniqueIds) : 1,
    }).forEach((item, i) => {
      const productRef = firebase
        .database()
        .ref(`filiais/${user.id_filial}/estoque/produtos/`);
      const newProductRef = productRef.push();
      const productKey = newProductRef.key;
      newProductRef
        .set({
          id_usuario: userId,
          categoria: data.category.toLowerCase(),
          descricao:
            data.checked === true
              ? `${data.description} (${data.uniquesIds[i]})`
              : data.description,
          unidade_medida: data.unity,
          qt_inicial: data.checked === true ? 1 : parseFloat(data.amount),
          qt_atual: data.checked === true ? 1 : parseFloat(data.amount),
          obs: data.obs,
          data: today,
          hora: time,
          identificador: data.checked === true ? data.uniquesIds[i] : "null",
        })
        .then(() => {
          const storageRef = firebase.storage().ref();
          let j = 0;
          const dataFilesLenght = Array.from(data.files).length;

          Array.from(data.files).forEach((file) => {
            storageRef
              .child(
                `filiais/${user.id_filial}/produtos/${productKey}/${file.name}`
              )
              .put(file)
              .then(function (snapshot) {
                j = j + 1;
                console.log(j, amountUniqueIds);

                if (
                  (j === dataFilesLenght && i === amountUniqueIds - 1) ||
                  (j === dataFilesLenght && data.checked === false)
                ) {
                  toast.success(`Produtos salvos com sucesso`, {
                    theme: "dark",
                    hideProgressBar: true,
                    autoClose: 4000,
                  });
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
    });
  };

  function checkDuplicate(arr) {
    let result = false;
    const s = new Set(arr);
    if (arr.length !== s.size) {
      result = true;
    }
    return result;
  }

  const notify = () =>
    (toastId.current = toast.loading(`Salvando Dados Aguarde...`, {
      theme: "dark",
      autoClose: false,
    }));

  const dismiss = () => toast.dismiss(toastId.current);

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Produtos Nexsolar </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Cadastrar
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Novo Produto
            </li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Novo Produto</h4>

              {user && (
                <form className="form-sample" onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group>
                    <TextField
                      style={{
                        width: "100%",
                        backgroundColor: "#30343c",
                        borderRadius: "5px",
                      }}
                      InputLabelProps={{
                        style: {
                          height: "100%",
                          color: "white",
                        },
                      }}
                      sx={{ input: { color: "white" } }}
                      label="Descrição"
                      {...register("description")}
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
                      InputLabelProps={{
                        style: {
                          height: "100%",
                          color: "white",
                        },
                      }}
                      sx={{ input: { color: "white" } }}
                      label="Categoria"
                      {...register("category")}
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
                      InputLabelProps={{
                        style: {
                          height: "100%",
                          color: "white",
                        },
                      }}
                      sx={{ input: { color: "white" } }}
                      label="Unidade de medida"
                      {...register("unity")}
                      required
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
                      InputLabelProps={{
                        style: {
                          height: "100%",
                          color: "white",
                        },
                      }}
                      sx={{ input: { color: "white" } }}
                      label="Quantidade"
                      {...register("amount")}
                      onChange={(event) => {
                        setAmountUniqueIds(event.target.value);
                      }}
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
                      InputLabelProps={{
                        style: {
                          height: "100%",
                          color: "white",
                        },
                      }}
                      sx={{ input: { color: "white" } }}
                      label="Observação"
                      {...register("obs")}
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
                  <Form.Group>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          className="checkbox"
                          type="checkbox"
                          defaultChecked={false}
                          {...register("checked")}
                          onChange={(event) => {
                            if (event.target.checked) {
                              setIsChecked(true);
                            } else {
                              setIsChecked(false);
                            }
                          }}
                        />{" "}
                        Este produto possui identificador(es) único(s){" "}
                        <i className="input-helper" />
                      </label>
                    </div>
                  </Form.Group>

                  {isChecked && amountUniqueIds > 0 && (
                    <div style={{ color: "red" }}>
                      Atenção, produtos com id unicos serão cadastrados como
                      produtos diferentes, portanto verifique os todos os dados
                      (inclusive nome) com cautela antes de salvar, cada produto
                      será salvo como "Descrição (idUnico)".
                    </div>
                  )}
                  {isChecked &&
                    amountUniqueIds > 0 &&
                    Array.from({ length: amountUniqueIds }).map(
                      (item, index) => {
                        return (
                          <Form.Group style={{ marginTop: "10px" }} key={index}>
                            <TextField
                              style={{
                                width: "100%",
                                backgroundColor: "#30343c",
                                borderRadius: "5px",
                              }}
                              InputLabelProps={{
                                style: {
                                  height: "100%",
                                  color: "white",
                                },
                              }}
                              sx={{ input: { color: "white" } }}
                              label={`Identificador único ${index + 1}`}
                              {...register(`uniquesIds[${index}]`)}
                              required
                            />
                          </Form.Group>
                        );
                      }
                    )}

                  <div style={{ display: "flex" }}>
                    <button type="submit" className="btn btn-primary mr-2">
                      Salvar
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <ToastContainer limit={10} />
    </div>
  );
}
