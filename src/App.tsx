import React, { useState, useEffect} from "react";
import { Header } from "./components/header";
import { TranslateApi } from "./api/translateApi";
import { getValData } from "./services/getDataChrome";


const App: React.FC = () =>
{
    const [data, setData] = useState<string>("");

    useEffect(() => 
    {
        const fetchData = async() =>
        {
            const res = await getValData("word");
            setData(res);
        }
        fetchData();
    },);

    return (
        
        <>
            <div className="page bg-white dark:bg-slate-800">
                <Header />
                <div className="flex items-center justify-center">
                    <h2 className="text-lg">
                        { data }
                    </h2>
                </div>
                <div className="flex items-center justify-center">
                    <h2 className="text-lg">
                        <TranslateApi textToTranslate={ data } />

                    </h2>
                </div>
            </div>
        </>
    );
}

export default App;
