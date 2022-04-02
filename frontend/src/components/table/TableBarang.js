import React, { useCallback, useEffect, useState } from "react";
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
import DataRowTable from "../list/RowBarang";
import SnackAlert from "../SnackAlert";
import SkeletonBarang from "../skeleton/SkeletonBarang";

const TableData = (props) => {
  const [dataBarang, setDataBarang] = useState([]);
  const [alert, setAlert] = useState({
    severity: "info",
    text1: null,
    text2: null,
  });
  const [snack, setSnack] = useState(false);
  const [loading, setLoading] = useState(false);
  let keywordChange = props.keywordChange;

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

      case "Harga":
        result = data.sort((a, b) => {
          return b.hargaAwal - a.hargaAwal;
        });
        break;

      case "Tanggal":
        result = data.sort((a, b) => {
          return new Date(b.tgl) - new Date(a.tgl);
        });
        break;

      default:
        result = data;
    }
    return result;
  };

  const filterSearch = dataBarang.filter((data) => {
    return Object.keys(data).some((key) =>
      data["nama"].toLowerCase().includes(keywordChange.toLowerCase())
    );
  });

  const getAllData = useCallback(async () => {
    try {
      const response = await axios.get(`${URL_API}/barang`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.code) {
        let sortData = arraySort(response.data.data, props.filterBy);
        setDataBarang(sortData);
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
            text2: "Tidak bisa menghapus data yang sedang dilelang",
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
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          boxShadow: "none",
        }}
      >
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
                <TableCell width={50} />
                <TableCell width={233}>Nama Barang</TableCell>
                <TableCell width={195}>Harga Awal</TableCell>
                <TableCell width={263} align="center">
                  Tanggal Penambahan
                </TableCell>
                <TableCell width={224} align="center">
                  Status
                </TableCell>
                <TableCell width={138} />
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <SkeletonBarang key={i} />
                  ))}
                </>
              ) : (
                <>
                  {filterSearch.map((data, i) => (
                    <DataRowTable
                      data={data}
                      key={i}
                      index={i}
                      reloadChanges={handleReloadChange}
                    />
                  ))}
                </>
              )}
            </TableBody>
            <TableFooter></TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default TableData;
