import React from "react";
import { Snackbar, Alert } from "@mui/material";
const SnackAlert = (props) => {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={3000}
      onClose={props.onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        severity={props.severity}
        onClose={props.onClose}
        sx={{ width: "100%" }}
        style={{ minWidth: 500 }}
      >
        <b>{`${props.text[0]} `}</b>
        {` ${props.text[1]}`}
      </Alert>
    </Snackbar>
  );
};

export default SnackAlert;
