import React from "react";
import { LoginPage } from "../features/login";
import { SignupPage } from "../features/signup";

interface LoadPageProps
{
    page : string;
    setPage: (page : string) => void;
}

export const LoadPage: React.FC<LoadPageProps> = ({ page, setPage }) => {
    return (
        <>
            {page === "/" && <h1>Homepage</h1>}
            {page === "/login" && <LoginPage setPage={setPage} />}
            {page === "/signup" && <SignupPage setPage={setPage} />}
        </>
    );
};
