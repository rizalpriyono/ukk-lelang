import React from "react";
import { Typography, Stack } from "@mui/material";

import FormRegister from "../../components/form/Register";
import { ROUTES } from "../../config";

const Register = (props) => {
  const handleRegister = () => {
    return props.history.push(ROUTES.LOGIN);
  };
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh", width: "100%" }}
    >
      <div>
        <Typography
          align="center"
          sx={{ fontWeight: 700, fontSize: 32, mb: 5 }}
        >
          Wellcome to Buakags
        </Typography>
      </div>

      {/*Form Register*/}
      <FormRegister />

      <div className="textMovePageLogin">
        <Typography>Already have an account?</Typography>
        <Typography
          onClick={() => handleRegister()}
          sx={{
            fontWeight: 600,
            ml: 1,
            color: "#FE2E12",
            cursor: "pointer",
          }}
        >
          Sign in
        </Typography>
      </div>
    </Stack>
  );
};

export default Register;
