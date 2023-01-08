import React, {
  Component,
  PropsWithChildren,
  ReactComponentElement,
  useState,
  FC,
} from "react";
import reactLogo from "./assets/react.svg";
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
const App = () => {
  const isUser: boolean = true;
  const Layout: FC = () => {
    return (
      <>
        <Navbar />
        <div style={{ display: "flex" }}>
          <Leftbar />
          <Outlet />
          <Rightbar />
        </div>
      </>
    );
  };

  type ProtectedRouteType = {
    children: JSX.Element;
  };

  const ProtectedRoute = ({ children }: ProtectedRouteType) => {
    if (!isUser) {
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
