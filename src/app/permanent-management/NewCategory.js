import React, { Component } from "react";
import "../../firebase/config";
import NewCategoryForm from "../components/permanent-management/new-category/NewCategoryForm";

export class NewCategory extends Component {
  render() {
    return (
      <div>
        <NewCategoryForm />
      </div>
    );
  }
}

export default NewCategory;
