import React, { lazy } from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./style/tailwind.scss";
import { ALL_ROUTES, ROUTES } from "./routes/constants.route";
import { store } from "./store/store";
const PrivateRouteLayout = lazy(() => import("./routes/Private"));
const PublicRouteLayout = lazy(() => import("./routes/Public"));
const Layout = lazy(() => import("./routes/Layout"));

const Main = () => {
  return (
    <Provider store={store}>
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            <>
              <Route element={<Layout />}>
                {ALL_ROUTES.map(({ path, element: Component }) => (
                  <Route
                    key={path}
                    path={path}
                    element={
                      path === ROUTES.SIGN_IN || path === ROUTES.SIGN_UP ? (
                        <PublicRouteLayout />
                      ) : (
                        <PrivateRouteLayout />
                      )
                    }
                  >
                    <Route path={path} element={<Component />} />
                  </Route>
                ))}
              </Route>
            </>
          )
        )}
      />
      <Toaster position="bottom-right" reverseOrder={false} />
    </Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
