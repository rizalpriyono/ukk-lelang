import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { useHistory } from "react-router";
import EvaIcon from "react-eva-icons";
import Logout from "@mui/icons-material/Logout";

import { ROUTES } from "../../../config";

const HeaderPetugas = (props) => {
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
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - 98px)`,
        padding: "12px 0px",
        paddingRight: "80px",
        ml: `98px`,
        boxShadow: "none",
        backgroundColor: "transparent",
        borderBottom: "1px solid #EBEBEB",
      }}
    >
      <Toolbar>
        <Typography sx={{ pl: 4 }} variant="h6" noWrap color="#3D3D3D">
          Selamat datang Superadmin!
        </Typography>

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
          <MenuItem onClick={() => handleLogout()}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderPetugas;
