import React, { Component } from "react";

import { CssBaseline, Box } from "@mui/material";
import SideBar from "../../components/SideBar";

import MainContentDashboard from "../organisms/mainContent/Dashboard";
import MainContentBarang from "../organisms/mainContent/Barang";
import MainContentLelang from "../organisms/mainContent/Lelang";
import MainContentPetugas from "../organisms/mainContent/Petugas";
import Header from "../organisms/header/Masyarakat";
import MainContentMasyarakat from "../organisms/mainContent/Masyarakat";
import HeaderPetugas from "../organisms/header/Petugas";
import MainContentHistoryLelang from "../organisms/mainContent/HistoryLelang";

class Dashboard extends Component {
  state = {
    login: true,
    role: "",
  };

  getRole = () => {
    const role = localStorage.getItem("role");
    this.setState({
      role: role,
    });
  };

  componentDidMount() {
    this.getRole();
  }
  render() {
    return (
      <>
        {/* if else admin / masyarakat */}
        {this.state.role === "Admin" || this.state.role === "Petugas" ? (
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <HeaderPetugas title={this.props.title} />

            <SideBar history={this.props.history} />

            {this.props.title === "Dashboard" && <MainContentDashboard />}
            {this.props.title === "Barang" && <MainContentBarang />}
            {this.props.title === "Lelang" && <MainContentLelang />}
            {this.props.title === "Petugas" && <MainContentPetugas />}
            {this.props.title === "HistoryLelang" && (
              <MainContentHistoryLelang />
            )}
          </Box>
        ) : (
          <div>
            <Header title="Home" />
            {this.props.title === "Dashboard" && <MainContentMasyarakat />}
          </div>
        )}
      </>
    );
  }
}

export default Dashboard;
