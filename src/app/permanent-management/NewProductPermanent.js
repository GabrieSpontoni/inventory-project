import React, { Component } from "react";
import "../../firebase/config";
import NewProductPermanentForm from "../components/permanent-management/new-product-permanent/NewProductPermanentForm";

export class NewProductPermanent extends Component {
  render() {
    return (
      <div>
        <NewProductPermanentForm />
      </div>
    );
  }
}

export default NewProductPermanent;
