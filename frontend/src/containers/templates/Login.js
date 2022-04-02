import { Grid } from "@mui/material";
import React, { Component } from "react";

import OrganismLogin from "../organisms/Login";

class Login extends Component {
  render() {
    return (
      <Grid container sx={{ height: "100vh" }} justifyContent="center">
        <Grid maxWidth="100%" width="50%">
          <OrganismLogin history={this.props.history} />
        </Grid>
      </Grid>
    );
  }
}

export default Login;
