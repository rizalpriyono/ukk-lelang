import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  IconButton,
  Typography,
  Button,
  Card,
  CardMedia,
} from "@mui/material";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import countdownTime from "../../../utils/countdownTime";
import convertRupiah from "../../../utils/convertRupiah";
import { styled } from "@mui/styles";
import Countdown from "react-countdown";
import { URL_API } from "../../../config";
import { useHistory } from "react-router";

const InputStyle = styled("input")(({ theme }) => ({
  margin: "0px 16px",
  border: "none",
  borderRadius: 6,
  padding: "8px 24px",
  fontFamily: "Poppins",
  fontSize: 14,
  width: 200,
  fontWeight: 600,
  letterSpacing: 0.3,
  backgroundColor: "#eaeef2",
  textAlign: "center",
  "&:focus": {
    border: "none",
    outline: "none",
  },
}));
const MainContentTawar = (props) => {
  const history = useHistory();

  const [dataBarang, setDataBarang] = useState({});
  const [loading, setLoading] = useState(true);

  const [startValue, setStartValue] = useState(0);
  const [valueBid, setValueBid] = useState(0);
  const [showWarning, setShowWarning] = useState({ show: false, message: "" });

  const idMasyarakat = JSON.parse(localStorage.getItem("userLogin")).id;

  const getData = async () => {
    try {
      const response = await axios.get(
        `${URL_API}/lelang/idBarang/${props.idBarang}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.code === 200) {
        setDataBarang(response.data.data);
        setLoading(false);
        setStartValue(response.data.data.hargaAkhir);
        setValueBid(response.data.data.hargaAkhir);
      }
    } catch (err) {
      console.log(err);
      setDataBarang([]);
    }
  };

  const handlePlusBid = () => {
    if (startValue >= 1000000) {
      setValueBid(valueBid + 100000);
      setShowWarning({ show: false, message: "" });
    } else if (startValue >= 100000) {
      setValueBid(valueBid + 25000);
      setShowWarning({ show: false, message: "" });
    } else if (startValue >= 0) {
      setValueBid(valueBid + 10000);
      setShowWarning({ show: false, message: "" });
    }
  };

  const handleMinusBid = () => {
    if (startValue >= 1000000 && startValue < valueBid) {
      setValueBid(valueBid - 100000);
    } else if (startValue >= 100000 && startValue < valueBid) {
      setValueBid(valueBid - 25000);
    } else if (startValue >= 0 && startValue < valueBid) {
      setValueBid(valueBid - 10000);
    } else {
      setShowWarning({
        show: true,
        message: "Can only bid at a higher price than the initial price",
      });
    }
  };

  const handleClickBid = async () => {
    const payload = {
      id: dataBarang.id,
      idMasyarakat: idMasyarakat,
      penawaranHarga: valueBid,
    };
    try {
      const response = await axios.post(`${URL_API}/lelang/bid`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      window.location.reload();
    } catch (err) {
      if (err.response.data.code === 400) {
        setShowWarning({
          show: true,
          message: "Can only bid at a higher price than the initial price",
        });
      } else if (err.response.data.code === 401) {
        setShowWarning({
          show: true,
          message: "This auction is closed",
        });
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main
      className="mainMasyarakat"
      style={{
        flexGrow: 1,
        minHeight: "100vh",
        overflow: "auto",
        background: "#FCFCFF",
      }}
    >
      {!loading && (
        <Container sx={{ pt: 10 }}>
          <Grid container sx={{ pt: 2, mt: 5 }} direction="column">
            <div>
              <IconButton
                onClick={() => {
                  return history.push("/");
                }}
              >
                <ArrowBackRoundedIcon />
              </IconButton>
            </div>
            <Card
              sx={{
                display: "flex",
                p: 0,
                boxShadow: "none",
                backgroundColor: "#FCFCFF",
              }}
            >
              <div
                style={{
                  width: 400,
                  height: 560,
                  padding: 16,
                }}
              >
                <CardMedia
                  sx={{ borderRadius: 2, boxShadow: "0px 18px 30px #00000008" }}
                  component="img"
                  height="500"
                  width="400"
                  image={`${URL_API}/barang_image/${dataBarang.barang.image}`}
                  alt="green iguana"
                />
              </div>

              <div
                style={{
                  height: 560,
                  padding: 16,
                  marginLeft: 24,
                  maxWidth: 640,
                }}
              >
                <Typography>
                  {dataBarang.status === "Dibuka" ? "Opened" : "Closed"}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 40,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    width: 240,
                  }}
                >
                  {dataBarang.status === "Dibuka" ? (
                    <Countdown
                      date={Date.now() + countdownTime(dataBarang.endTime)}
                    />
                  ) : (
                    <Countdown date={Date.now()} />
                  )}
                </Typography>

                <div style={{ marginTop: 48 }}>
                  <Typography
                    sx={{
                      fontSize: 30,
                      fontWeight: 600,
                      letterSpacing: 0.5,
                    }}
                  >
                    {dataBarang.barang.nama}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 18,
                      fontWeight: 400,
                      letterSpacing: 0.5,
                      maxWidth: "100%",
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Amet dignissim mi et lorem nulla. Aliquet id consectetur eu
                    dolor mattis. Scelerisque nibh proin in in ac. Vel in dictum
                    nisi, semper luctus.
                  </Typography>
                </div>

                <div style={{ marginTop: 40 }}>
                  <Typography
                    sx={{
                      fontSize: 35,
                      fontWeight: 600,
                      letterSpacing: 0.5,
                    }}
                  >
                    {`Rp ${convertRupiah(dataBarang.hargaAkhir)}`}
                  </Typography>
                  <div style={{ display: "flex", marginTop: 20 }}>
                    <IconButton
                      onClick={handleMinusBid}
                      sx={{
                        borderRadius: 1,
                        boxShadow: "0px 5px 20px #3030301A",
                      }}
                      style={{
                        backgroundColor: "#ffff",
                      }}
                    >
                      <RemoveRoundedIcon />
                    </IconButton>
                    <div>
                      <InputStyle
                        className="input-startValue"
                        type="number"
                        value={valueBid}
                        onChange={(ev) => setStartValue(ev.target.value)}
                      />
                    </div>
                    <IconButton
                      onClick={handlePlusBid}
                      sx={{
                        borderRadius: 1,
                        boxShadow: "0px 5px 20px #3030301A",
                      }}
                      style={{
                        backgroundColor: "#ffff",
                      }}
                    >
                      <AddRoundedIcon />
                    </IconButton>
                    <Button
                      onClick={() => handleClickBid()}
                      sx={{
                        pl: 3,
                        pr: 3,
                        ml: 2,
                        backgroundColor: "#434AAB",
                        color: "#ffff",
                        "&:hover": {
                          backgroundColor: "#434AAB",
                          color: "#ffff",
                        },
                      }}
                    >
                      bid
                    </Button>
                  </div>
                  {showWarning.show ? (
                    <Typography
                      sx={{ fontSize: 14, color: "#C61919", marginTop: 2 }}
                    >
                      {`*${showWarning.message}`}
                    </Typography>
                  ) : null}
                  {dataBarang.idMasyarakat === idMasyarakat ? (
                    <Typography
                      sx={{ fontSize: 14, color: "#C61919", marginTop: 2 }}
                    >
                      *This item is in your offer
                    </Typography>
                  ) : null}
                </div>
              </div>
            </Card>
          </Grid>
        </Container>
      )}
    </main>
  );
};

export default MainContentTawar;
