import React, { Component } from "react";

import TemplateLogin from "../templates/Login";

class Login extends Component {
  render() {
    return <TemplateLogin {...this.props} action={"login"} />;
  }
}

export default Login;
