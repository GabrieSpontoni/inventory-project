import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

import firebase from "firebase/app";

function ProductsEdit() {
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const { idProd } = useParams();

  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amountUniqueIds, setAmountUniqueIds] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

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

  useEffect(() => {
    let isMounted = true;

    if (user) {
      firebase
        .database()
        .ref(`/filiais/${user.id_filial}/estoque/produtos/${idProd}`)
        .once("value", (snapshot) => {
          if (isMounted) {
            setProduct(snapshot.val());
            if (
              snapshot.val().identificador &&
              snapshot.val().identificador.length > 0 &&
              snapshot.val().identificador !== "null"
            ) {
              setIsChecked(true);
            }
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [user, idProd]);

  useEffect(() => {
    if (product && user) {
      setAmountUniqueIds(product.qt_inicial);
      setLoading(false);
    }
  }, [product, user]);

  function removeLastWord(str) {
    var lastIndex = str.lastIndexOf(" ");

    str = str.substring(0, lastIndex);
    return str;
  }

  const onSubmit = (data) => {
    const diference = data.amount - product.qt_inicial;
    if (product.qt_atual + diference < 0) {
      toast.error("Erro Inesperado", {
        theme: "dark",
      });
      return;
    }
    const date = new Date();
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = date.getFullYear();
    const today = `${dd}/${mm}/${yyyy}`;
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hour = date.getHours();
    const time = `${hour}:${minutes}:${seconds}`;
    var updateData = {
      qt_inicial: parseFloat(data.amount),
      qt_atual: product.qt_atual + diference,
      categoria: data.category,
      descricao: `${data.description} (${data.uniqueId})`,
      obs: data.obs_product,
      identificador: data.checked === true ? data.uniqueId : "null",
      unidade_medida: data.unity,
    };

    firebase
      .database()
      .ref(`/filiais/${user.id_filial}/estoque/produtos/${idProd}`)
      .update(updateData)
      .then(() => {
        firebase
          .database()
          .ref(`/filiais/${user.id_filial}/estoque/acoes/`)
          .push()
          .set({
            id_prod: idProd,
            tipo: "alteracao",
            realizada_por: userId,
            data: today,
            hora: time,
            obs: data.obs,
          })
          .then(() => {
            toast.success("Produto atualizado com sucesso!", {
              theme: "dark",
              autoClose: 3000,
              onClose: () => {
                history.push("/management/products-list");
              },
            });
          });
      });
  };

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
      {loading && (
        <CircularProgress style={{ marginLeft: "50%", marginTop: "20%" }} />
      )}
      {!loading && (
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Editar Produto</h4>

                <form className="form-sample" onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group>
                    <TextField
                      defaultValue={
                        product.identificador !== undefined &&
                        product.identificador !== "null"
                          ? removeLastWord(product.descricao)
                          : product.descricao
                      }
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
                      defaultValue={product.categoria}
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
                      defaultValue={product.unidade_medida}
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
                      defaultValue={product.qt_inicial}
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
                      defaultValue={product.obs}
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
                      label="Observação do produto"
                      {...register("obs_product")}
                    />
                  </Form.Group>

                  <Form.Group>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          className="checkbox"
                          type="checkbox"
                          defaultChecked={isChecked}
                          {...register("checked")}
                          onChange={(event) => {
                            if (event.target.checked) {
                              setIsChecked(true);
                            } else {
                              setIsChecked(false);
                            }
                          }}
                        />{" "}
                        Este produto possui identificador único
                        <i className="input-helper" />
                      </label>
                    </div>
                  </Form.Group>
                  {isChecked && amountUniqueIds > 0 && amountUniqueIds >= 2 && (
                    <div style={{ color: "red" }}>
                      Produtos com id unico são tratados de forma independente
                      por isso só é permitido 1 por vez na edição
                    </div>
                  )}
                  {isChecked && amountUniqueIds > 0 && amountUniqueIds < 2 && (
                    <Form.Group>
                      <TextField
                        defaultValue={
                          product.identificador !== undefined &&
                          product.identificador !== "null"
                            ? product.identificador
                            : ""
                        }
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
                        label={`Identificador único`}
                        {...register(`uniqueId`)}
                        required
                      />
                    </Form.Group>
                  )}

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
                      label="Observação sobre o que foi mudado no produto"
                      {...register("obs")}
                      required
                    />
                  </Form.Group>

                  <div style={{ display: "flex" }}>
                    <button type="submit" className="btn btn-primary mr-2">
                      Salvar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer limit={10} />
    </div>
  );
}
export default ProductsEdit;
