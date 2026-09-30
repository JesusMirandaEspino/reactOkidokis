import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";



interface RootState {
  session: {
    bearer: string;
    active: boolean;
    roles: string[];
  };
}



interface PrivateRouteProps {
  children: JSX.Element;
  requiredRole?: string;
}

export default function PrivateRoute({
  children,
  requiredRoles,
}: PrivateRouteProps) {
  const { active, roles } = useSelector((state: RootState) => state.session);

  if (!active) {
    return <Navigate to="/login" replace />;
  }

  console.log(roles, requiredRoles);

  if (requiredRoles && !roles.some((role) => requiredRoles.includes(role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
