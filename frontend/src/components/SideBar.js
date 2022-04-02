import React, { Component } from "react";
import { Drawer, Box, List } from "@mui/material";
import EvaIcon from "react-eva-icons";

import { styled } from "@mui/styles";
import { ROUTES } from "../config";

import logo from "../assets/logo.svg";

const LayoutIcon = styled("div")(({ theme }) => ({
  height: 56,
  display: "flex",
  justifyContent: "center",
  margin: "8px 0px",
  alignItems: "center",
  cursor: "pointer",
  // borderLeft: "3px solid #ffff",
}));

const LayoutIconActive = styled("div")(({ theme }) => ({
  height: 56,
  display: "flex",
  justifyContent: "center",
  margin: "8px 0px",
  alignItems: "center",
  cursor: "pointer",
  color: "#353535",
  // borderLeft: "4px solid #FE2E12",
  // backgroundColor: "#F9F6F6",
}));

class SideBar extends Component {
  state = {
    active: "Dashboard",
  };

  handleSideBar = (item) => {
    const currentPath = this.props.history.location.pathname;
    const pageDestination = item;

    if (pageDestination !== currentPath) {
      return this.props.history.push(pageDestination);
    }
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userLogin");
    return this.props.history.push(ROUTES.LOGIN);
  };

  render() {
    const drawerWidth = 98;
    const currentPath = this.props.history.location.pathname;

    const role = localStorage.getItem("role");

    return (
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#ffff",
            borderRight: "1px solid #EBEBEB",
            // justifyContent: 'center',
          },
        }}
      >
        <Box
          sx={{
            overflow: "auto",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "30px 0px",
            }}
          >
            <img src={logo} alt="" style={{ width: 40 }} />
          </div>

          <List>
            {currentPath === ROUTES.DASHBOARD ? (
              <LayoutIconActive
                onClick={() => this.handleSideBar(ROUTES.DASHBOARD)}
              >
                <EvaIcon name="grid-outline" size="large" fill="#434AAB" />
              </LayoutIconActive>
            ) : (
              <LayoutIcon onClick={() => this.handleSideBar(ROUTES.DASHBOARD)}>
                <EvaIcon name="grid-outline" size="large" fill="#A5A5A5" />
              </LayoutIcon>
            )}

            {currentPath === ROUTES.BARANG ? (
              <LayoutIconActive
                onClick={() => this.handleSideBar(ROUTES.BARANG)}
              >
                <EvaIcon
                  name="shopping-bag-outline"
                  size="large"
                  fill="#434AAB"
                />
              </LayoutIconActive>
            ) : (
              <LayoutIcon onClick={() => this.handleSideBar(ROUTES.BARANG)}>
                <EvaIcon
                  name="shopping-bag-outline"
                  size="large"
                  fill="#A5A5A5"
                />
              </LayoutIcon>
            )}

            {currentPath === ROUTES.LELANG ? (
              <LayoutIconActive
                onClick={() => this.handleSideBar(ROUTES.LELANG)}
              >
                <EvaIcon name="pricetags-outline" size="large" fill="#434AAB" />
              </LayoutIconActive>
            ) : (
              <LayoutIcon onClick={() => this.handleSideBar(ROUTES.LELANG)}>
                <EvaIcon name="pricetags-outline" size="large" fill="#A5A5A5" />
              </LayoutIcon>
            )}

            {!(role === "Petugas") ? (
              currentPath === ROUTES.PETUGAS ? (
                <LayoutIconActive
                  onClick={() => this.handleSideBar(ROUTES.PETUGAS)}
                >
                  <EvaIcon name="person" size="large" fill="#434AAB" />
                </LayoutIconActive>
              ) : (
                <LayoutIcon onClick={() => this.handleSideBar(ROUTES.PETUGAS)}>
                  <EvaIcon name="person-outline" size="large" fill="#A5A5A5" />
                </LayoutIcon>
              )
            ) : null}

            {currentPath === "/history-lelang" ? (
              <LayoutIconActive
                onClick={() => this.handleSideBar("/history-lelang")}
              >
                <EvaIcon name="swap" size="large" fill="#434AAB" />
              </LayoutIconActive>
            ) : (
              <LayoutIcon onClick={() => this.handleSideBar("/history-lelang")}>
                <EvaIcon name="swap" size="large" fill="#A5A5A5" />
              </LayoutIcon>
            )}
          </List>

          <List>
            <LayoutIcon onClick={() => this.handleLogout()}>
              <EvaIcon name="power" size="large" fill="#A5A5A5" />
            </LayoutIcon>
          </List>
        </Box>
      </Drawer>
    );
  }
}

export default SideBar;
