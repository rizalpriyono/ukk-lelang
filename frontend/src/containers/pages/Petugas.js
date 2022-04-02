import React, { Component } from "react";

import TemplateDashboard from "../templates/Dashboard";

class Petugas extends Component {
  render() {
    return <TemplateDashboard {...this.props} title={"Petugas"} />;
  }
}

export default Petugas;
