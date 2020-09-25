import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";

//render a component dynamically -> pick component attribute of props obj. rename to big "C" component, so React doesn't bugout
const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      path={path} //could rely on ..rest obj (holds rest of props)
      {...rest}
      render={(props) => {
        console.log(props);
        if (!auth.getCurrentUser()) return <Redirect to={{
            pathname: '/login', 
            state: { from: props.location }
        }} />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
