import React, { Component } from "react";
import "../../firebase/config";
import NewProductForm from "../components/management/new-product/NewProductForm";

export class NewProduct extends Component {
  render() {
    return (
      <div>
        <NewProductForm />
      </div>
    );
  }
}

export default NewProduct;
