import React, { useEffect, useState } from "react";

import { Typography, TableRow, TableCell, Chip } from "@mui/material";
import EvaIcon from "react-eva-icons";

import { tableCellClasses } from "@mui/material/TableCell";
import axios from "axios";
import { URL_API } from "../../config";
import DeleteBarang from "../dialog/DeleteConfirm";
import EditBarang from "../dialog/EditBarang";

import convertRupiah from "../../utils/convertRupiah";

const RowTableBody = (props) => {
  const { data } = props;
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [itemSelect, setItemSelect] = useState("");
  const [onLelang, setOnLelang] = useState(true);

  const getStatus = async () => {
    try {
      const response = await axios.get(
        `${URL_API}/lelang/idBarang/${data.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.data) {
        setOnLelang(true);
      } else {
        setOnLelang(false);
      }
    } catch (error) {
      setOnLelang(false);
      console.log(error);
    }
  };

  const fetchDeleteBarang = async () => {
    try {
      const response = await axios.delete(`${URL_API}/barang/${itemSelect}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        setItemSelect("");
        props.reloadChanges("Delete", 200);
      }
    } catch (error) {
      if (error.response.data.code === 400) {
        props.reloadChanges("Delete", 400);
      }
    }
    handleCloseDelete();
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleDeleteBarang = (id) => {
    setOpenDelete(true);
    setItemSelect(id);
  };

  const handleEditBarang = (data) => {
    setOpenEdit(true);
    setItemSelect(data);
  };

  const successEdit = () => {
    setItemSelect("");
    props.reloadChanges("Edit");
    handleCloseEdit();
  };

  useEffect(() => {
    getStatus();
  });

  return (
    <>
      <EditBarang
        open={openEdit}
        data={itemSelect}
        closeDialog={() => handleCloseEdit()}
        successEdit={() => successEdit()}
      />
      <DeleteBarang
        action="Barang"
        open={openDelete}
        closeDialog={() => handleCloseDelete()}
        processDelete={() => fetchDeleteBarang()}
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
          <Typography noWrap sx={{ fontWeight: 500, maxWidth: 233 }}>
            {data.nama}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography sx={{ fontWeight: 500 }}>
            {`IDR ${convertRupiah(data.hargaAwal)}`}
          </Typography>
        </TableCell>

        <TableCell align="center">
          <Typography sx={{ fontWeight: 500 }}> {data.tgl}</Typography>
        </TableCell>

        <TableCell align="center">
          {!onLelang ? (
            <Chip
              label={"Tidak dilelang"}
              sx={{
                borderRadius: 2,
                fontWeight: 500,
                fontSize: 12,
                height: 28,
                width: 130,
                color: "#434AAB",
                backgroundColor: "#E2E2F1",
                letterSpacing: 0.5,
              }}
            />
          ) : (
            <Chip
              label={"Sedang dilelang"}
              sx={{
                borderRadius: 2,
                fontWeight: 400,
                fontSize: 12,
                height: 28,
                width: 130,
                color: "#ffff",
                backgroundColor: "#EE492E",
                letterSpacing: 0.5,
              }}
            />
          )}
        </TableCell>

        <TableCell align="center">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="btn-act" onClick={() => handleEditBarang(data)}>
              <EvaIcon name="edit-2-outline" size="normal" fill="#FE2E12" />
            </div>
            <div
              className="btn-act"
              onClick={() => handleDeleteBarang(data.id)}
            >
              <EvaIcon name="trash-2-outline" size="normal" fill="#FE2E12" />
            </div>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};

export default RowTableBody;
