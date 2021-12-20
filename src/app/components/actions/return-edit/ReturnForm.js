import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase/app";

import "./ReturnForm.css";

function ReturnForms() {
  const { register, handleSubmit, reset } = useForm();
  const toastId = React.useRef(null);
  const { idAction } = useParams();

  const [product, setProduct] = useState(null);
  const [action, setAction] = useState(null);
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(null);

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
        .ref()
        .child(`/filiais/${user.id_filial}/estoque/acoes/${idAction}`)
        .get()
        .then((snapshot) => {
          if (isMounted) {
            setAction({ ...snapshot.val() });

            firebase
              .database()
              .ref()
              .child(
                `/filiais/${user.id_filial}/estoque/produtos/${
                  snapshot.val().id_prod
                }`
              )
              .get()
              .then((snapshot) => {
                if (isMounted) {
                  setProduct(snapshot.val());
                }
              })
              .catch((error) => {
                console.error(error);
              });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [user, userID, idAction]);

  useEffect(() => {
    if (product) {
      console.log(action);
      console.log(product);
    }
  }, [action, product]);

  const onSubmit = (data) => {
    console.log(data);

    const date = new Date();
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = date.getFullYear();
    const today = `${dd}/${mm}/${yyyy}`;
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hour = date.getHours();
    const time = `${hour}:${minutes}:${seconds}`;

    const actionRef = firebase
      .database()
      .ref()
      .child(`filiais/${user.id_filial}/estoque/acoes/${idAction}/devolucoes`);
    const newActionRef = actionRef.push();
    const newActionKey = newActionRef.key;
    newActionRef
      .set({
        data: today,
        hora: time,
        id_prod: action.id_prod,
        id_usuario: userID,
        obs: data.obs,
        quantidade: parseFloat(data.amount),
        tipo: "devolucao",
      })
      .then(() => {
        notify();

        const updateOutput = {
          quantidade_devolvida:
            action.quantidade_devolvida + parseFloat(data.amount),
          status:
            data.checked === true ||
            parseFloat(data.amount) +
              parseFloat(action.quantidade_devolvida) ===
              parseFloat(action.quantidade_retirada)
              ? "devolvido"
              : "pendente",
        };

        const updateProduct = {
          qt_atual: product.qt_atual + parseFloat(data.amount),
        };
        firebase
          .database()
          .ref(`filiais/${user.id_filial}/estoque/acoes/${idAction}`)
          .update(updateOutput);
        firebase
          .database()
          .ref(`filiais/${user.id_filial}/estoque/produtos/${action.id_prod}`)
          .update(updateProduct);

        const storageRef = firebase.storage().ref();
        let index = 0;
        const dataFilesLenght = Array.from(data.files).length;

        Array.from(data.files).forEach((file) => {
          storageRef
            .child(
              `filiais/${user.id_filial}/acoes/${idAction}/devolucoes/${newActionKey}/${file.name}`
            )
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
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              {action && product && (
                <form className="form-sample" onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group>
                    <Form.Label>Produto</Form.Label>
                    <Form.Control
                      style={{ backgroundColor: "#30343c", color: "gray" }}
                      type="text"
                      className="form-control"
                      placeholder="Produto"
                      value={
                        product.categoria +
                        " - " +
                        action.quantidade_retirada +
                        " " +
                        "retirados"
                      }
                      disabled
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Quantidade a ser devolvida</Form.Label>
                    <Form.Control
                      type="number"
                      className="form-control"
                      placeholder="Quantidade devolvida"
                      defaultValue={
                        action.quantidade_retirada - action.quantidade_devolvida
                      }
                      {...register("amount")}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Obs</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Obs "
                      defaultValue={action.obs}
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

                  <Form.Group>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          className="checkbox"
                          type="checkbox"
                          defaultChecked={false}
                          {...register("checked")}
                        />{" "}
                        Não farei outras devoluções para este produto{" "}
                        <i className="input-helper" />
                      </label>
                    </div>
                  </Form.Group>

                  <div style={{ display: "flex" }}>
                    <button type="submit" className="btn btn-primary mr-2">
                      Salvar
                    </button>
                    <ToastContainer />
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

export default ReturnForms;
