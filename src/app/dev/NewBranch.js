import React, { Component } from "react";
import { BranchForm } from "../components/dev/new-branch/BranchForm";
import "../../firebase/config";

export class NewBranch extends Component {
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
                  Nova Filial
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
          <BranchForm />
        </div>
      );
    }
  }
}

export default NewBranch;
