import React, { Component } from "react";
import "../../firebase/config";
import ListCategoryTable from "../components/permanent-management/list-category/ListCategoryTable";

export class ListCategory extends Component {
  render() {
    return (
      <div>
        <ListCategoryTable />
      </div>
    );
  }
}

export default ListCategory;
