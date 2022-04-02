import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL_API } from "../../config";
import { Typography, Button, CardMedia } from "@mui/material";
import convertRupiah from "../../utils/convertRupiah";
import countdownTime from "../../utils/countdownTime";
import { useHistory } from "react-router";
import Countdown from "react-countdown";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";

import "swiper/swiper.min.css";
import "swiper/modules/navigation/navigation.min.css";

// import Swiper core and required modules
import SwiperCore, { Navigation, Autoplay } from "swiper";

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

const CarouselLelang = (props) => {
  const [barangLelang, setBarangLelang] = useState([]);
  const history = useHistory();

  const getAllData = async () => {
    try {
      const response = await axios.get(`${URL_API}/lelang`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.code === 200) {
        setBarangLelang(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filterDibuka = barangLelang.filter(
    (item, i) => item.status === "Dibuka"
  );

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <>
      <div
        style={{
          margin: "140px 0px",
          backgroundColor: "#F0F0F8",
          minHeight: 447,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Swiper
          style={{
            width: "100%",
            height: "100%",
          }}
          spaceBetween={30}
          loop={true}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="mySwiper"
        >
          {filterDibuka.map((item, i) => (
            <SwiperSlide style={{ backgroundPosition: "center" }} key={i}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div style={{ width: 288, height: 288 }}>
                  <CardMedia
                    sx={{
                      borderRadius: 2,
                      boxShadow: "0px 18px 30px #00000008",
                    }}
                    component="img"
                    height="288px"
                    width="288px"
                    image={`${URL_API}/barang_image/${item.barang.image}`}
                    alt="green iguana"
                  />
                </div>

                <div style={{ marginLeft: 80 }}>
                  <Typography
                    sx={{
                      fontSize: 40,
                      fontWeight: 700,
                      fontFamily: "Poppins",
                    }}
                  >
                    {item.barang.nama}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      maxWidth: 760,
                      letterSpacing: 0.3,
                      marginTop: "8px",
                    }}
                  >
                    {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Diam a lorem quis fames id ullamcorper dignissim. Vestibulum
                    tellus vitae at sociis vitae. Enim et sit feugiat dolor
                    mauris convallis sed libero ut. Ullamcorper lectus lorem
                    tincidunt augue quis. */}
                    {item.barang.deskripsi}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      maxWidth: 760,
                      letterSpacing: 0.3,
                      marginTop: "24px",
                      color: "#C90909",
                      fontWeight: 500,
                    }}
                  >
                    {`IDR ${convertRupiah(item.hargaAkhir)}`}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "24px",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: 40,
                        fontWeight: 600,
                        letterSpacing: 0.5,
                        width: 240,
                      }}
                    >
                      {item.status === "Dibuka" ? (
                        <Countdown
                          date={Date.now() + countdownTime(item.endTime)}
                        />
                      ) : (
                        <Countdown date={Date.now()} />
                      )}
                    </Typography>

                    <Button
                      onClick={() =>
                        history.push(`tawar-barang/${item.idBarang}`)
                      }
                      sx={{
                        marginLeft: 3,
                        border: "1px solid #434AAB",
                        backgroundColor: "#F0F0F8",
                        borderRadius: 1,
                        color: "#434AAB",
                        fontSize: 18,
                        letterSpacing: 0.8,
                        fontWeight: 500,
                        padding: "6px 32px",
                        "&:hover": {
                          backgroundColor: "#434AAB",
                          color: "#ffffff",
                        },
                      }}
                    >
                      Bid
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default CarouselLelang;
