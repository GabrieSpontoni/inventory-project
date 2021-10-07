import React from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

export function OutputForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data.arquivo);
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
                {/* <input
                  name="message"
                  autoComplete="off"
                  {...register("message")}
                /> */}
                <Form.Group>
                  <Form.Control
                    type="text"
                    className="form-control"
                    placeholder="Produto"
                    {...register("produto")}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="number"
                    className="form-control"
                    id="exampleInputEmail3"
                    placeholder="Quantidade"
                    {...register("quantidade")}
                  />
                </Form.Group>
                <Form.Group>
                  <div className="custom-file">
                    <Form.Control
                      type="file"
                      className="form-control visibility-hidden"
                      id="customFileLang"
                      lang="es"
                      {...register("arquivo")}
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
                  ></textarea>
                </Form.Group>
                <button type="submit" className="btn btn-primary mr-2">
                  Submit
                </button>
                <button className="btn btn-dark">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
