import React, { useState } from "react";
import { useFormik } from "formik";
import { styled } from "@mui/material/styles";
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
  FormHelperText,
} from "@mui/material";

import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";

const Input = styled("input")({
  display: "none",
});

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

const AddBarang = (props) => {
  const [alert, setAlert] = useState({
    show: false,
    message: null,
  });

  const fetchAddBarang = async (values, resetForm) => {
    let bodyFormData = new FormData();

    bodyFormData.append("nama", values.nama);
    bodyFormData.append("hargaAwal", values.hargaAwal);
    bodyFormData.append("deskripsi", values.deskripsi);
    bodyFormData.append("image", values.image);
    try {
      const response = await axios.post(`${URL_API}/barang`, bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.code === 200) {
        props.processAdd();
        handleClose();
      }
    } catch (error) {
      if (error.response.data.code === 400) {
        setAlert({
          show: true,
          message: "Nama Barang sudah ada",
        });
      } else if (error.response.data.code === 406) {
        console.log("image is required");
      }
    }
  };

  const handleClose = () => {
    props.closeDialog();
    formik.resetForm();
    setAlert({ show: false, message: null });
  };

  const validationSchema = yup.object({
    nama: yup
      .string("Enter your Name Barang")
      .required("Name Barang is required")
      .min(3, "Name Barang to short"),
    hargaAwal: yup
      .string("Enter your Harga Awal")
      .matches(/^[0-9.]+$/, `Only numbers (1-9)`)
      .required("Harga Awal is required"),
    deskripsi: yup
      .string("Enter your deskripsi")
      .required("Deskripsi is required"),
    image: yup.string("Enter your Image").required("Image is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nama: "",
      hargaAwal: "",
      deskripsi: "",
      image: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      fetchAddBarang(values, resetForm);
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
            <DialogTitle>Tambah Barang</DialogTitle>
            <DialogContent>
              <div className="layout-input-barang">
                <TextFieldStyle
                  type="text"
                  autoFocus
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  id="nama"
                  label="Nama Barang"
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

              <div className="layout-input-barang">
                <TextFieldStyle
                  type="text"
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  id="hargaAwal"
                  label="Harga Awal"
                  name="hargaAwal"
                  size="small"
                  value={formik.values.hargaAwal || ""}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.hargaAwal && Boolean(formik.errors.hargaAwal)
                  }
                  helperText={
                    formik.touched.hargaAwal && formik.errors.hargaAwal
                  }
                />
              </div>

              <div className="layout-input-barang">
                <TextFieldStyle
                  multiline
                  type="text"
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  rows={4}
                  id="deskripsi"
                  label="Deskripsi"
                  name="deskripsi"
                  value={formik.values.deskripsi || ""}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.deskripsi && Boolean(formik.errors.deskripsi)
                  }
                  helperText={
                    formik.touched.deskripsi && formik.errors.deskripsi
                  }
                />
              </div>

              <div className="layout-input-barang" style={{ marginTop: 8 }}>
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(event) => {
                      formik.setFieldValue("image", event.target.files[0]);
                    }}
                  />
                  <Button
                    sx={{
                      color: "#434AAB",
                      border: "1px solid #434AAB",
                      textTransform: "capitalize",
                      "&:hover": {
                        border: "1px solid #434AAB",
                      },
                    }}
                    variant="outlined"
                    component="span"
                    startIcon={<UploadFileRoundedIcon />}
                  >
                    {formik.values.image === "" && "Upload File"}
                    {typeof formik.values.image === "object" &&
                      formik.values.image.name}
                  </Button>
                </label>
                {formik.touched.image && Boolean(formik.errors.image) ? (
                  <FormHelperText sx={{ color: "#FE2E12", ml: 2 }}>
                    {formik.touched.image && formik.errors.image}
                  </FormHelperText>
                ) : null}
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

export default AddBarang;
