import React from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase";

export function OutputForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    var date = new Date();
    var dd = String(date.getDate()).padStart(2, "0");
    var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = date.getFullYear();
    var today = `${dd}/${mm}/${yyyy}`;
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hour = date.getHours();
    var time = `${hour}:${minutes}:${seconds}`;
    var productRef = firebase.database().ref("Produtos/");
    var newProductRef = productRef.push();
    newProductRef
      .set({
        nome: "Gabriel Spontoni",
        produto: data.produto,
        quantidade: data.quantidade,
        data: today,
        hora: time,
        acao: "retirada",
        obs: data.obs,
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
              <form className="form-sample" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    className="form-control"
                    placeholder="Produto"
                    {...register("produto")}
                    // required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="number"
                    className="form-control"
                    id="exampleInputEmail3"
                    placeholder="Quantidade"
                    {...register("quantidade")}
                    // required
                  />
                </Form.Group>
                <Form.Group>
                  <div className="custom-file">
                    <Form.Control
                      type="file"
                      className="form-control visibility-hidden"
                      id="customFileLang"
                      lang="pt-br"
                      {...register("arquivo")}
                      // required
                    />
                    <label
                      className="custom-file-label"
                      htmlFor="customFileLang"
                    >
                      Upload imagem
                    </label>
                  </div>
                </Form.Group>
                <Form.Group>
                  <textarea
                    className="form-control"
                    id="exampleTextarea1"
                    rows="4"
                    placeholder="Observação"
                    {...register("obs")}
                    // required
                  ></textarea>
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
