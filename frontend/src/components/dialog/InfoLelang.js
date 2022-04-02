import React from "react";

import {
  CardMedia,
  Dialog,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material";

import Countdown from "react-countdown";
import countdownTime from "../../utils/countdownTime";
import { URL_API } from "../../config";

const InfoLelang = (props) => {
  const { open, closeDialog, data } = props;

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        hideBackdrop={true}
        sx={{
          backgroundColor: "rgba(111, 126, 140, 0.2)",
          backdropFilter: "blur(4px)",
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: "8px",
            boxShadow: "none",
          },
        }}
      >
        <DialogContent>
          {open && (
            <Grid container direction={"row"}>
              <div style={{ width: 300, height: 300 }}>
                <CardMedia
                  sx={{ borderRadius: 2 }}
                  component="img"
                  height="300"
                  width="300"
                  image={`${URL_API}/barang_image/${data.barang.image}`}
                  alt="green iguana"
                />
              </div>
              <div style={{ marginLeft: 24 }}>
                <Typography sx={{ color: "#A51818", fontSize: 14 }}>
                  {data.status === "Dibuka" ? "Dibuka" : "Ditutup"}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 32,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    width: 240,
                  }}
                >
                  {data.status === "Dibuka" ? (
                    <Countdown
                      date={Date.now() + countdownTime(data.endTime)}
                    />
                  ) : (
                    <Countdown date={Date.now()} />
                  )}
                </Typography>

                <div style={{ marginTop: 24 }}>
                  <Typography
                    noWrap
                    sx={{
                      fontSize: 32,
                      fontWeight: 600,
                      letterSpacing: 0.5,
                      maxWidth: 500,
                    }}
                  >
                    {data.barang.nama}
                  </Typography>
                  <Typography
                    noWrap
                    sx={{
                      fontSize: 16,
                      fontWeight: 400,
                      maxWidth: 500,
                    }}
                  >
                    {data.barang.deskripsi}
                  </Typography>
                </div>

                <div style={{ marginTop: 32 }}>
                  <Typography sx={{ color: "#A51818", fontSize: 14 }}>
                    Penawar
                  </Typography>
                  {data.masyarakat === null ? (
                    <Typography
                      sx={{
                        fontSize: 32,
                        fontWeight: 600,
                        letterSpacing: 0.5,
                      }}
                    >
                      -
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        fontSize: 26,
                        fontWeight: 600,
                        letterSpacing: 0.5,
                        textTransform: "capitalize",
                      }}
                    >
                      {data.masyarakat.username}
                    </Typography>
                  )}
                </div>
              </div>
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InfoLelang;
