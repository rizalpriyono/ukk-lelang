import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import {
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

import { URL_API } from "../../config/index";

import axios from "axios";
import { styled } from "@mui/styles";

const InputStyle = styled("input")(({ theme }) => ({
  margin: 8,
  border: "none",
  borderRadius: 6,
  paddingLeft: 16,
  paddingRight: 16,
  fontSize: 14,
  fontFamily: "Poppins",
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

const TypoStyle = styled(Typography)(({ theme }) => ({
  color: "#353535",
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

const Register = (props) => {
  const [showPassword, setShowPassword] = useState(true);
  const [alert, setAlert] = useState({
    show: false,
    message: null,
  });
  const [snack, setSnack] = useState(false);
  const [RegisterProccess, setRegisterProccess] = useState(false);

  const fetchRegister = async (values, resetForm) => {
    setRegisterProccess(true);
    try {
      const response = await axios.post(
        `${URL_API}/masyarakat/register`,
        values
      );
      if (response) {
        setSnack(true);
        setRegisterProccess(false);
        resetForm();
      }
    } catch (error) {
      setAlert({
        show: true,
        message: "Username is already exist",
      });
      setRegisterProccess(false);
      resetForm();
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = yup.object({
    nama: yup.string("Enter your name").required("Name is required"),
    telp: yup
      .string()
      .required("Telepon is required")
      .max(12, "Number Phone be of maximum 12 number length")
      .matches(/^[0-9.]+$/, `Only numbers (1-9)`),
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
      nama: "",
      telp: "",
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      fetchRegister(values, resetForm);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Snackbar
          open={snack}
          autoHideDuration={5000}
          onClose={() => setSnack(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity="success"
            onClose={() => setSnack(false)}
            sx={{ width: "100%" }}
            style={{ minWidth: 500 }}
          >
            <b>Success. </b> Your account successfully register
          </Alert>
        </Snackbar>

        <DivStyle>
          <TypoStyle sx={{ fontWeight: 600, fontSize: 14, ml: 1, mr: 1 }}>
            Nama
          </TypoStyle>
          <InputStyle
            id="nama"
            name="nama"
            autoComplete="current-nama"
            placeholder="supriyadiiii"
            value={formik.values.nama || ""}
            onChange={formik.handleChange}
          />
          {formik.touched.nama && Boolean(formik.errors.nama) ? (
            <TypoError>{formik.touched.nama && formik.errors.nama}</TypoError>
          ) : null}
        </DivStyle>

        <DivStyle>
          <TypoStyle sx={{ fontWeight: 600, fontSize: 14, ml: 1, mr: 1 }}>
            Telepon
          </TypoStyle>
          <InputStyle
            id="telp"
            name="telp"
            autoComplete="current-telp"
            placeholder="081364018392"
            value={formik.values.telp || ""}
            onChange={formik.handleChange}
          />
          {formik.touched.telp && Boolean(formik.errors.telp) ? (
            <TypoError>{formik.touched.telp && formik.errors.telp}</TypoError>
          ) : null}
        </DivStyle>

        <DivStyle>
          <TypoStyle sx={{ fontWeight: 600, fontSize: 14, ml: 1, mr: 1 }}>
            Username
          </TypoStyle>
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
          <TypoStyle sx={{ fontWeight: 600, fontSize: 14, ml: 1, mr: 1 }}>
            Password
          </TypoStyle>
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

        <DivStyle style={{ width: 400, margin: "0px 32px" }}>
          <div style={{ margin: "0px 8px" }}>
            <FormControlLabel
              onClick={() => handleShowPassword()}
              control={
                <Checkbox
                  size="small"
                  sx={{
                    "&:hover": {
                      bgcolor: "transparent",
                    },
                  }}
                />
              }
              label={
                <TypoStyle sx={{ fontSize: 14, fontWeight: 500 }}>
                  Show Password
                </TypoStyle>
              }
            />
          </div>
        </DivStyle>

        <DivStyle style={{ width: 400, margin: "6px 32px" }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={RegisterProccess}
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
            {RegisterProccess && <CircularProgress size={24} />}

            {!RegisterProccess && (
              <Typography sx={{ fontWeight: 500 }}>Register</Typography>
            )}
          </Button>
        </DivStyle>
      </form>
    </>
  );
};

export default Register;
