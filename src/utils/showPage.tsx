import React from "react";
import { LoginPage } from "../features/login";

export const LoadPage: React.FC = () => {
    var display = "login"

    switch (display) {
        case "":
            return
        case "login":
            return <LoginPage />;
        default:
            return null; // or some fallback component
    }

    return <></>;
};
