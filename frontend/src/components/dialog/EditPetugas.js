import React, { useState } from "react";
import { useFormik } from "formik";
import { styled } from "@mui/material/styles";
import Switch from "../Switch";
import * as yup from "yup";
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
  FormControlLabel,
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

const EditPetugas = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [level, setLevel] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);

  const handleClose = () => {
    props.closeDialog();
    formik.resetForm();
  };

  let dataPetugas = props.data;

  const fetchEditPetugas = (payload, resetForm) => {
    props.processEdit(payload);

    resetForm();
  };

  const validationSchema = yup.object({
    nama: yup
      .string("Enter your nama")
      .required("Masukan nama")
      .min(3, "Nama terlalu pendek"),
    level: yup.string("Enter your level").required("Masukan level"),
    password: yup
      .string("Enter your password")
      .min(6, "Password panjang minimal 6 charakter"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: dataPetugas.id,
      nama: dataPetugas.nama,
      level: dataPetugas.level,
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      fetchEditPetugas(values, resetForm);
    },
  });

  return (
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
              value={formik.values.nama}
              onChange={formik.handleChange}
              error={formik.touched.nama && Boolean(formik.errors.nama)}
              helperText={formik.touched.nama && formik.errors.nama}
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
                value={formik.values.level ? formik.values.level : ""}
                label="Level"
                onChange={(event) => {
                  formik.setFieldValue("level", event.target.value);
                }}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Petugas">Petugas</MenuItem>
              </Select>
            </FormControl>
            {formik.touched.level && Boolean(formik.errors.level) ? (
              <FormHelperText sx={{ color: "#FE2E12", ml: 2 }}>
                {formik.touched.level && formik.errors.level}
              </FormHelperText>
            ) : null}
          </div>

          <div className="layout-input-barang" style={{ marginTop: 4 }}>
            <TextFieldStyle
              type="text"
              margin="dense"
              variant="outlined"
              fullWidth
              InputProps={{ readOnly: true }}
              className="readOnly"
              id="username"
              label="Usename"
              name="username"
              size="small"
              value={dataPetugas.username}
            />
          </div>

          {resetPassword && (
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
              </FormControl>
              {formik.touched.password && Boolean(formik.errors.password) ? (
                <FormHelperText sx={{ color: "#FE2E12", ml: 2 }}>
                  {formik.touched.password && formik.errors.password}
                </FormHelperText>
              ) : null}
            </div>
          )}

          <div style={{ marginTop: 0 }}>
            <FormControlLabel
              control={
                <Switch resetPassword={(value) => setResetPassword(value)} />
              }
              label="Reset Password"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Simpan</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditPetugas;
