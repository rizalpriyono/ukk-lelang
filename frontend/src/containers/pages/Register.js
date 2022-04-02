import React, { Component } from "react";

import TemplateRegister from "../templates/Register";

class Register extends Component {
  render() {
    return <TemplateRegister {...this.props} action={"register"} />;
  }
}

export default Register;
