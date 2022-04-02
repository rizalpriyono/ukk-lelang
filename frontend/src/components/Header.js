import React, { useState } from "react";

import { styled } from "@mui/styles";

import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";

import EvaIcon from "react-eva-icons";
import { ROUTES } from "../config";
import { useHistory } from "react-router";

const NavItem = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  padding: "8px 20px",
  color: "#a5a5a5",
  height: "100%",
  fontSize: 18,
  "&:hover": {
    color: "#303030",
  },
}));

const Header = () => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
            padding: "12px 120px",
            boxShadow: "none",
            backgroundColor: "transparent",
            borderBottom: "none",
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              color="#3D3D3D"
              sx={{ fontWeight: 600, fontSize: 28 }}
            >
              Lelang.io
            </Typography>

            <div style={{ margin: "0px 72px", display: "flex" }}>
              <div>
                <NavItem>Home</NavItem>
              </div>
              <div>
                <NavItem>History</NavItem>
              </div>
            </div>

            <div
              style={{ marginLeft: "auto", cursor: "pointer" }}
              onClick={handleClick}
            >
              <EvaIcon name="person-outline" size="normal" fill="#303030" />
            </div>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={Boolean(anchorEl)}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.05))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 4,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {/* <MenuItem>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem> */}
              <MenuItem onClick={() => handleLogout()}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
