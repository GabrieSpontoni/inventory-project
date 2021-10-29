import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import firebase from "firebase/app";

function ProductsEdit() {
  const { register, handleSubmit } = useForm();
  const { idProd } = useParams();

  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);

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

  // funtion to get the data from the database and set it to the state data
  useEffect(() => {
    let isMounted = true;

    if (user) {
      firebase
        .database()
        .ref(`/filiais/${user.id_filial}/estoque/produtos/${idProd}`)
        .once("value", (snapshot) => {
          if (isMounted) {
            setData(snapshot.val());
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [user, idProd]);
  // useEffect(() => {
  //   console.log(data);
  // });

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
    var updateData = {
      qt_atual: data.amount,
      categoria: data.category,
      descricao: data.description,
      tipo: data.type,
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
            realizada_por: user.nome,
            data: today,
            hora: time,
            obs: data.obs,
          })
          .then(() => {
            toast.success("Produto atualizado com sucesso!", {
              theme: "dark",
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
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Editar Produto</h4>

              {user && user.tipo_atual !== "administrador" && (
                <h4 style={{ color: "yellow" }}>
                  Seu perfil é do tipo "{user.tipo_atual}" e não possui acesso á
                  este recurso, caso queira obter acesso fale com seu superior.
                </h4>
              )}

              {user && user.tipo_atual === "administrador" && data && (
                <form className="form-sample" onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group>
                    <label>Categoria</label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Categoria "
                      defaultValue={data.categoria}
                      {...register("category")}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <label>Tipo</label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Tipo do Produto"
                      defaultValue={data.tipo}
                      {...register("type")}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <label>Descrição</label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Descrição do produto "
                      defaultValue={data.descricao}
                      {...register("description")}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <label>Unidade de Medida</label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Unidade de medida "
                      defaultValue={data.unidade_medida}
                      {...register("unity")}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <label>Quantidade</label>
                    <Form.Control
                      type="number"
                      className="form-control"
                      placeholder="Quantidade"
                      defaultValue={data.qt_inicial}
                      {...register("amount")}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <label>Observações</label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Obs"
                      {...register("obs")}
                      required
                    />
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
export default ProductsEdit;
