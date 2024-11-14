import React, { useState } from "react";
import { Header } from "./components/header";
import { LoadPage } from "./utils/showPage";

const App: React.FC = () =>
{
    const [page, setPage] = useState("/");
    return (
        <div className="page bg-white dark:bg-slate-800">
            <Header setPage={setPage} />
            <LoadPage page={page} setPage={setPage} />
        </div>
    );
};

export default App;
