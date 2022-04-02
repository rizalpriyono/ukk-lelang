import React, { Component } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import PublicRoute from "../../../router/publicRouter";
import PrivateRoute from "../../../router/privateRouter";

import AdminPrivateRoute from "../../../router/privateRouteAdmin";
import MasyarakatPrivateRoute from "../../../router/privateRouteMasyarakat";

import Dashboard from "../Dashboard";
import Login from "../Login";
import Barang from "../Barang";
import Petugas from "../Petugas";
import Register from "../Register";
import Lelang from "../Lelang";
import TawarBarang from "../TawarBarang";
import YourHistory from "../YourHistory";
import DateAdapter from "@mui/lab/AdapterDateFns";
import HistoryLelang from "../HistoryLelang";

import { LocalizationProvider } from "@mui/lab";

import { ROUTES } from "../../../config";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
  },
});

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <ThemeProvider theme={theme}>
              <PrivateRoute
                exact
                restricte
                d={true}
                path={ROUTES.DASHBOARD}
                component={Dashboard}
              />
              <AdminPrivateRoute
                restricted={true}
                path={ROUTES.BARANG}
                component={Barang}
              />
              <AdminPrivateRoute
                restricted={true}
                path={ROUTES.LELANG}
                component={Lelang}
              />
              <AdminPrivateRoute
                restricted={true}
                path={ROUTES.HISTROY_LELANG}
                component={HistoryLelang}
              />
              <AdminPrivateRoute
                restricted={true}
                path={ROUTES.PETUGAS}
                component={Petugas}
              />
              <MasyarakatPrivateRoute
                restricted={true}
                path={ROUTES.BID_LELANG}
                component={TawarBarang}
              />
              <MasyarakatPrivateRoute
                restricted={true}
                path={ROUTES.HISTORY_MASYARAKAT}
                component={YourHistory}
              />
              <PublicRoute
                restricted={true}
                path={ROUTES.LOGIN}
                component={Login}
              />
              <PublicRoute
                restricted={true}
                path={ROUTES.REGISTER}
                component={Register}
              />
            </ThemeProvider>
          </LocalizationProvider>
        </Switch>
      </Router>
    );
  }
}

export default App;
