import React from "react";
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

import DataRowTable from "../list/RowHistory";

const TableData = (props) => {
  const { dataHistory } = props;
  let keywordChange = props.keywordChange;

  const filterSearch = dataHistory.filter((data) => {
    return Object.keys(data).some((key) =>
      data.lelang.barang.nama
        .toLowerCase()
        .includes(keywordChange.toLowerCase())
    );
  });

  return (
    <>
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
                <TableCell width={233}>Nama Barang</TableCell>
                <TableCell width={155}>Penawar</TableCell>
                <TableCell width={155}>Penawaran Harga</TableCell>
                <TableCell align="center" width={120}>
                  Status
                </TableCell>
                <TableCell align="center" width={220}>
                  Tanggal Penawaran
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterSearch.map((data, i) => (
                <DataRowTable data={data} key={i} index={i} />
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
