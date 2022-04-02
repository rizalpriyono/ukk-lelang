import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const DeleteBarang = (props) => {
  const { open, closeDialog, processDelete, action } = props;

  return (
    <>
      <Dialog
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
        <DialogTitle id="alert-dialog-title">{`Hapus ${action}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Apakah kamu ingin menghapus data ini? Data yang sudah dihapus tidak
            dapat dikembalikan.
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{ background: "#F1F5F5", padding: "12px", paddingRight: "20px" }}
        >
          <Button onClick={closeDialog} sx={{ color: "#a0a0a0" }}>
            Tutup
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={processDelete}
            sx={{ width: "110px", boxShadow: "none", letterSpacing: "0.5px" }}
          >
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteBarang;
