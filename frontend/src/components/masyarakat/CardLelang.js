import React, { useState } from "react";

import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";

import { useHistory } from "react-router";

import Countdown from "react-countdown";
import countdownTime from "../../utils/countdownTime";
import convertRupiah from "../../utils/convertRupiah";
import { URL_API } from "../../config";

const CardLelang = (props) => {
  const history = useHistory();
  const [hover, setHover] = useState(false);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return (
        <Typography
          align="center"
          sx={{
            width: 150,
            pt: 1,
            pb: 1,
            backgroundColor: "#F0F0F8",
            color: "#434AAB",
            borderRadius: 2,
            fontWeight: 600,
            letterSpacing: 0.8,
          }}
        >
          CLOSED
        </Typography>
      );
    } else {
      // Render a countdown
      return (
        <Typography
          align="center"
          sx={{
            width: 150,
            pt: 1,
            pb: 1,
            backgroundColor: "#F0F0F8",
            color: "#434AAB",
            borderRadius: 2,
            fontWeight: 600,
            letterSpacing: 0.8,
          }}
        >
          {days}d {hours}h {minutes}m
        </Typography>
      );
    }
  };

  return (
    <>
      <Card
        sx={{
          width: 345,
          backgroundColor: "#ffff",
          boxShadow: "0px 18px 30px #0000000D",
          borderRadius: "10px",
          margin: "16px",
        }}
      >
        <div style={{ padding: 16 }}>
          <CardMedia
            sx={{ borderRadius: 1 }}
            component="img"
            height="300"
            image={`${URL_API}/barang_image/${props.data.barang.image}`}
            alt="green iguana"
          />
        </div>

        <CardContent
          sx={{
            paddingTop: 0,
          }}
        >
          <Typography
            noWrap
            sx={{ fontSize: 20, fontWeight: 600, letterSpacing: 0.8 }}
          >
            {props.data.barang.nama}
          </Typography>
          <div
            style={{
              display: "flex",
              marginTop: 8,
              justifyContent: "space-between",
            }}
          >
            {props.data.status === "Dibuka" ? (
              <Countdown
                date={Date.now() + countdownTime(props.data.endTime)}
                renderer={renderer}
              />
            ) : (
              <Countdown date={Date.now()} renderer={renderer} />
            )}

            <Button
              onClick={() =>
                history.push(`/tawar-barang/${props.data.idBarang}`)
              }
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              variant="outlined"
              sx={{
                position: "static",
                width: 150,
                borderRadius: 2,
                border: "1.5px solid #434AAB",
                color: "#434AAB",
                letterSpacing: 0.8,
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#434AAB",
                  color: "#ffffff",
                },
              }}
            >
              {hover
                ? `IDR ${convertRupiah(props.data.hargaAkhir)}`
                : "Bid Item"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CardLelang;
