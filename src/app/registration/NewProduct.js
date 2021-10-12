import React, { Component } from "react";
import "../../firebase/config";
import NewProductForm from "../components/registration/new-product/NewProductForm";

export class NewProduct extends Component {
  render() {
    const user = 1;
    if (user === 0) {
      return (
        <div>
          <div className="page-header">
            <h3 className="page-title"> Novo Produto </h3>
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
            <div className="col-md-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Cadastro</h4>
                  <div className="row">
                    <p className="text-warning">
                      Esta funcionalidade está disponível apenas para
                      administradores do estoque da Nexsolar, caso você entre
                      nesse requisito, solicite ao administrador para liberar
                      esta função
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <NewProductForm />
        </div>
      );
    }
  }
}

export default NewProduct;
