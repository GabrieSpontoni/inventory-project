import React, { Component } from "react";
import ConstructionsEdit from "../components/management/edit-constructions/ConstructionsEdit";

export class ConstructionsListEdit extends Component {
  render() {
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> Listar Produtos </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="!#" onClick={(event) => event.preventDefault()}>
                  Administração
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Listar Produtos
              </li>
            </ol>
          </nav>
        </div>

        <ConstructionsEdit />
      </div>
    );
  }
}

export default ConstructionsEdit;
