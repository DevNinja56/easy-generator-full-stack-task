import { lazy } from "react";
const SignIn = lazy(() => import("../pages/Auth/SignIn"));
const SignUp = lazy(() => import("../pages/Auth/SignUp"));
const Application = lazy(() => import("../pages/Application"));

export const ROUTES = {
  SIGN_IN: "/",
  SIGN_UP: "/signUp",
  APPLICATION: "/application",
};

export const ALL_ROUTES = [
  { path: ROUTES.SIGN_IN, element: SignIn },
  { path: ROUTES.SIGN_UP, element: SignUp },
  {
    path: ROUTES.APPLICATION,
    element: Application,
  },
];
