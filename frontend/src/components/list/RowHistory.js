import React, { useEffect, useState } from "react";

import { Typography, TableRow, TableCell, Chip } from "@mui/material";

import { tableCellClasses } from "@mui/material/TableCell";
import convertRupiah from "../../utils/convertRupiah";

const RowTableBodyLelang = (props) => {
  const { data } = props;
  const [status, setStatus] = useState("");

  const getInYourOffer = async () => {
    const penawaranHarga = data.penawaranHarga;
    const hargaAkhir = data.lelang.hargaAkhir;

    let statusHarga = penawaranHarga === hargaAkhir;

    if (data.lelang.status === "Dibuka" && statusHarga) {
      setStatus("Waiting");
    } else if (data.lelang.status === "Ditutup" && statusHarga) {
      setStatus("Win");
    } else {
      setStatus("Lose");
    }
  };

  let date = new Date(data.createdAt);

  const funcAddZero = (num) => {
    return num >= 0 && num < 10 ? "0" + num : num;
  };

  let dateTime = `${funcAddZero(date.getFullYear())}-${funcAddZero(
    date.getMonth()
  )}-${funcAddZero(date.getDay())} ${funcAddZero(
    date.getHours()
  )}:${funcAddZero(date.getMinutes())}:${funcAddZero(date.getSeconds())}`;

  useEffect(() => {
    getInYourOffer();
  });

  return (
    <>
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
        <TableCell>
          <Typography noWrap sx={{ fontWeight: 500, maxWidth: 233 }}>
            {data.lelang.barang.nama}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography sx={{ fontWeight: 500 }}>
            {data.masyarakat.username}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography sx={{ fontWeight: 500 }}>
            {`IDR ${convertRupiah(data.penawaranHarga)}`}
          </Typography>
        </TableCell>
        <TableCell align="center">
          {status === "Lose" && (
            <Chip
              label={"Lose"}
              sx={{
                borderRadius: 2,
                fontWeight: 500,
                fontSize: 12,
                width: 88,
                height: 28,
                color: "#434AAB",
                backgroundColor: "#E2E2F1",
                letterSpacing: 0.5,
              }}
            />
          )}
          {status === "Waiting" && (
            <Chip
              label={"Waiting"}
              sx={{
                borderRadius: 2,
                fontWeight: 500,
                fontSize: 12,
                width: 88,
                height: 28,
                color: "#EE492E",
                backgroundColor: "#FFEAE7",
                letterSpacing: 0.5,
              }}
            />
          )}
          {status === "Win" && (
            <Chip
              label={"Win"}
              sx={{
                borderRadius: 2,
                fontWeight: 500,
                fontSize: 12,
                width: 88,
                height: 28,
                color: "#ffffff",
                backgroundColor: "#EE492E",
                letterSpacing: 0.5,
              }}
            />
          )}
        </TableCell>
        <TableCell align="center">
          <Typography sx={{ fontWeight: 500 }}>{dateTime}</Typography>
        </TableCell>
      </TableRow>
    </>
  );
};

export default RowTableBodyLelang;
