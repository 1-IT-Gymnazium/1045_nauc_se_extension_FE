import React from "react";
import ReactDOM from 'react-dom/client';
import { LightToggleMode } from "../utils/lightToggleMode";
import { LoginPage } from "../features/login";


export const Header : React.FC = () =>
{
    // const handleClick = () =>
    // {
    //     chrome.tabs.create({ url: chrome.runtime.getURL("naucse.html") });
    // };

    return (
        <>
            <div className="flex items-center justify-center h-min">
                <div className="flex items-center space-x-4 m-4 w-full">
                    <div className="w-1/2">
                        <div className="flex items-center justify-center">
                            <div className="flex items-center justify-between">
                                <a href=""
                                    className="text-base no-underline noselect">
                                    NaučSe!
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="flex items-center justify-center">
                            <p onClick={LoginPage}>Login</p>
                        </div>
                        <LightToggleMode />
                    </div>
                </div>
            </div>
        </>
    );
}
