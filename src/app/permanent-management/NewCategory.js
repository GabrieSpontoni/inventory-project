import React, { Component } from "react";
import "../../firebase/config";
import NewCategoryForm from "../components/permanent-management/new-category/NewCategoryForm";

export class NewProduct extends Component {
  render() {
    return (
      <div>
        <NewCategoryForm />
      </div>
    );
  }
}

export default NewProduct;
