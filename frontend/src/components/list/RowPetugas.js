import React, { useState } from "react";

import { Typography, TableRow, TableCell, Chip } from "@mui/material";
import EvaIcon from "react-eva-icons";

import { tableCellClasses } from "@mui/material/TableCell";

import axios from "axios";
import { URL_API } from "../../config";
import DeleteBarang from "../dialog/DeleteConfirm";
import EditBarang from "../dialog/EditPetugas";

const RowTableBody = (props) => {
  const { data } = props;
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [itemSelect, setItemSelect] = useState("");

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

  const fetchDeleteBarang = async () => {
    try {
      const response = await axios.delete(`${URL_API}/petugas/${itemSelect}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        setItemSelect("");
        props.reloadChanges("Delete", 200);
        handleCloseDelete();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEditPetugas = async (values) => {
    let payload = { ...values };

    try {
      const response = await axios.put(`${URL_API}/petugas`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.code === 200) {
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
      <EditBarang
        open={openEdit}
        data={itemSelect}
        closeDialog={() => handleCloseEdit()}
        processEdit={(payload) => fetchEditPetugas(payload)}
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
          <Typography sx={{ fontWeight: 500 }}>{data.nama}</Typography>
        </TableCell>

        <TableCell>
          <Typography sx={{ fontWeight: 500 }}> {data.username}</Typography>
        </TableCell>

        <TableCell align="center">
          {data.level === "Admin" ? (
            <Chip
              label={"Admin"}
              sx={{
                borderRadius: 2,
                fontWeight: 400,
                fontSize: 12,
                width: 80,
                height: 28,
                color: "#ffff",
                backgroundColor: "#EE492E",
                letterSpacing: 0.5,
              }}
            />
          ) : (
            <Chip
              label={"Petugas"}
              sx={{
                borderRadius: 2,
                fontWeight: 500,
                fontSize: 12,
                width: 80,
                height: 28,
                color: "#434AAB",
                backgroundColor: "#E2E2F1",
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
