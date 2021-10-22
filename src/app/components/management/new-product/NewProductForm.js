import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase/app";

import "./NewProductForm.css";

export default function NewProductForm() {
  const { register, handleSubmit } = useForm();

  const [user, setUser] = useState(null);

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

  const onSubmit = (data) => {
    // console.log(data);

    // console.log(user);

    // toast.info("Cadastrando Novo Produto", {
    //   icon: "⌛",
    //   theme: "dark",
    // });
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
      .ref(`filiais/${user.id_filial}/estoque/produtos/`);
    const newProductRef = productRef.push();
    const productKey = newProductRef.key;
    newProductRef
      .set({
        cadastrado_por: user.nome,
        categoria: data.category.toLowerCase(),
        tipo: data.type.toLowerCase(),
        descricao: data.description,
        unidade_medida: data.unity,
        qt_inicial: data.amount,
        qt_atual: data.amount,
        data: today,
        hora: time,
      })
      .then(() => {
        toast.info(
          `Cadastro no banco de Dados OK! Realizando upload das suas ${data.files.length} Fotos Aguarde`,
          {
            icon: "⌛",
            theme: "dark",
          }
        );
        const storageRef = firebase.storage().ref();

        for (let i = 0; i < data.files.length; i++) {
          storageRef
            .child(
              `filiais/${user.id_filial}/produtos/${productKey}/${data.files[i].name}`
            )
            .put(data.files[i])
            .then(function (snapshot) {
              toast.success(`${data.files[i].name} upload OK`, {
                theme: "dark",
                position: "top-center",
              });
            })
            .catch(() => {
              console.log("upload fail");
            });
        }
      })
      .catch(() => {
        toast.error("Algo deu errado tente novamente", {
          theme: "dark",
        });
      });

    toast.clearWaitingQueue();
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
              <h4 className="card-title">Novo Produto</h4>
              {user && user.tipo_atual === "administrador" && (
                <form className="form-sample" onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Categoria "
                      {...register("category")}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Tipo do Produto"
                      {...register("type")}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Descrição do produto "
                      {...register("description")}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Unidade de medida "
                      {...register("unity")}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Quantidade"
                      {...register("amount")}
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

              {user && user.tipo_atual !== "administrador" && (
                <h4 style={{ color: "#E51212" }}>
                  Seu perfil é do tipo "{user.tipo_atual}" e não possui acesso
                  para está função, apenas administrador pode acessar
                </h4>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
