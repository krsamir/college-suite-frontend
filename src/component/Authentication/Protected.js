import React from "react";
import Cookies from "universal-cookie";
import { Route, Redirect } from "react-router-dom";
// import { role } from "../Redux/Actions/GlobalAction";
import { connect } from "react-redux";
export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const cookies = new Cookies();
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          if (cookies.get("sid") !== undefined && cookies.get("sid") !== "") {
            return <Component {...props} />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          }
        }}
      />
    </div>
  );
};

export default connect(null, null)(ProtectedRoute);
