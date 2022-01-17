import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase/app";

import { TextField } from "@mui/material";

export default function NewProductForm() {
  const { register, handleSubmit, reset } = useForm();
  const toastId = React.useRef(null);

  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
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
    notify();

    const constructionsRef = firebase
      .database()
      .ref(`filiais/${user.id_filial}/obras/`);
    const newConstructionsRef = constructionsRef.push();
    newConstructionsRef
      .set({
        id_usuario: userId,
        nome_obra: data.constructionsName.toLowerCase(),
        endereco_obra: data.constructionsAddress.toLowerCase(),
        cidade_obra: data.constructionsCity.toLowerCase(),
        responsavel: data.constructionsResponsible,
        telefone: data.constructionsPhone,
        email: data.constructionsEmail,
        data: today,
        hora: time,
      })
      .then(() => {
        dismiss();
        toast.success(
          `Obra ${data.constructionsName} cadastrada com sucesso!`,
          {
            theme: "dark",
            hideProgressBar: true,
            autoClose: 4000,
          }
        );
        reset();
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
<<<<<<< HEAD
        <h3 className="page-title"> Produtos Nexsolar </h3>
=======
        <h3 className="page-title"> Obras Nexsolar </h3>
>>>>>>> origin/ivp-1
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Cadastrar
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Nova Obra
            </li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Nova Obra</h4>

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
                      label="Nome da Obra"
                      {...register("constructionsName")}
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
                      label="Endereço da obra"
                      {...register("constructionsAddress")}
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
                      label="Cidade da obra"
                      {...register("constructionsCity")}
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
                      label="Responsável"
                      {...register("constructionsResponsible")}
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
                      label="Telefone"
                      {...register("constructionsPhone")}
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
                      label="Email"
                      {...register("constructionsEmail")}
                      required
                    />
                  </Form.Group>

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
