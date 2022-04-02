import { Container, Grid, Typography, Chip, IconButton } from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import FormSearch from "../../../components/Search";
import Table from "../../../components/table/TableLelang";
import AddLelang from "../../../components/dialog/AddLelang";
import ButtonTambahData from "../../../components/button/TambahData";
import FilterLelang from "../../../components/menu/FilterLelang";
import SnackAlert from "../../../components/SnackAlert";

//component nested

const CardStyle = styled("div")(({ theme }) => ({
  padding: 20,
  borderRadius: 16,
  backgroundColor: "#ffff",
  boxShadow: "0px 10px 20px #5E5E5E08",
}));

const MainContentLelang = (props) => {
  const [valueSearch, setValueSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [reloadAll, setReloadAll] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterBy, setFilterBy] = useState("");
  const [snack, setSnack] = useState(false);
  const [alert, setAlert] = useState({
    severity: "info",
    text1: null,
    text2: null,
  });

  const role = localStorage.getItem("role");

  const handleSearch = (value) => {
    setValueSearch(value);
  };

  const handleOpenDialog = () => {
    if (role === "Admin") {
      setSnack(true);
      setAlert({
        severity: "error",
        text1: "Gagal.",
        text2: "Hanya Petugas yang bisa tambah data lelang",
      });
    } else {
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleReload = () => {
    setReloadAll(true);
    setTimeout(() => {
      setReloadAll(false);
    }, 500);
  };

  const handleFilter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteFilter = () => {
    setFilterBy("");
  };

  const handleSelectFilter = (value) => {
    setFilterBy(value);
  };
  return (
    <main
      style={{
        flexGrow: 1,
        minHeight: "100vh",
        overflow: "auto",
        background: "#FCFCFF",
      }}
    >
      <SnackAlert
        open={snack}
        onClose={() => setSnack(false)}
        severity={alert.severity}
        text={[alert.text1, alert.text2]}
      />
      <Container sx={{ pt: 10 }}>
        <Grid container sx={{ pt: 2, mt: 5 }}>
          <AddLelang
            open={openDialog}
            closeDialog={() => handleCloseDialog()}
            processAdd={() => handleReload()}
          />
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
                Data Lelang
              </Typography>
              <ButtonTambahData onClick={() => handleOpenDialog()} />
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

                  <FilterLelang
                    anchorEl={anchorEl}
                    handleClose={handleClose}
                    selectFilter={handleSelectFilter}
                  />
                </div>
              </div>
              <div style={{ marginTop: 14 }}>
                <Table
                  keywordChange={valueSearch}
                  reload={reloadAll}
                  filterBy={filterBy}
                />
              </div>
            </CardStyle>
          </div>
        </Grid>
      </Container>
    </main>
  );
};

export default MainContentLelang;
