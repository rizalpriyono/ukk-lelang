import React from "react";
import { Button } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const ButtonTambahData = (props) => {
  return (
    <Button
      sx={{
        width: 150,
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
      startIcon={<AddRoundedIcon />}
      onClick={props.onClick}
    >
      Tambah Data
    </Button>
  );
};

export default ButtonTambahData;
