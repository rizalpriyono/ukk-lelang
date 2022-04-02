import React from "react";
import { Grid, Typography } from "@mui/material";
import img1 from "../../assets/imageProfile/profile1.jpg";
import { motion } from "framer-motion";

import { styled } from "@mui/styles";

const CardStyle = styled("div")(({ theme }) => ({
  padding: 24,
  minHeight: 200,
  borderRadius: 16,
}));

const infoVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.9,
      type: "spring",
    },
  },
};

const CardUser = () => {
  const dataLogin = JSON.parse(localStorage.getItem("userLogin"));
  return (
    <>
      <CardStyle
        style={{
          backgroundColor: "#ffff",
          boxShadow: "0px 10px 20px #5E5E5E0A",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={img1}
            width={80}
            style={{ borderRadius: "50%" }}
            alt="img"
          />
        </div>
        <Grid
          container
          justifyContent={"space-between"}
          sx={{ marginTop: "auto" }}
        >
          <motion.div
            variants={infoVariant}
            initial="hidden"
            animate="visible"
            className="admin-username"
          >
            <Typography id="title-user">Username</Typography>
            <Typography id="text-user">{dataLogin.username}</Typography>
          </motion.div>
          <motion.div
            className="admin-role"
            variants={infoVariant}
            initial="hidden"
            animate="visible"
          >
            <Typography id="title-user">Level</Typography>
            <Typography id="text-user">{dataLogin.level}</Typography>
          </motion.div>
        </Grid>
      </CardStyle>
    </>
  );
};

export default CardUser;
