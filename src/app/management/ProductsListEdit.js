import React, { Component } from "react";
import ProductsEdit from "../components/management/products-edit/ProductsEdit";

export class ProductsListEdit extends Component {
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

        <ProductsEdit />
      </div>
    );
  }
}

export default ProductsEdit;
