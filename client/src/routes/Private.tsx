import React, { lazy, useEffect } from "react";
import { motion } from "framer-motion";
import { Outlet, useNavigate } from "react-router-dom";
import { ROUTES } from "./constants.route";
import { useUserAuth } from "../hooks/auth-hook";
import Button from "../components/button";
import { CiUser } from "react-icons/ci";
const ScreenLoader = lazy(() => import("../components/ScreenLoader"));

const PrivateRouteLayout: React.FC = () => {
  const { isAuthenticated, isLoading, logoutUser, user } = useUserAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.SIGN_IN);
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) return <ScreenLoader />;

  return (
    <>
      {isAuthenticated ? (
        <motion.div className="flex">
          <div className="fixed top-0 left-0 flex justify-end p-5 w-full z-50">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 text-base">
                <CiUser />
                {user?.name}
              </div>
              <div onClick={logoutUser}>
                <Button text="Log out" className="cursor-pointer justify-end" />
              </div>
            </div>
          </div>

          <main
            className="w-screen h-screen overflow-y-auto overflow-x-hidden z-10 flex flex-col bg-mainBackgroundColor items-center pt-32





"
          >
            <Outlet />
          </main>
        </motion.div>
      ) : (
        <ScreenLoader />
      )}
    </>
  );
};

export default PrivateRouteLayout;
