import { Grid } from "@mui/material";
import React, { Component } from "react";
import OrganismRegister from "../organisms/Register";

class Register extends Component {
  render() {
    return (
      <Grid container sx={{ height: "100vh" }} justifyContent="center">
        <Grid maxWidth="100%" width="50%">
          <OrganismRegister history={this.props.history} />
        </Grid>
      </Grid>
    );
  }
}

export default Register;
