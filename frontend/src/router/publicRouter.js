import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ROUTES } from "../config";

const publicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("userLogin") && restricted) {
          return <Redirect to={ROUTES.DASHBOARD} />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default publicRoute;
