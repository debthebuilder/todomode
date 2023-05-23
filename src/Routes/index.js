import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/Login";
import Dashboard from "../Pages/Dashboard";
import ForgotPassword from "../Pages/ForgotPassword";
import ResetPassword from "../Pages/ResetPassword";
import Register from "../Pages/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "login",
        element: <Login />
    },
    {
        path: "register",
        element: <Register />
    },
    {
        path: "dashboard",
        element: <Dashboard /> 
    },
    {
        path: "forgot-password",
        element: <ForgotPassword /> 
    },
    {
        path: "reset-password",
        element: <ResetPassword /> 
    },
]);

export default router;