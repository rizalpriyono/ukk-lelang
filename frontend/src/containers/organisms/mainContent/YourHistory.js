import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Typography } from "@mui/material";
import { URL_API } from "../../../config";
import CardYourHistory from "../../../components/CardYourHistory";

const MainContentTawar = (props) => {
  const [dataHistory, setDataHistory] = useState([]);

  const idMasyarakat = JSON.parse(localStorage.getItem("userLogin")).id;

  const getData = async () => {
    try {
      const response = await axios.get(
        `${URL_API}/historyLelang/${idMasyarakat}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.code === 200) {
        const sortByDate = response.data.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setDataHistory(sortByDate);
      }
    } catch (err) {
      console.log(err);
      setDataHistory([]);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
      <Container sx={{ pt: 10 }}>
        <Grid container sx={{ pt: 2, mt: 5 }} direction="column">
          <Typography
            align="center"
            sx={{ mt: 2, fontSize: 28, fontWeight: 600 }}
          >
            Your History
          </Typography>
          <div style={{ padding: 32 }}>
            {dataHistory.map((item, i) => (
              <CardYourHistory data={item} key={i} />
            ))}
          </div>
        </Grid>
      </Container>
    </main>
  );
};

export default MainContentTawar;
