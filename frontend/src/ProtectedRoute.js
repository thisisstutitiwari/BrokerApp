import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, roles, fallback }) => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    return <Navigate to={fallback} />;
  }

  if (roles && roles.length > 0) {
    const userRole = localStorage.getItem("role");

    if (!roles.includes(userRole)) {
      return <Navigate to={fallback} />;
    }
  }

  return element;
};

const AuthProtect = ({ element }) => {
  const userId = localStorage.getItem("userId");

  if (userId) {
    return <Navigate to="/" />;
  }

  return element;
};

export { ProtectedRoute, AuthProtect };