import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ROUTES } from "../config";

const privateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          JSON.parse(localStorage.getItem("userLogin")) &&
          localStorage.getItem("role") === "masyarakat"
        ) {
          return (
            <Component {...props} history={props.history} match={props.match} />
          );
        }
        return <Redirect to={ROUTES.LOGIN} />;
      }}
    />
  );
};

export default privateRoute;
