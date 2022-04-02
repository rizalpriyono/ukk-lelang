import React from "react";

import { Button, Grid, Typography } from "@mui/material";
import wallet from "../../assets/wallet-animate.svg";
import { useHistory } from "react-router";

const Headline = (props) => {
  const history = useHistory();

  const executeScroll = () => {
    props.scrollTo();
  };
  return (
    <>
      <div>
        <Grid
          container
          justifyContent={"space-around"}
          sx={{ pt: "90px", pl: "50px", pr: "50px" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 700,
                fontSize: 40,
                letterSpacing: 0.8,
                display: "flex",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 700,
                  fontSize: 40,
                  letterSpacing: 0.8,
                  color: "#434AAB",
                  mr: 2,
                }}
              >
                The Best
              </Typography>
              Place for
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 700,
                fontSize: 40,
                letterSpacing: 0.8,
              }}
            >
              {`Discover & Collect Product`}
            </Typography>
            <Typography
              sx={{
                mt: 2,
                maxWidth: "490px",
                letterSpacing: 0.3,
                lineHeight: 1.7,
              }}
            >
              The auction has started, where are you? Win your action, let your
              dreams come true. Eat, Bid, Win, Repeat
            </Typography>
            <div style={{ marginTop: 24 }}>
              <Button
                onClick={executeScroll}
                sx={{
                  position: "static",
                  backgroundColor: "#434AAB",
                  textTransform: "capitalize",
                  padding: "7px 24px",
                  color: "#ffff",
                  fontWeight: 300,
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "#434AAB",
                    color: "#ffff",
                  },
                }}
              >
                Check Auction
              </Button>
              <Button
                onClick={() => history.push("/your-history")}
                variant="outlined"
                sx={{
                  position: "static",
                  ml: 2,
                  textTransform: "capitalize",
                  color: "#434AAB",
                  padding: "7px 24px",
                  fontWeight: 300,
                  borderRadius: 2,
                  border: "1px solid #434AAB",
                  "&:hover": {
                    backgroundColor: "#434AAB",
                    color: "#ffff",
                  },
                }}
              >
                Your History
              </Button>
            </div>
          </div>
          <img
            src={wallet}
            alt=""
            style={{ width: "550px", maxWidth: "100%" }}
          />
        </Grid>
      </div>
    </>
  );
};

export default Headline;
