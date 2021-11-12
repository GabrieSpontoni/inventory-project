import React, { Component } from "react";
import ReturnForms from "../components/actions/return-edit/ReturnForm";

export class ReturnForm extends Component {
  render() {
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> Devolução </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="!#" onClick={(event) => event.preventDefault()}>
                  Ações
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Devoluções
              </li>
            </ol>
          </nav>
        </div>

        <ReturnForms />
      </div>
    );
  }
}

export default ReturnForm;
