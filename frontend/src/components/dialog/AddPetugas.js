import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import { URL_API } from "../../config/index";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const TextFieldStyle = styled(TextField)({
  "& label.Mui-focused": {
    color: "#434AAB",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#434AAB",
    },
  },
});

const AddPetugas = (props) => {
  const [alert, setAlert] = useState({
    show: false,
    message: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [level, setLevel] = useState(false);

  const handleClose = () => {
    props.closeDialog();
    formik.resetForm();
    setAlert({ show: false, message: null });
  };

  const fetchAddPetugas = async (values, resetForm) => {
    try {
      const response = await axios.post(`${URL_API}/petugas`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.code === 200) {
        props.closeDialog();
        props.processAdd();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = yup.object({
    nama: yup
      .string("Enter your nama")
      .required("Masukan nama")
      .min(3, "Nama terlalu pendek"),
    level: yup.string("Enter your level").required("Masukan level"),
    username: yup
      .string("Enter your username")
      .strict(true)
      .required("Masukan username")
      .min(3, "Username terlalu pendek")
      .lowercase("Username harus lowercase")
      .matches(/^(\S+$)/, "Tidak bisa menggunakan space")
      .matches(
        /^[a-zA-Z0-9-_]+$/,
        `Only contain letters, numbers, underscores ( _ ) and dash ( - )`
      ),
    password: yup
      .string("Enter your password")
      .min(6, "Password panjang minimal 6 charakter")
      .required("Masukan password"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nama: "",
      level: "",
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      fetchAddPetugas(values, resetForm);
      console.log(values);
    },
  });

  return (
    <>
      <div>
        <Dialog
          hideBackdrop={true}
          sx={{
            backgroundColor: "rgba(111, 126, 140, 0.2)",
            backdropFilter: "blur(4px)",
          }}
          PaperProps={{
            elevation: 0,
            sx: {
              borderRadius: "8px",
              boxShadow: "none",
            },
          }}
          open={props.open}
          onClose={props.closeDialog}
          width="xs"
          maxWidth={"xs"}
        >
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle>Tambah Petugas</DialogTitle>
            <DialogContent>
              <div className="layout-input-barang">
                <TextFieldStyle
                  type="text"
                  autoFocus
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  id="nama"
                  label="Nama"
                  name="nama"
                  size="small"
                  value={formik.values.nama || ""}
                  onChange={formik.handleChange}
                  error={
                    (formik.touched.nama && Boolean(formik.errors.nama)) ||
                    alert.show
                  }
                  helperText={
                    (formik.touched.nama && formik.errors.nama) || alert.message
                  }
                />
              </div>

              <div className="layout-input-barang" style={{ marginTop: 8 }}>
                <FormControl sx={{ minWidth: 120 }} size="small" fullWidth>
                  <InputLabel id="demo-controlled-open-select-label">
                    Level
                  </InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={level}
                    onClose={() => setLevel(false)}
                    onOpen={() => setLevel(true)}
                    value={formik.values.level}
                    label="Level"
                    onChange={(event) => {
                      formik.setFieldValue("level", event.target.value);
                    }}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="petugas">Petugas</MenuItem>
                  </Select>

                  {formik.touched.level && Boolean(formik.touched.level) ? (
                    <FormHelperText sx={{ color: "#D01A1A" }}>
                      {formik.touched.level && formik.errors.level}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </div>

              <div className="layout-input-barang" style={{ marginTop: 4 }}>
                <TextFieldStyle
                  type="text"
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  id="username"
                  label="Usename"
                  name="username"
                  size="small"
                  value={formik.values.username || ""}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                />
              </div>

              <div className="layout-input-barang">
                <FormControl
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{ marginTop: "8px" }}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  {formik.touched.password &&
                  Boolean(formik.touched.password) ? (
                    <FormHelperText sx={{ color: "#D01A1A" }}>
                      {formik.touched.password && formik.errors.password}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Tambah</Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </>
  );
};

export default AddPetugas;
