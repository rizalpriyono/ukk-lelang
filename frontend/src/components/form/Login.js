import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import {
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

import { ROUTES, URL_API } from "../../config/index";

import axios from "axios";
import { useHistory } from "react-router";
import { styled } from "@mui/styles";

const InputStyle = styled("input")(({ theme }) => ({
  margin: 8,
  border: "none",
  borderRadius: 6,
  paddingLeft: 16,
  paddingRight: 16,
  fontFamily: "Poppins",
  fontSize: 14,
  fontWeight: 300,
  width: "100%",
  letterSpacing: 0.3,
  height: 40,
  backgroundColor: "#eaeef2",
  "&:focus": {
    border: "none",
    outline: "none",
  },
}));

const TypoError = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  marginLeft: 8,
  opacity: 0.7,
  color: "#CE1C1C",
}));

const DivStyle = styled("div")(({ theme }) => ({
  width: 400,
  margin: "6px 32px",
}));

const Login = (props) => {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(true);
  const [alert, setAlert] = useState({
    show: false,
    message: null,
  });
  const [loginProcess, setLoginProcess] = useState(false);

  const submitLogin = async (values) => {
    setLoginProcess(true);
    try {
      const responseLogin = await axios.post(`${URL_API}/login`, values);
      if (!responseLogin.data.logged) {
        setAlert({
          show: true,
          message: "Invalid username or password",
        });
        setLoginProcess(false);
      } else if (responseLogin.data.logged) {
        setAlert({
          show: false,
          message: null,
        });
        localStorage.setItem("token", responseLogin.data.token);
        localStorage.setItem(
          "userLogin",
          JSON.stringify(responseLogin.data.data)
        );
        localStorage.setItem("role", responseLogin.data.data.level);

        setLoginProcess(false);
        return history.push(ROUTES.DASHBOARD);
      }
    } catch (error) {
      setLoginProcess(false);
      console.log(error);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = yup.object({
    username: yup
      .string("Enter your username")
      .required("Username is required"),
    password: yup
      .string("Enter your password")
      .min(6, "Password should be of minimum 6 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      submitLogin(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <DivStyle>
        <Typography sx={{ fontWeight: 600, fontSize: 14, ml: 1, mr: 1 }}>
          Username
        </Typography>
        <InputStyle
          id="username"
          name="username"
          autoComplete="current-username"
          placeholder="username"
          value={formik.values.username || ""}
          onChange={formik.handleChange}
        />
        {(formik.touched.username && Boolean(formik.errors.username)) ||
        alert.show ? (
          <TypoError>
            {(formik.touched.username && formik.errors.username) ||
              alert.message}
          </TypoError>
        ) : null}
      </DivStyle>

      <DivStyle>
        <Typography sx={{ fontWeight: 600, fontSize: 14, ml: 1, mr: 1 }}>
          Password
        </Typography>
        <InputStyle
          id="password"
          name="password"
          autoComplete="current-password"
          placeholder="password"
          type={showPassword ? "password" : "text"}
          value={formik.values.password || ""}
          onChange={formik.handleChange}
        />
        {formik.touched.password && Boolean(formik.errors.password) ? (
          <TypoError>
            {formik.touched.password && formik.errors.password}
          </TypoError>
        ) : null}
      </DivStyle>

      <div style={{ marginLeft: 40 }}>
        <FormControlLabel
          onClick={() => handleShowPassword()}
          control={
            <Checkbox
              checked={!showPassword}
              size="small"
              sx={{
                "&:hover": {
                  bgcolor: "transparent",
                },
              }}
            />
          }
          label={
            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
              Show Password
            </Typography>
          }
        />
      </div>

      <DivStyle style={{ width: 400, margin: "6px 32px" }}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loginProcess}
          sx={{
            m: 1,
            textTransform: "capitalize",
            backgroundColor: "#FE2E12",
            boxShadow: "none",
            padding: "8px 64px",
            letterSpacing: 0.5,
            "&:hover": {
              boxShadow: "none",
              backgroundColor: "#FE2E12",
            },
          }}
        >
          {loginProcess && <CircularProgress size={24} />}

          {!loginProcess && (
            <Typography sx={{ fontWeight: 500 }}>Sign in</Typography>
          )}
        </Button>
      </DivStyle>
    </form>
  );
};

export default Login;
