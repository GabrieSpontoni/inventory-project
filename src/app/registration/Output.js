import React, { Component } from "react";

import bsCustomFileInput from "bs-custom-file-input";
import { OutputForm } from "../components/registration/output/OutputForm";
import TableOutput from "../components/registration/output/TableOutput";

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
