import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase/app";

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
    console.log(user);
    console.log(data);
    toast.info("Cadastrando Novo Produto", {
      icon: "⌛",
      theme: "dark",
    });
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
      .ref(`filiais/${user.id_filial}/estoque/produtos`);
    const newProductRef = productRef.push();

    newProductRef
      .set({
        cadastrado_por: user.nome,
        nome: data.product,
        qt_inicial: data.amount,
        qt_atual: data.amount,
        data: today,
        hora: time,
      })
      .then(() => {
        toast.success("Cadastro realizado com sucesso", {
          theme: "dark",
        });
      })
      .catch(() => {
        toast.error("Algo deu errado tente novamente", {
          theme: "dark",
        });
      });
    toast.clearWaitingQueue();
  };

  // if (user && user.tipo_atual === "novo") {
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
                      placeholder="Nome Produto (ex: martelo) "
                      {...register("product")}
                      // required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Quantidade"
                      {...register("amount")}
                      // required
                    />
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
