import React, { useEffect, useState } from "react";
import { Grid, Typography, Chip } from "@mui/material";
import convertRupiah from "../utils/convertRupiah";

const CardYourHistory = (props) => {
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

  let time =
    funcAddZero(date.getHours()) + ":" + funcAddZero(date.getMinutes());

  let newDate = date.toLocaleDateString("en-US");
  useEffect(() => {
    getInYourOffer();
  });

  return (
    <Grid
      container
      alignItems={"center"}
      sx={{
        backgroundColor: "#ffffff",
        height: 84,
        borderRadius: 2,
        boxShadow: "0px 8px 20px #00000008",
        margin: "16px 0px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography
          sx={{
            ml: 2,
            fontSize: 14,
            fontWeight: 500,
            color: "#B1B1B1",
          }}
        >
          {newDate}
        </Typography>
        <div style={{ marginLeft: 22 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{ fontSize: 20, fontWeight: 600, letterSpacing: 0.7 }}
            >
              {data.lelang.barang.nama}
            </Typography>
            <Typography
              sx={{
                ml: 2,
                fontSize: 14,
                fontWeight: 500,
                color: "#B1B1B1",
              }}
            >
              {time}
            </Typography>
          </div>
          <Typography
            noWrap
            sx={{ color: "#ABABAB", fontSize: 14, maxWidth: 345 }}
          >
            {data.lelang.barang.deskripsi}
          </Typography>
        </div>
      </div>

      <div
        className="right-content"
        style={{
          display: "flex",
          alignItem: "center",
          marginLeft: "auto",
          marginRight: 16,
        }}
      >
        {status === "Win" && (
          <Chip
            label={status}
            sx={{
              borderRadius: 2,
              fontWeight: 300,
              fontSize: 12,
              width: 100,
              height: 28,
              color: "#ffff",
              backgroundColor: "#EE492E",
              letterSpacing: 0.6,
              margin: "0px 16px",
            }}
          />
        )}

        {status === "Waiting" && (
          <Chip
            label={status}
            sx={{
              borderRadius: 2,
              fontWeight: 300,
              fontSize: 12,
              width: 100,
              height: 28,
              color: "#EE492E",
              backgroundColor: "#FFEAE7",
              letterSpacing: 0.6,
              margin: "0px 16px",
            }}
          />
        )}

        {status === "Lose" && (
          <Chip
            label={status}
            sx={{
              borderRadius: 2,
              fontWeight: 300,
              fontSize: 12,
              width: 100,
              height: 28,
              color: "#434AAB",
              backgroundColor: "#E2E2F1",
              letterSpacing: 0.6,
              margin: "0px 16px",
            }}
          />
        )}
        <Typography sx={{ fontWeight: 600, margin: "0px 16px", width: 130 }}>
          {`IDR ${convertRupiah(data.penawaranHarga)}`}
        </Typography>
      </div>
    </Grid>
  );
};

export default CardYourHistory;
