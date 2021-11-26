import React, { Component } from "react";
import "../../firebase/config";
import { Photos } from "../components/management/products-list-photos/Photos";

export class ProductsListPhotos extends Component {
  render() {
    return (
      <div>
        <Photos />
      </div>
    );
  }
}

export default ProductsListPhotos;
