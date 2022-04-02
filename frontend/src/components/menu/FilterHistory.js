import React from "react";
import { Menu, MenuItem } from "@mui/material";

const filter = ["Nama Barang", "Nama Penawar", "Harga", "Tanggal Penawaran"];

const FilterBarang = (props) => {
  const handleChoose = (value) => {
    props.selectFilter(value);
  };
  return (
    <Menu
      anchorEl={props.anchorEl}
      id="account-menu"
      open={Boolean(props.anchorEl)}
      onClose={props.handleClose}
      onClick={props.handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.05))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 4,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {filter.map((item, i) => (
        <MenuItem key={i} onClick={() => handleChoose(item)}>
          {item}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default FilterBarang;
