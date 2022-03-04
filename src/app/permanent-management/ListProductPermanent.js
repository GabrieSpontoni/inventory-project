import React, { Component } from "react";
import "../../firebase/config";
import ListProductPermanentTable from "../components/permanent-management/list-product-permanent/ListProductPermanentTable";

export class ListProductPermanent extends Component {
  render() {
    return (
      <div>
        <ListProductPermanentTable />
      </div>
    );
  }
}

export default ListProductPermanent;
