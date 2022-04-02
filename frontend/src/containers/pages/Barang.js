import React, { Component } from "react";

import TemplateDashboard from "../templates/Dashboard";

class Barang extends Component {
  render() {
    return <TemplateDashboard {...this.props} title={"Barang"} />;
  }
}

export default Barang;
