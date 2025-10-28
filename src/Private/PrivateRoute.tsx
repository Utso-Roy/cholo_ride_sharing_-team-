import React, { useContext, ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Auth/AuthProvider";
import Loading from "../Loading/Loading";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading></Loading>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
