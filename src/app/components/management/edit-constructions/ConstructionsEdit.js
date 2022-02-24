import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import firebase from "firebase/app";

function ProductsEdit() {
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const { idConstruction } = useParams();

  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [construction, setConstrution] = useState(null);
  const [loading, setLoading] = useState(true);

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
        .ref(`/filiais/${user.id_filial}/obras/${idConstruction}`)
        .once("value", (snapshot) => {
          if (isMounted) {
            setConstrution(snapshot.val());
          }
        });
    }
    console.log(user);

    return () => {
      isMounted = false;
    };
  }, [user, idConstruction]);

  useEffect(() => {
    if (construction && user) {
      setLoading(false);
      console.log(construction);
    }
  }, [construction, user]);

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
      nome_obra: data.name_construction,
      endereco_obra: data.address,
      cidade_obra: data.city,
      responsavel: data.responsible,
    };

    firebase
      .database()
      .ref(`/filiais/${user.id_filial}/obras/${idConstruction}`)
      .update(updateData)
      .then(() => {
        firebase
          .database()
          .ref(`/filiais/${user.id_filial}/estoque/alteracoes_obras/`)
          .push()
          .set({
            id_obra: idConstruction,
            tipo: "alteracao_obra",
            realizada_por: userId,
            data: today,
            hora: time,
            obs: data.obs,
          })
          .then(() => {
            toast.success("Obra atualizada com sucesso!", {
              theme: "dark",
              autoClose: 3000,
              onClose: () => {
                history.push("/management/constructions-list");
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
                Administração
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Editar Obras
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
                <h4 className="card-title">Editar Obra</h4>

                <form className="form-sample" onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group>
                    <label>Nome</label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Nome da Obra "
                      defaultValue={construction.nome_obra}
                      {...register("name_construction")}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <label>Endereço</label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Endereço da obra"
                      defaultValue={construction.endereco_obra}
                      {...register("address")}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <label>Cidade</label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Cidade"
                      defaultValue={construction.cidade_obra}
                      {...register("city")}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <label>Responsável</label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Responsável"
                      defaultValue={construction.responsavel}
                      {...register("responsible")}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <label>O que foi mudado nesta obra??</label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder=""
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ProductsEdit;
