import React, { Component } from "react";
import "../../firebase/config";
import NewConstructionsForm from "../components/management/new-constructions/NewConstructionsForm";

export class NewConstructions extends Component {
  render() {
    return (
      <div>
        <NewConstructionsForm />
      </div>
    );
  }
}

export default NewConstructions;
