import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/styles";
import EvaIcon from "react-eva-icons";
import { motion } from "framer-motion";
import { useHistory } from "react-router";
import axios from "axios";
import { URL_API } from "../../config";

const CardStyle = styled("div")(({ theme }) => ({
  margin: "0px 12px",
  padding: "24px 24px 8px 24px",
  minHeight: 200,
  borderRadius: 16,
}));

const cardRedVariant = {
  hidden: {
    x: "-100vw",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 50,
    },
  },
};

const cardWhiteVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.9,
      type: "spring",
      stiffness: 50,
    },
  },
};

const CardCountData = () => {
  const history = useHistory();

  const [countLelang, setCountLelang] = useState(0);
  const [countHistory, setCountHistory] = useState(0);
  const [countBarang, setCountBarang] = useState(0);

  const getDataLelang = async () => {
    try {
      const response = await axios.get(`${URL_API}/lelang`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response) {
        setCountLelang(response.data.data.length);
      }
    } catch (err) {}
  };

  const getDataHistory = async () => {
    try {
      const response = await axios.get(`${URL_API}/historyLelang`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response) {
        setCountHistory(response.data.data.length);
      }
    } catch (err) {}
  };

  const getDataBarang = async () => {
    try {
      const response = await axios.get(`${URL_API}/barang`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response) {
        setCountBarang(response.data.data.length);
      }
    } catch (err) {}
  };

  useEffect(() => {
    getDataLelang();
    getDataHistory();
    getDataBarang();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        padding: "24px 0px",
      }}
    >
      <motion.div variants={cardRedVariant} initial="hidden" animate="visible">
        <CardStyle
          style={{
            width: 400,
            backgroundImage: "linear-gradient(to top right, #434AAB, #464FD1)",
            boxShadow: "0px 10px 30px #57449C40",
          }}
        >
          <EvaIcon name="shopping-cart-outline" size="xlarge" fill="#ffff" />
          <Typography color="#ffff" sx={{ mt: 1.5, fontWeight: 400 }}>
            Barang yang sedang dilelang
          </Typography>
          <div
            style={{
              marginTop: 36,
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Typography
              color="#ffff"
              sx={{
                fontWeight: 500,
                fontSize: 40,
              }}
            >
              {countLelang}
            </Typography>
            <div
              style={{ marginBottom: 12, cursor: "pointer" }}
              onClick={() => history.push("/lelang")}
            >
              <EvaIcon name="arrow-forward" size="large" fill="#ffff" />
            </div>
          </div>
        </CardStyle>
      </motion.div>

      <motion.div
        variants={cardWhiteVariant}
        initial="hidden"
        animate="visible"
      >
        <CardStyle
          style={{
            width: 152,
            backgroundColor: "#ffff",
            boxShadow: "0px 10px 30px #5E5E5E0A",
          }}
        >
          <EvaIcon name="swap" size="xlarge" fill="#434AAB" />
          <Typography
            color="#434AAB"
            sx={{ marginTop: 1, fontWeight: 500, opacity: 0.5 }}
          >
            Aktifitas Lelang
          </Typography>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Typography
              color="#18125C"
              sx={{ marginTop: 3, fontWeight: 500 }}
              variant="h4"
            >
              {countHistory}
            </Typography>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => history.push("/history-lelang")}
            >
              <EvaIcon name="arrow-forward" size="medium" fill="#434AAB" />
            </div>
          </div>
        </CardStyle>
      </motion.div>

      <motion.div
        variants={cardWhiteVariant}
        initial="hidden"
        animate="visible"
      >
        <CardStyle
          style={{
            width: 152,
            backgroundColor: "#ffff",
            boxShadow: "0px 10px 20px #5E5E5E0A",
          }}
        >
          <EvaIcon name="shopping-bag-outline" size="xlarge" fill="#434AAB" />
          <Typography
            color="#434AAB"
            sx={{ marginTop: 1, fontWeight: 500, opacity: 0.5 }}
          >
            Jumlah Barang
          </Typography>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Typography
              color="#18125C"
              sx={{ marginTop: 3, fontWeight: 500 }}
              variant="h4"
            >
              {countBarang}
            </Typography>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => history.push("/barang")}
            >
              <EvaIcon name="arrow-forward" size="medium" fill="#434AAB" />
            </div>
          </div>
        </CardStyle>
      </motion.div>
    </div>
  );
};

export default CardCountData;
