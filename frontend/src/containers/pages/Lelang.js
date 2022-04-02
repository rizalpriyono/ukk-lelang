import React, { Component } from "react";

import TemplateDashboard from "../templates/Dashboard";

class Lelang extends Component {
  render() {
    return <TemplateDashboard {...this.props} title={"Lelang"} />;
  }
}

export default Lelang;
