import React, { Component } from "react";
import TableManagement from "../components/management/release-access/TableReleaseAccess";

export class ReleaseAccess extends Component {
  render() {
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> Liberar acessos </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="!#" onClick={(event) => event.preventDefault()}>
                  Administração
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Liberar acessos
              </li>
            </ol>
          </nav>
        </div>

        <TableManagement />
      </div>
    );
  }
}

export default ReleaseAccess;
