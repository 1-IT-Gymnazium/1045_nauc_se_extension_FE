import React from "react";
import { Header } from "./components/header";
import { TranslateApi } from "./api/translateApi";

const App: React.FC = () =>
{
    // TranslateApi();
    return (
        <>
            <div className="page bg-white dark:bg-slate-800">
                <Header />
            </div>
        </>
    );
}

export default App;
