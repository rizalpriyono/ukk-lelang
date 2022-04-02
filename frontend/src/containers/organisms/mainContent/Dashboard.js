import { Container, Grid } from "@mui/material";
import React from "react";

//component nested
import CardCountData from "../../../components/dashboard/CardCountData";
import CardUser from "../../../components/dashboard/CardUser";

const MainContentDashboard = (props) => {
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
        <Grid container sx={{ pt: 5 }}>
          <div
            className="left-dashboard"
            style={{
              minWidth: "70%",
            }}
          >
            <CardCountData />
            {/* <History /> */}
          </div>

          <div style={{ minWidth: "28%", padding: "24px 0px" }}>
            <div style={{ height: 700 }}>
              <CardUser />
            </div>
          </div>
        </Grid>
      </Container>
    </main>
  );
};

export default MainContentDashboard;
