import React, {
  Component,
  PropsWithChildren,
  ReactComponentElement,
  useState,
  useContext,
  FC,
} from "react";
import "./style.scss";
import GolfCourseOutlinedIcon from "@mui/icons-material/GolfCourseOutlined";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import Rightbar from "./components/Rightbar/Rightbar";
import Leftbar from "./components/Leftbar/Leftbar";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  Navigate,
} from "react-router-dom";
import { DarkModeContext } from "./context/DarkModeContext";
import { AuthContext } from "./context/authContex";
const App = () => {
  const user = false;
  const { darkMode } = useContext(DarkModeContext);
  const Layout: FC = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <Leftbar />
          <div style={{ flex: 6, overflow: "hidden" }}>
            <Outlet />
          </div>
          <Rightbar />
        </div>
      </div>
    );
  };

  type ProtectedRouteType = {
    children: JSX.Element;
  };

  const ProtectedRoute = ({ children }: ProtectedRouteType) => {
    if (!user.id) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { path: "/", element: <Home /> },
        { path: "/profile/:id", element: <Profile /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
