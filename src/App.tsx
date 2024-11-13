import React, { useState, useEffect} from "react";
import { Header } from "./components/header";
import { LoginPage } from "./features/login";
import { LoadPage } from "./utils/showPage";

const App : React.FC = () => {

    return (
        <div className="page bg-white dark:bg-slate-800">
            <Header />
            <LoadPage />
        </div>
    );
};

export default App;
