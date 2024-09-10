import React, { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AnimatedComponent from "./AnimatedComponent";
import { useUserAuth } from "../hooks/auth-hook";
import ScreenLoader from "../components/ScreenLoader";
import { getToken } from "../utils/axios/token";

const Layout = () => {
  const location = useLocation();
  const { refetchUser, isAuthenticated } = useUserAuth();
  const token = getToken();

  useEffect(() => {
    token && !isAuthenticated && refetchUser();
  }, []);

  return (
    <AnimatedComponent key={"motion-div-" + location.pathname}>
      <Suspense fallback={<ScreenLoader />}>
        <Outlet />
      </Suspense>
    </AnimatedComponent>
  );
};

export default Layout;
