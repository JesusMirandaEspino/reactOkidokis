import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import Home from "../components/home/home.tsx";
import Login from "../components/login/login.tsx";
import CreateAccount from "../components/createAccount/createAccount.tsx";
import Task from "../components/tasks/taks.tsx";
import Unauthorized from "../components/ErrorsPages/unauthorized.tsx";
import UserAdmin from "../components/admin/UserAdmin.tsx";
import PrivateRoute from "../security/PrivateRoute.tsx";
import Logout from "../components/login/logout.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // layout principal
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/create", element: <CreateAccount /> },
      { path: "/unauthorized", element: <Unauthorized /> },
      { path: "/logout", element: <Logout /> },

      {
        path: "/admin",
        element: (
          <PrivateRoute requiredRoles={["ADMIN"]}>
            <UserAdmin />
          </PrivateRoute>
        ),
      },

      {
        path: "/tasks/:id",
        element: (
          <PrivateRoute requiredRoles={["ADMIN", "USER"]}>
            <Task />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
