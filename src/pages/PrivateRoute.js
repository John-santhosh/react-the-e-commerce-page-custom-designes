import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
// will remove later
// import { useUserContext } from "../context/user_context";

// ...rest
const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useAuth0();

  // ...spread
  if (!user) {
    return <Navigate to="/"></Navigate>;
  }
  return children;
};
export default PrivateRoute;
