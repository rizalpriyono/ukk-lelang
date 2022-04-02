import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { URL_API } from "../../config";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
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

const EditBarang = (props) => {
  const [alert, setAlert] = useState({
    show: false,
    message: null,
  });
  let dataBarang = props.data;

  const fetchEditBarang = async (values) => {
    let bodyFormData = new FormData();

    bodyFormData.append("id", values.id);
    bodyFormData.append("nama", values.nama);
    bodyFormData.append("tgl", values.tgl);
    bodyFormData.append("hargaAwal", values.hargaAwal);
    bodyFormData.append("deskripsi", values.deskripsi);
    bodyFormData.append("image", values.image);

    try {
      const response = await axios.put(`${URL_API}/barang`, bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.code === 200) {
        props.successEdit();
      }
    } catch (error) {
      if (error.reponse.data.code === 403) {
        setAlert({
          show: true,
          message: "Nama Barang sudah ada",
        });
      }
    }
  };

  const validationSchema = yup.object({
    nama: yup.string("Enter your username").required("Username is required"),
    hargaAwal: yup
      .string("Enter your password")
      .matches(/^[0-9.]+$/, `Only numbers (1-9)`)
      .required("Password is required"),
    deskripsi: yup
      .string("Enter your deskripsi")
      .required("Deskripsi is required"),
    image: yup.string("Enter your deskripsi").required("Deskripsi is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: dataBarang.id,
      nama: dataBarang.nama,
      hargaAwal: dataBarang.hargaAwal,
      tgl: dataBarang.tgl,
      deskripsi: dataBarang.deskripsi,
      image: dataBarang.image,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      fetchEditBarang(values);
    },
  });

  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.closeDialog}
        maxWidth="xs"
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
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Tambah Barang</DialogTitle>
          <DialogContent>
            <div className="layout-input-barang">
              <TextFieldStyle
                type="text"
                margin="dense"
                variant="outlined"
                fullWidth
                InputProps={{ readOnly: true }}
                className="readOnly"
                id="nama"
                label="Nama Barang"
                name="nama"
                size="small"
                value={formik.values.nama || ""}
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
                helperText={formik.touched.hargaAwal && formik.errors.hargaAwal}
              />
            </div>

            <div className="layout-input-barang">
              <TextFieldStyle
                type="text"
                margin="dense"
                variant="outlined"
                fullWidth
                InputProps={{ readOnly: true }}
                className="readOnly"
                id="tgl"
                label="Tanggal Penambahan"
                name="tgl"
                size="small"
                value={formik.values.tgl || ""}
                onChange={formik.handleChange}
                error={formik.touched.tgl && Boolean(formik.errors.tgl)}
                helperText={formik.touched.tgl && formik.errors.tgl}
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
                helperText={formik.touched.deskripsi && formik.errors.deskripsi}
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
                  {typeof formik.values.image === "string" &&
                    formik.values.image}
                  {typeof formik.values.image === "undefined" && "Upload File"}
                  {typeof formik.values.image === "object" &&
                    formik.values.image.name}
                </Button>
              </label>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.closeDialog}>Cancel</Button>
            <Button type="submit">Simpan</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default EditBarang;
