import { useContext, FC } from "react";
import { useLocation } from "react-router-dom";
import "./style.scss";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import Rightbar from "./components/Rightbar/Rightbar";
import Leftbar from "./components/Leftbar/Leftbar";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Chat from "./pages/Chat/Chat";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { DarkModeContext } from "./context/DarkModeContext";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
type ProtectedRouteType = {
  children: JSX.Element;
};
const queryClient = new QueryClient();
const App = () => {
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  const Layout: FC = () => {
    const location = useLocation();
    console.log(location.pathname.split);
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <Navbar />
          <div style={{ display: "flex" }}>
            <Leftbar />
            <div style={{ flex: 6, overflow: "hidden" }}>
              <Outlet key={location.pathname} />
            </div>
            <Rightbar />
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }: ProtectedRouteType) => {
    if (!user) {
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
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/chat/:receiverId?",
      element: (
        <QueryClientProvider client={queryClient}>
          <div className={`theme-${darkMode ? "dark" : "light"}`}>
            <Navbar />
            <Chat />
          </div>
        </QueryClientProvider>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
