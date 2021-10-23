import React, { Component } from "react";
import TableProducts from "../components/management/products-list/TableProducts";

export class ProductsList extends Component {
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

        <TableProducts />
      </div>
    );
  }
}

export default ProductsList;
