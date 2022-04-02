import React from "react";

import { styled } from "@mui/styles";

import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import logo from "../../../assets/logo.svg";
import { ROUTES } from "../../../config";
import { useHistory } from "react-router";

const NavItem = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  padding: "8px 20px",
  color: "#677780",
  height: "100%",
  margin: "0px 8px",
  fontSize: 18,
  "&:hover": {
    color: "#263238",
  },
}));

const Header = (props) => {
  const history = useHistory();

  const handleLogout = () => {
    console.log("logout");
    localStorage.removeItem("userLogin");
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    return history.push(ROUTES.LOGIN);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            position: "fixed",
            width: `100%`,
            padding: "12px 100px",
            boxShadow: "none",
            backgroundColor: "#FCFCFF",
            borderBottom: "none",
          }}
        >
          <Toolbar>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "30px 0px",
              }}
            >
              <img src={logo} alt="" style={{ width: 40 }} />
              <Typography
                variant="h6"
                noWrap
                color="#3D3D3D"
                sx={{ fontWeight: 600, fontSize: 28, ml: 4 }}
              >
                iAuction
              </Typography>
            </div>

            <div style={{ marginLeft: "auto", display: "flex" }}>
              <div onClick={() => history.push("/")}>
                <NavItem>Home</NavItem>
              </div>
              <div>
                <NavItem>Product</NavItem>
              </div>
              <div onClick={() => history.push("/your-history")}>
                <NavItem>Your History</NavItem>
              </div>
              <div onClick={handleLogout}>
                <Typography
                  sx={{
                    cursor: "pointer",
                    padding: "8px 20px",
                    color: "#434AAB",
                    height: "100%",
                    margin: "0px 8px",
                    fontSize: 18,
                  }}
                >
                  Logout
                </Typography>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
