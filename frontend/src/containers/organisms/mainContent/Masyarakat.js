import { Typography, Grid } from "@mui/material";
import React, { useRef } from "react";
import LelangGroup from "../../../components/list/LelangGroup";
import CarouselLelang from "../../../components/masyarakat/CarouselLelang";
import Headline from "../../../components/masyarakat/Headline";
import {
  Facebook,
  Google,
  LinkedIn,
  Twitter,
  YouTube,
} from "@mui/icons-material";

const MainContentMasyarakat = () => {
  const myRef = useRef(null);
  return (
    <main
      className="mainMasyarakat"
      style={{
        flexGrow: 1,
        minHeight: "100vh",
        overflow: "auto",
        background: "#FCFCFF",
      }}
    >
      <Headline
        scrollTo={() =>
          myRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          })
        }
      />
      <LelangGroup myRef={myRef} />
      <CarouselLelang />
      <Grid
        container
        direction={"column"}
        justifyContent="center"
        alignItems={"center"}
        style={{
          backgroundColor: "#303030",
          height: 360,
          width: "100%",
          padding: 40,
        }}
      >
        <Typography
          align="center"
          sx={{
            color: "#ffffff",
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: 0.7,
          }}
        >
          iAuction Developer
        </Typography>
        <Typography
          align="center"
          sx={{
            mt: 2,
            color: "#ffffff",
            fontSize: 16,
            maxWidth: 646,
            fontWeight: 300,
            letterSpacing: 0.7,
          }}
        >
          iAuction Developer is an auction website, where you can get quality
          goods at affordable prices. The auction has started, where are you?
          Win your action, let your dreams come true. Eat, Bid, Win, Repea
        </Typography>
        <Grid container justifyContent={"center"} sx={{ mt: 3 }}>
          <div style={{ margin: 2 }}>
            <Facebook sx={{ color: "#ffffff", fontSize: 36 }} />
          </div>
          <div style={{ margin: 2 }}>
            <Google sx={{ color: "#ffffff", fontSize: 36 }} />
          </div>
          <div style={{ margin: 2 }}>
            <YouTube sx={{ color: "#ffffff", fontSize: 36 }} />
          </div>
          <div style={{ margin: 2 }}>
            <Twitter sx={{ color: "#ffffff", fontSize: 36 }} />
          </div>
          <div style={{ margin: 2 }}>
            <LinkedIn sx={{ color: "#ffffff", fontSize: 36 }} />
          </div>
        </Grid>
      </Grid>
    </main>
  );
};

export default MainContentMasyarakat;
