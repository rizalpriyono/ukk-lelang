import React, { Component } from "react";

import TemplateTawarBarang from "../templates/TawarBarang";

class TawarBarang extends Component {
  render() {
    return <TemplateTawarBarang {...this.props} />;
  }
}

export default TawarBarang;
