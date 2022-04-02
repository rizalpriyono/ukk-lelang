import React from "react";
import { Typography, IconButton } from "@mui/material";

import axios from "axios";

import { useState } from "react";
import { useEffect } from "react";

import { URL_API } from "../../config";
import CardLelang from "../masyarakat/CardLelang";

import ChevLeft from "@mui/icons-material/ChevronLeftRounded";
import ChevRight from "@mui/icons-material/ChevronRightRounded";

const LelangGroup = (props) => {
  const [barangLelang, setBarangLelang] = useState([]);
  const [page, setPage] = useState(0);
  const [countPerPage, setCountPerPage] = useState(3);

  const sortStatus = ["Dibuka", "Ditutup"];

  const getAllData = async () => {
    try {
      const response = await axios.get(`${URL_API}/lelang`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = response.data.data.sort(function (a, b) {
        return sortStatus.indexOf(a.status) - sortStatus.indexOf(b.status);
      });

      if (response.data.code === 200) {
        setBarangLelang(result);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleBackButtonClick = () => {
    setPage(page - 1);
  };

  const handleNextButtonClick = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    getAllData();
  }, []);
  return (
    <>
      <div
        ref={props.myRef}
        style={{
          width: "100%",
          marginTop: 80,
          marginBottom: 80,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          align="center"
          sx={{
            fontSize: 32,
            fontWeight: 700,
            fontFamily: "Poppins",
            letterSpacing: 0.8,
          }}
        >
          Product in Action
        </Typography>

        <div
          style={{
            marginTop: "64px",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            maxWidth: 1200,
            // minHeight: 500,
          }}
        >
          {(countPerPage > 0
            ? barangLelang.slice(
                page * countPerPage,
                page * countPerPage + countPerPage
              )
            : barangLelang
          ).map((data, i) => (
            <CardLelang key={i} data={data} />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 32,
          }}
        >
          <IconButton
            onClick={() => handleBackButtonClick()}
            disabled={page === 0}
            sx={{ color: "#FE2E12" }}
          >
            <ChevLeft />
          </IconButton>

          <div></div>

          <IconButton
            onClick={() => handleNextButtonClick()}
            disabled={page >= Math.ceil(barangLelang.length / countPerPage) - 1}
            sx={{ color: "#FE2E12" }}
          >
            <ChevRight />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default LelangGroup;
