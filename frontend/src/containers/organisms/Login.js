import React from "react";
import { Typography, Stack } from "@mui/material";

import FormLogin from "../../components/form/Login";
import { ROUTES } from "../../config";

const Login = (props) => {
  const handleRegister = () => {
    return props.history.push(ROUTES.REGISTER);
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
          Sign in to Lelang
        </Typography>
      </div>

      <FormLogin />

      <div className="textMovePageLogin">
        <Typography>Don’t have an account?</Typography>
        <Typography
          onClick={() => handleRegister()}
          sx={{
            fontWeight: 600,
            ml: 1,
            color: "#FE2E12",
            cursor: "pointer",
          }}
        >
          Create Account
        </Typography>
      </div>
    </Stack>
  );
};

export default Login;
