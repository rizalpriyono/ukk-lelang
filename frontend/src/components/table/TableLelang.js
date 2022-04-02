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
import DataRowTable from "../list/RowLelang";
import SnackAlert from "../SnackAlert";

const TableData = (props) => {
  const [dataLelang, setDataLelang] = useState([]);
  const [snack, setSnack] = useState(false);
  const [alert, setAlert] = useState({
    severity: "info",
    text1: null,
    text2: null,
  });

  let keywordChange = props.keywordChange;
  const sortStatus = ["Dibuka", "Ditutup"];

  const arraySort = (data, filter) => {
    let result = [];
    switch (filter) {
      case "Nama":
        result = data.sort((a, b) => {
          let textA = a.barang.nama.toUpperCase();
          let textB = b.barang.nama.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        break;

      case "Harga":
        result = data.sort((a, b) => {
          return b.hargaAkhir - a.hargaAkhir;
        });
        break;

      case "Status":
        result = data.sort(function (a, b) {
          return sortStatus.indexOf(a.status) - sortStatus.indexOf(b.status);
        });
        break;

      case "Tanggal Lelang":
        result = data.sort((a, b) => {
          return new Date(b.tglLelang) - new Date(a.tglLelang);
        });
        break;

      case "Tanggal Ditutup":
        result = data.sort((a, b) => {
          return new Date(b.endTime) - new Date(a.endTime);
        });
        break;

      default:
        result = data;
    }
    return result;
  };

  const filterSearch = dataLelang.filter((data) => {
    return Object.keys(data).some((key) =>
      data["barang"].nama.toLowerCase().includes(keywordChange.toLowerCase())
    );
  });

  const getAllData = useCallback(async () => {
    try {
      const response = await axios.get(`${URL_API}/lelang`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.code === 200) {
        let sortData = arraySort(response.data.data, props.filterBy);
        setDataLelang(sortData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [props.filterBy]);

  const handleReloadChange = (status, code) => {
    switch (status) {
      case "Delete":
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
            text2: "Tidak bisa menghapus data yang sedang dilelang",
          });
        } else if (code === 404) {
          setAlert({
            severity: "error",
            text1: "Gagal.",
            text2: "Hanya Petugas yang bisa hapus data lelang",
          });
        }
        setSnack(true);

        break;

      case "Edit":
        if (code === 200) {
          setAlert({
            severity: "success",
            text1: "Success.",
            text2: "Data berhasil dirubah",
          });
        } else if (code === 402) {
          setAlert({
            severity: "error",
            text1: "Gagal.",
            text2: "Data sudah ditutup atau melebihi batas waktu ditutup",
          });
        } else if (code === 404) {
          setAlert({
            severity: "error",
            text1: "Gagal.",
            text2: "Hanya Petugas yang bisa edit data lelang",
          });
        }
        setSnack(true);

        break;

      default:
        setSnack(false);
    }
    getAllData();
  };

  const showSnackbar = () => {
    setSnack(true);
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
        <TableContainer
          sx={{
            maxHeight: "54vh",
            "&::-webkit-scrollbar": { width: "4px" },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f5f5f5",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#C1C1C1",
            },
          }}
        >
          <Table aria-label="collapsible table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell width={50} align="center" />
                <TableCell width={210}>Nama Barang</TableCell>
                <TableCell width={160}>Harga Akhir</TableCell>
                <TableCell align="center" width={220}>
                  Tanggal Lelang
                </TableCell>
                <TableCell align="center" width={120}>
                  Status
                </TableCell>
                <TableCell align="center" width={220}>
                  Tanggal Ditutup
                </TableCell>
                <TableCell width={116} />
              </TableRow>
            </TableHead>
            <TableBody>
              {filterSearch.map((data, i) => (
                <DataRowTable
                  showSnackbar={showSnackbar}
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
