import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import Navigation from "./Navigation";

const ProtectedRoute = ({ children }) => {
  let { user } = useUserAuth();

  const navigate = useNavigate();

  if (!user) {
    return navigate("/");
  } else
    return (
      <>
        <Navigation />
        {children}
      </>
    );
};

export default ProtectedRoute;
