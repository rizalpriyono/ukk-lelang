import React, { useState } from "react";

import { Typography, TableRow, TableCell, Chip } from "@mui/material";
import EvaIcon from "react-eva-icons";

import { tableCellClasses } from "@mui/material/TableCell";

import axios from "axios";
import { URL_API } from "../../config";
import DeleteBarang from "../dialog/DeleteConfirm";
import EditLelang from "../dialog/EditLelang";
import InfoLelang from "../dialog/InfoLelang";
import convertRupiah from "../../utils/convertRupiah";

const RowTableBodyLelang = (props) => {
  const { data } = props;
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [infoLelang, setInfoLelang] = useState({
    open: false,
    data: {},
  });
  const [itemSelect, setItemSelect] = useState({});
  const [namaBarang, setNamaBarang] = useState("");

  const role = localStorage.getItem("role");

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleDeleteLelang = (id) => {
    if (role === "Admin") {
      props.reloadChanges("Delete", 404);
    } else {
      setOpenDelete(true);
      setItemSelect(id);
    }
  };

  const handleEditLelang = (data) => {
    if (role === "Admin") {
      props.reloadChanges("Edit", 404);
    } else {
      if (data.endTime === null || data.status === "Dibuka") {
        setOpenEdit(true);
        setItemSelect(data);
        setNamaBarang(data.barang.nama);
      } else {
        props.reloadChanges("Edit", 402);
      }
    }
  };

  const fetchDeleteLelang = async () => {
    try {
      const response = await axios.delete(`${URL_API}/lelang/${itemSelect}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.code === 200) {
        setItemSelect("");
        props.reloadChanges("Delete", 200);
        handleCloseDelete();
      }
    } catch (error) {
      console.log(error);
    }
    handleCloseDelete();
  };

  const fetchEditLelang = async (values) => {
    let payload = { ...values };
    if (values.status === "Dibuka") {
      payload = {
        ...values,
        endTime: values.endTime + ".000Z",
      };
    }
    try {
      const response = await axios.put(`${URL_API}/lelang`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.code === 200 || response.data.code === 201) {
        setItemSelect("");
        props.reloadChanges("Edit", 200);
        handleCloseEdit();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <InfoLelang
        open={infoLelang.open}
        closeDialog={() => setInfoLelang({ open: false, data: {} })}
        data={infoLelang.data}
      />
      <EditLelang
        open={openEdit}
        data={itemSelect}
        namaBarang={namaBarang}
        closeDialog={() => handleCloseEdit()}
        processEdit={(payload) => fetchEditLelang(payload)}
      />
      <DeleteBarang
        action="Lelang"
        open={openDelete}
        closeDialog={() => handleCloseDelete()}
        processDelete={() => fetchDeleteLelang()}
      />
      <TableRow
        sx={{
          "&:nth-of-type(odd)": {
            backgroundColor: "#fafafa",
          },
          [`& .${tableCellClasses.root}`]: {
            borderBottom: "none",
          },
        }}
      >
        <TableCell align="center">
          <Typography sx={{ fontWeight: 500 }}>{props.index + 1}</Typography>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography noWrap sx={{ fontWeight: 500, maxWidth: 210 }}>
            {data.barang.nama}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography sx={{ fontWeight: 500 }}>
            {`IDR ${convertRupiah(data.hargaAkhir)}`}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography sx={{ fontWeight: 500 }}> {data.tglLelang}</Typography>
        </TableCell>
        <TableCell align="center">
          {data.status === "Ditutup" ? (
            <Chip
              label={"Ditutup"}
              sx={{
                borderRadius: 2,
                fontWeight: 500,
                fontSize: 12,
                width: 72,
                height: 28,
                color: "#434AAB",
                backgroundColor: "#E2E2F1",
                letterSpacing: 0.5,
              }}
            />
          ) : (
            <Chip
              label={"Dibuka"}
              sx={{
                borderRadius: 2,
                fontWeight: 400,
                fontSize: 12,
                width: 72,
                height: 28,
                color: "#ffff",
                backgroundColor: "#EE492E",
                letterSpacing: 0.5,
              }}
            />
          )}
        </TableCell>
        <TableCell align="center">
          <Typography sx={{ fontWeight: 500 }}>
            {data.endTime === null ? "-- -- -- --" : data.endTime}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              className="btn-act"
              onClick={() => setInfoLelang({ open: true, data: data })}
            >
              <EvaIcon name="info-outline" size="normal" fill="#FE2E12" />
            </div>

            <div className="btn-act" onClick={() => handleEditLelang(data)}>
              <EvaIcon name="edit-2-outline" size="normal" fill="#FE2E12" />
            </div>

            <div
              className="btn-act"
              onClick={() => handleDeleteLelang(data.id)}
            >
              <EvaIcon name="trash-2-outline" size="normal" fill="#FE2E12" />
            </div>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};

export default RowTableBodyLelang;
