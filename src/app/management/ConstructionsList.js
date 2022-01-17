import React, { Component } from "react";
import "../../firebase/config";
import Constructions from "../components/management/list-constructions/Constructions";

export class NewConstructions extends Component {
  render() {
    return (
      <div>
        <Constructions />
      </div>
    );
  }
}

export default NewConstructions;
