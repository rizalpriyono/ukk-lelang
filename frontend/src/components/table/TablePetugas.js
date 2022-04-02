import React, { useEffect, useState, useCallback } from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
} from "@mui/material";

import axios from "axios";
import { URL_API } from "../../config";
import DataRowTable from "../list/RowPetugas";
import SnackAlert from "../SnackAlert";

const TableData = (props) => {
  const [dataPetugas, setDataPetugas] = useState([]);
  const [alert, setAlert] = useState({
    severity: "info",
    text1: null,
    text2: null,
  });
  const [snack, setSnack] = useState(false);
  let keywordChange = props.keywordChange;
  const sortStatus = ["Admin", "Petugas"];

  const arraySort = (data, filter) => {
    let result = [];
    switch (filter) {
      case "Nama":
        result = data.sort((a, b) => {
          let textA = a.nama.toUpperCase();
          let textB = b.nama.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        break;

      case "Username":
        result = data.sort((a, b) => {
          let textA = a.username.toUpperCase();
          let textB = b.username.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        break;

      case "Level":
        result = data.sort((a, b) => {
          return sortStatus.indexOf(a.level) - sortStatus.indexOf(b.level);
        });
        break;

      default:
        result = data;
    }
    return result;
  };

  const filterSearch = dataPetugas.filter((data) => {
    return Object.keys(data).some((key) =>
      data["nama"].toLowerCase().includes(keywordChange.toLowerCase())
    );
  });

  const getAllData = useCallback(async () => {
    try {
      const response = await axios.get(`${URL_API}/petugas`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.code === 200) {
        let sortData = arraySort(response.data.data, props.filterBy);
        setDataPetugas(sortData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [props.filterBy]);

  const handleReloadChange = (status, code) => {
    switch (status) {
      case "Delete":
        setSnack(true);
        if (code === 200) {
          setAlert({
            severity: "success",
            text1: "Success.",
            text2: "Data berhasil dihapus",
          });
        } else if (code === 400) {
          setAlert({
            severity: "error",
            text1: "Gagal.",
            text2: "Data gagal dihapus, coba hubungi developer",
          });
        }

        break;

      case "Edit":
        setSnack(true);
        setAlert({
          severity: "success",
          text1: "Success.",
          text2: "Data berhasil dirubah",
        });
        break;

      default:
        setSnack(false);
    }
    getAllData();
  };

  useEffect(() => {
    getAllData();
  }, [getAllData, props.reload]);

  return (
    <>
      <SnackAlert
        open={snack}
        onClose={() => setSnack(false)}
        severity={alert.severity}
        text={[alert.text1, alert.text2]}
      />
      <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: "none" }}>
        <TableContainer sx={{ maxHeight: "55vh" }}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell width={50} align="center" />
                <TableCell width={332}>Nama Petugas</TableCell>
                <TableCell width={266}>Username</TableCell>
                <TableCell width={227} align="center">
                  Level
                </TableCell>
                <TableCell width={203} />
              </TableRow>
            </TableHead>
            <TableBody>
              {filterSearch.map((data, i) => (
                <DataRowTable
                  data={data}
                  key={i}
                  index={i}
                  reloadChanges={handleReloadChange}
                />
              ))}
            </TableBody>
            <TableFooter></TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default TableData;
