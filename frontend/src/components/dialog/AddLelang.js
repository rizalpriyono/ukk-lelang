import React, { useEffect, useState } from "react";
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
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

import format from "date-fns/format";
import DateTimePicker from "@mui/lab/DateTimePicker";

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

const AddLelang = (props) => {
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [messageError, setMessageError] = useState({
    show: false,
    message: "",
  });

  const [listBarang, setListBarang] = useState([]);

  const getListBarang = async () => {
    try {
      const response = await axios.get(`${URL_API}/barang`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.code === 200) {
        const allData = response.data.data;
        setListBarang(allData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    formik.resetForm();
    setMessageError({
      show: false,
      message: null,
    });
    props.closeDialog();
  };

  const fetchAddLelang = async (values, resetForm) => {
    let payload = { ...values };
    if (values.status === "Dibuka") {
      if (values.endTime === "") {
        payload = {
          ...values,
          endTime: `${new Date(Date.now())}.000Z`,
        };
      } else {
        payload = {
          ...values,
          endTime: values.endTime + ".000Z",
        };
      }
    }
    try {
      const response = await axios.post(`${URL_API}/lelang`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.code === 200 || response.data.code === 201) {
        props.processAdd();
        props.closeDialog();
      }

      setMessageError({
        show: false,
        message: null,
      });
    } catch (error) {
      if (error.response.data.code === 403) {
        setMessageError({
          show: true,
          message: "Barang sudah dilelang sebelumnya",
        });
      }
    }
    setStatus("");
    resetForm();
  };

  const validationSchema = yup.object({
    idBarang: yup
      .string("Enter your idBarang")
      .required("Pilih salah satu barang"),
    status: yup.string("Enter your status").required("Pilih salah satu status"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      idBarang: "",
      idPetugas: JSON.parse(localStorage.getItem("userLogin")).id,
      status: "",
      endTime: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      fetchAddLelang(values, resetForm);
    },
  });

  useEffect(() => {
    getListBarang();
  }, []);

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
          <DialogTitle>Tambah Barang Lelang</DialogTitle>
          <DialogContent sx={{ paddingTop: 4 }}>
            <div className="layout-input-barang" style={{ marginTop: 8 }}>
              <Autocomplete
                id="combo-box-demo"
                options={listBarang}
                getOptionLabel={(options) => options.nama}
                onChange={(event, value) => {
                  if (value) {
                    formik.setFieldValue("idBarang", value.id);
                  } else if (value === null) {
                    formik.setFieldValue("idBarang", "");
                  }
                }}
                renderInput={(params) => (
                  <TextFieldStyle
                    {...params}
                    label="Barang"
                    variant="outlined"
                    size="small"
                    error={
                      (formik.touched.idBarang &&
                        Boolean(formik.errors.idBarang)) ||
                      messageError.show
                    }
                    helperText={
                      (formik.touched.idBarang && formik.errors.idBarang) ||
                      messageError.message
                    }
                  />
                )}
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
                  value={formik.values.status}
                  label="Status"
                  onChange={(event) => {
                    formik.setFieldValue("status", event.target.value);
                    setStatus(event.target.value);
                  }}
                >
                  <MenuItem value="Ditutup">Ditutup</MenuItem>
                  <MenuItem value="Dibuka">Dibuka</MenuItem>
                </Select>
              </FormControl>
              {formik.touched.status && Boolean(formik.errors.status) ? (
                <FormHelperText sx={{ color: "#FE2E12", ml: 2 }}>
                  {formik.touched.status && formik.errors.status}
                </FormHelperText>
              ) : null}
            </div>
            <div className="layout-input-barang" style={{ marginTop: 12 }}>
              {status === "Dibuka" && (
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
                    <TextFieldStyle
                      {...params}
                      fullWidth
                      size="small"
                      error={
                        formik.touched.endTime && Boolean(formik.errors.endTime)
                      }
                      helperText={
                        formik.touched.endTime && formik.errors.endTime
                      }
                    />
                  )}
                />
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit">Tambah</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default AddLelang;
