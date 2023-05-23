import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/Login";
import Dashboard from "../Pages/Dashboard";
import Register from "../Pages/Register";
import Protected from "./Protected";

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
        element: (
            <Protected>
                <Dashboard />
            </Protected>
        )
    },
]);

export default router;