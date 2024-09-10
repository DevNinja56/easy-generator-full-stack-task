import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ROUTES } from "./constants.route";
import { useUserAuth } from "../hooks/auth-hook";
import ScreenLoader from "../components/ScreenLoader";

const PublicRouteLayout = () => {
  const { isAuthenticated, isLoading } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate(ROUTES.APPLICATION);
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) return <ScreenLoader />;

  return <Outlet />;
};

export default PublicRouteLayout;
