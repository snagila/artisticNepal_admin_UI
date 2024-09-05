import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Admin_private_Route = ({ children }) => {
  const { admin } = useSelector((state) => state.admin);
  if (!admin?._id) {
    return <Navigate to="/" />;
  }
  if (admin?.role === "admin") {
    return children;
  }
  return <Navigate to="/" />;
};

export default Admin_private_Route;
