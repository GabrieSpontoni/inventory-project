import React, { Component } from "react";
import "../../firebase/config";
import { Photos } from "../components/dashboard/Photos";

export class DashboardPhotos extends Component {
  render() {
    return (
      <div>
        <Photos />
      </div>
    );
  }
}

export default DashboardPhotos;
