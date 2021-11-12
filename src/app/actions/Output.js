import React, { Component } from "react";

import bsCustomFileInput from "bs-custom-file-input";
import { OutputForm } from "../components/actions/output/OutputForm";
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
      </div>
    );
  }
}

export default Output;
