import React, { useEffect, useState, Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import { matchPath, Route, Routes, useLocation } from "react-router-dom";
import PersistLogin from "../components/PersistLogin/PersistLogin.jsx";
import { layoutTypes } from "../constants/layout.jsx";
import RequireAuth from "../hooks/RequireAuth.jsx";
import useRefreshToken from "../hooks/useRefreshToken.js";
import {
  changeLayout,
  changeLayoutMode,
  changeSidebarTheme,
  changeSidebarType,
  changeTopbarTheme,
  changeLayoutWidth,
} from "../store/actions.js";
import routes from "./routes.jsx";
import Preloader from "../components/Preloader/Preloader.jsx";

// Lazy load the layouts
const VerticalLayout = lazy(() => import("../Layout/VerticalLayout/index"));
const HorizontalLayout = lazy(() => import("../Layout/HorizontalLayout/index"));
const Layoutclient = lazy(() => import("../Layout/RootLayout.jsx"));
const NonAuthLayout = lazy(() => import("../Layout/NonAuthLayout.jsx"));

const getLayout = (layoutType) => {
  switch (layoutType) {
    case layoutTypes.VERTICAL:
      return VerticalLayout;
    case layoutTypes.HORIZONTAL:
      return HorizontalLayout;
    case layoutTypes.CLIENT:
      return Layoutclient;
    default:
      return NonAuthLayout;
  }
};

const Index = () => {
  const [layoutType, setLayoutType] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const refresh = useRefreshToken();
  const [currentStyle, setCurrentStyle] = useState();

  useEffect(() => {
    const currentRoute = routes.find((route) =>
      matchPath(route.path, location.pathname)
    );
    if (currentRoute) {
      if (currentRoute.layout !== "client" && currentRoute.type !== "public") {
        if (localStorage.getItem("layoutType") == undefined) {
          localStorage.setItem("layoutType", "vertical");
          localStorage.setItem("layoutModeType", "light");
          localStorage.setItem("layoutWidthType", "fluid");
          localStorage.setItem("topBarThemeType", "light");
          localStorage.setItem("leftSidebarType", "default");
          localStorage.setItem("leftSideBarThemeType", "dark");
          setLayoutType("vertical");
        }
        setLayoutType(localStorage.getItem("layoutType"));
        dispatch(changeLayout(localStorage.getItem("layoutType")));

        dispatch(changeLayoutMode(localStorage.getItem("layoutModeType")));
        dispatch(changeLayoutWidth(localStorage.getItem("layoutWidthType")));
        dispatch(
          changeSidebarTheme(localStorage.getItem("leftSideBarThemeType"))
        );
        dispatch(changeTopbarTheme(localStorage.getItem("topBarThemeType")));
        dispatch(changeSidebarType(localStorage.getItem("leftSidebarType")));
      } else {
        dispatch(changeLayout(currentRoute.layout));
        setLayoutType(currentRoute.layout);
      }

      const newStyleSheet =
        currentRoute.layout === "client" ? "style.css" : "theme.scss";

      if (newStyleSheet !== currentStyle) {
        // Remove previous stylesheet if it exists
        const previousStyleSheet =
          document.getElementById("dynamic-stylesheet");
        if (previousStyleSheet) {
          previousStyleSheet.remove();
          console.log("Previous stylesheet removed:", previousStyleSheet.href);
        }

        // Add the new stylesheet
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.id = "dynamic-stylesheet";
        link.href = `${import.meta.env.VITE_CLIENT_HOST || ""}/src/assets/${
          newStyleSheet === "style.css" ? "css" : "scss"
        }/${newStyleSheet}`;
        document.head.appendChild(link);
        console.log(`New stylesheet applied: ${newStyleSheet}`);

        // Store the current style for future use
        setCurrentStyle(newStyleSheet);
      } else {
        console.log("Stylesheet is already applied, no changes made.");
      }
    }
  }, [location.pathname, dispatch]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await refresh();
      } catch (error) {
        console.error("Failed to refresh token:", error);
      }
    }, 5 * 59 * 1000);

    return () => clearInterval(interval);
  }, [refresh]);

  const Layout = getLayout(layoutType);

  return (
    <Suspense fallback={<Preloader />}>
      <Routes>
        {routes.map((route, idx) => {
          const RouteElement =
            route.type === "Admin" ? (
              <PersistLogin>
                <RequireAuth allowedRole={["Admin"]}>
                  <Layout setLayoutType={setLayoutType}>{route.element}</Layout>
                </RequireAuth>
              </PersistLogin>
            ) : route.type === "authProtected" ? (
              <PersistLogin>
                <RequireAuth allowedRole={["Admin", "Instructor"]}>
                  <Layout setLayoutType={setLayoutType}>{route.element}</Layout>
                </RequireAuth>
              </PersistLogin>
            ) : route.type === "public" ? (
              <NonAuthLayout>
                <Layout>{route.element}</Layout>
              </NonAuthLayout>
            ) : route.type === "client" ? (
              <PersistLogin>
                <RequireAuth allowedRole={["Admin", "Instructor", "User"]}>
                  <Layout>{route.element}</Layout>
                </RequireAuth>
              </PersistLogin>
            ) : (
              <PersistLogin>
                <Layout>{route.element}</Layout>
              </PersistLogin>
            );

          return (
            <Route key={idx} path={route.path} element={RouteElement} exact />
          );
        })}
      </Routes>
    </Suspense>
  );
};

export default Index;
