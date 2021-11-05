import React, { Component } from "react";

import bsCustomFileInput from "bs-custom-file-input";
import { OutputForm } from "../components/actions/output/OutputForm";
import TableOutput from "../components/actions/output/TableOutput";
import "../../firebase/config";

class Output extends Component {
  state = {
    startDate: new Date(),
  };

  handleChange = (date) => {
    this.setState({
      startDate: date,
    });
  };

  componentDidMount() {
    bsCustomFileInput.init();
  }

  render() {
    return (
      <div>
        <OutputForm />
        <TableOutput />
      </div>
    );
  }
}

export default Output;
