import React from "react";
import { Typography } from "@mui/material";
import img1 from "../../assets/imageProfile/profile1.jpg";

const History = () => {
  return (
    <>
      <div style={{ padding: "0px 12px", margin: "24px 0px" }}>
        <div>
          <Typography variant="h5" sx={{ fontWeight: 600 }} color="#3d3d3d">
            History
          </Typography>
          <Typography color="#A5A5A5">Transaction of 2 months</Typography>
        </div>

        <div style={{ marginTop: 8 }}>
          <div className="historyCard">
            <div>
              <img
                src={img1}
                width={40}
                style={{ borderRadius: "50%" }}
                alt=""
              />
            </div>
            <div className="historyCol" id="name">
              Satmika Antargata
            </div>
            <div className="historyCol" id="date">
              16 Januari 2021
            </div>
            <div className="historyCol" id="price">
              IDR 500.000
            </div>
            <div className="historyCol" id="completed">
              Completed
            </div>
          </div>

          <div className="historyCard">
            <div>
              <img
                src={img1}
                width={40}
                style={{ borderRadius: "50%" }}
                alt=""
              />
            </div>
            <div className="historyCol" id="name">
              Juned Supri
            </div>
            <div className="historyCol" id="date">
              16 Januari 2021
            </div>
            <div className="historyCol" id="price">
              IDR 500.000
            </div>
            <div className="historyCol" id="completed">
              Completed
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
