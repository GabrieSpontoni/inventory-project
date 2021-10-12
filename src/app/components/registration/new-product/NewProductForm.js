import React from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase/app";
import "firebase/database";

export default function NewProductForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    toast.info("Cadastrando Nova Filial", {
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
      .ref("filiais/-MlhSXCV2jOipziUjiQA/estoque/produtos");
    const newProductRef = productRef.push();

    newProductRef
      .set({
        test: "ola",
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
