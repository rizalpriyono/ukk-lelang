import {
  Container,
  Grid,
  Button,
  Typography,
  Chip,
  IconButton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import FormSearch from "../../../components/Search";
import Table from "../../../components/table/TableHistory";
import FilterHistory from "../../../components/menu/FilterHistory";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import axios from "axios";
import { URL_API } from "../../../config";
import {
  generatePDFAktivity,
  generatePDFWinAuction,
} from "../../../utils/reportGenerator";
//component nested

const CardStyle = styled("div")(({ theme }) => ({
  padding: 20,
  borderRadius: 16,
  backgroundColor: "#ffff",
  boxShadow: "0px 10px 20px #5E5E5E08",
}));

const MainContentHistoryLelang = (props) => {
  const [valueSearch, setValueSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterBy, setFilterBy] = useState("");
  const [dataHistory, setDataHistory] = useState([]);

  const handleSearch = (value) => {
    setValueSearch(value);
  };

  const handleFilter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteFilter = () => {
    setFilterBy("");
    getDataHistory("");
  };

  const handleSelectFilter = (value) => {
    setFilterBy(value);
    getDataHistory(value);
  };

  const handleDownloadLaporan = () => {
    const dataFilterByPenawar = dataHistory.sort((a, b) => {
      let textA = a.masyarakat.username.toUpperCase();
      let textB = b.masyarakat.username.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    const dataWinAuction = dataHistory.filter(
      (item, i) =>
        item.penawaranHarga === item.lelang.hargaAkhir &&
        item.lelang.status === "Ditutup"
    );

    generatePDFWinAuction(dataWinAuction);
    generatePDFAktivity(dataFilterByPenawar);
  };

  const getDataHistory = async (filter) => {
    console.log(filter);
    try {
      const response = await axios.get(`${URL_API}/historyLelang`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.code === 200) {
        const data = arraySort(response.data.data, filter);

        console.log(data);
        setDataHistory(data);
      }
    } catch (error) {}
  };

  const arraySort = (data, filter) => {
    let result = [];
    switch (filter) {
      case "Nama Barang":
        result = data.sort((a, b) => {
          let textA = a.lelang.barang.nama.toUpperCase();
          let textB = b.lelang.barang.nama.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        break;

      case "Nama Penawar":
        result = data.sort((a, b) => {
          let textA = a.masyarakat.username.toUpperCase();
          let textB = b.masyarakat.username.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        break;

      case "Harga":
        result = data.sort((a, b) => {
          return b.penawaranHarga - a.penawaranHarga;
        });
        break;

      case "Tanggal Penawaran":
        result = data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        break;

      default:
        result = data;
    }
    return result;
  };

  useEffect(() => {
    getDataHistory("");
  }, []);

  return (
    <main
      style={{
        flexGrow: 1,
        minHeight: "100vh",
        overflow: "auto",
        background: "#FCFCFF",
      }}
    >
      <Container sx={{ pt: 10 }}>
        <Grid container sx={{ pt: 2, mt: 5 }}>
          <div
            style={{
              minWidth: "100%",
            }}
          >
            <CardStyle
              style={{
                maxWidth: "100%",
                height: 80,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontSize: 24, fontWeight: 600, mr: 3, ml: 1 }}>
                History Lelang
              </Typography>
              <Button
                sx={{
                  width: 110,
                  backgroundColor: "#464FD1",
                  height: "100%",
                  textTransform: "capitalize",
                  borderRadius: 2,
                  color: "#ffff",

                  "&:hover": {
                    backgroundColor: "#434AAB",
                    color: "#ffff",
                  },
                }}
                startIcon={<DownloadRoundedIcon />}
                onClick={() => handleDownloadLaporan()}
              >
                Laporan
              </Button>
            </CardStyle>

            {/* Table */}
            <CardStyle style={{ marginTop: 32 }}>
              <div
                style={{
                  maxWidth: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <FormSearch
                  onKeywordSearchChange={(value) => handleSearch(value)}
                />
                <div
                  style={{
                    marginRight: 8,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: 500, color: "#434AAB", mr: 2 }}>
                    Sort by :
                  </Typography>
                  {filterBy === "" ? (
                    <IconButton
                      onClick={handleFilter}
                      size="small"
                      sx={{
                        borderRadius: 2,
                        backgroundColor: "#FAEFE8",
                        color: "#EE492E",
                      }}
                    >
                      <AddRoundedIcon fontSize="8" />
                    </IconButton>
                  ) : (
                    <Chip
                      sx={{
                        borderRadius: 2.5,
                        backgroundColor: "#FAEFE8",
                        color: "#EE492E",
                        fontWeight: 500,
                        "& .MuiChip-deleteIcon": {
                          color: "#EE492E",
                          "&:hover": {
                            color: "#D5422A",
                          },
                        },
                      }}
                      label={filterBy}
                      onDelete={handleDeleteFilter}
                      deleteIcon={
                        <CloseRoundedIcon sx={{ color: "#EE492E" }} />
                      }
                    />
                  )}

                  <FilterHistory
                    anchorEl={anchorEl}
                    handleClose={handleClose}
                    selectFilter={handleSelectFilter}
                  />
                </div>
              </div>
              <div style={{ marginTop: 14 }}>
                <Table dataHistory={dataHistory} keywordChange={valueSearch} />
              </div>
            </CardStyle>
          </div>
        </Grid>
      </Container>
    </main>
  );
};

export default MainContentHistoryLelang;
