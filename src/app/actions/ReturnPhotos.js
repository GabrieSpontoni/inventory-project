import React, { Component } from "react";
import "../../firebase/config";
import { Photos } from "../components/actions/return-photos/Photos";

export class ReturnPhotos extends Component {
  render() {
    return (
      <div>
        <Photos />
      </div>
    );
  }
}

export default ReturnPhotos;
