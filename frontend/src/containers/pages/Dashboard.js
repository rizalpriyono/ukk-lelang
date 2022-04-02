import React, { Component } from "react";

import TemplateDashboard from "../templates/Dashboard";

class Dashboard extends Component {
  render() {
    return <TemplateDashboard {...this.props} title={"Dashboard"} />;
  }
}

export default Dashboard;
