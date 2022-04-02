import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import format from "date-fns/format";
import DateTimePicker from "@mui/lab/DateTimePicker";

const EditLelang = (props) => {
  const [open, setOpen] = useState(false);
  const dataLelang = props.data;

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const fetchEditLelang = (payload, resetForm) => {
    props.processEdit(payload);

    resetForm();
  };

  const handleCloseDialog = () => {
    formik.resetForm();
    props.closeDialog();
  };

  const validationSchema = yup.object({
    idBarang: yup
      .string("Enter your idBarang")
      .required("Pilih salah satu barang"),
    status: yup.string("Enter your status").required("Pilih status"),
    endTime: yup.string("Enter your date"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: dataLelang.id,
      idBarang: dataLelang.idBarang,
      idPetugas: JSON.parse(localStorage.getItem("userLogin")).id,
      status: dataLelang.status,
      endTime: dataLelang.endTime,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      fetchEditLelang(values, resetForm);
    },
  });

  return (
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
        <DialogTitle>Tambah Barang Lelang</DialogTitle>
        <DialogContent sx={{ paddingTop: 4 }}>
          <div className="layout-input-barang" style={{ marginTop: 8 }}>
            <TextField
              fullWidth
              InputProps={{ readOnly: true }}
              className="readOnly"
              label="Barang"
              value={props.namaBarang}
              variant="outlined"
              size="small"
              error={formik.touched.idBarang && Boolean(formik.errors.idBarang)}
              helperText={formik.touched.idBarang && formik.errors.idBarang}
            />
          </div>

          <div className="layout-input-barang" style={{ marginTop: 12 }}>
            <FormControl sx={{ minWidth: 120 }} size="small" fullWidth>
              <InputLabel id="demo-controlled-open-select-label">
                Status
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={formik.values.status ? formik.values.status : ""}
                label="Status"
                onChange={(event) => {
                  formik.setFieldValue("status", event.target.value);
                }}
              >
                <MenuItem value="Ditutup">Ditutup</MenuItem>
                <MenuItem value="Dibuka">Dibuka</MenuItem>
              </Select>
            </FormControl>
          </div>

          {formik.values.status === "Dibuka" && (
            <div className="layout-input-barang" style={{ marginTop: 12 }}>
              <DateTimePicker
                ampm
                label="Tanggal ditutup lelang"
                onChange={(newValue) => {
                  if (newValue) {
                    formik.setFieldValue(
                      "endTime",
                      format(newValue, "yyyy-MM-dd'T'HH:mm:ss")
                    );
                  } else if (newValue === null) {
                    formik.setFieldValue("endTime", "");
                  }
                }}
                value={
                  formik.values.endTime
                    ? new Date(formik.values.endTime)
                    : new Date(Date.now())
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    error={
                      formik.touched.endTime && Boolean(formik.errors.endTime)
                    }
                    helperText={formik.touched.endTime && formik.errors.endTime}
                  />
                )}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button type="submit">Simpan</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditLelang;
