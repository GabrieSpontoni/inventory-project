import React from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase/app";

export function OutputForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    toast.info("Cadastrando Retirada do Estoque", {
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
    const productRef = firebase.database().ref("Produtos/");
    const newProductRef = productRef.push();

    newProductRef
      // .set({
      //   nome: "Gabriel Spontoni",
      //   produto: data.produto,
      //   quantidade: data.quantidade,
      //   data: today,
      //   hora: time,
      //   acao: "retirada",
      //   obs: data.obs,
      // })
      .set({
        cadastrado_por: "Gabriel",
        nome: "martelo",
        quantidade_inicial: 20,
        quantidade_atual: 12,
        acoes: {
          retiradas: {
            cadastrado_por: "Amauri",
            data: today,
            hora: time,
            quantidade: 10,
          },
          devolucoes: {
            cadastrado_por: "Amauri",
            data: today,
            hora: time,
            quantidade: 2,
          },
        },

        data: today,
        hora: time,
        obs: data.obs,
      })
      .then(() => {
        const file = data.arquivo[0];
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(
          `/${newProductRef.key}/${data.arquivo[0].name}`
        );
        fileRef
          .put(file)
          .then(() => {
            toast.success("Cadastro realizado com sucesso", {
              theme: "dark",
            });
          })
          .catch(() => {
            toast.error("Algo deu errado tente novamente");
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
