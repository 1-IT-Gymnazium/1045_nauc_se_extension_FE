import React from "react";
import { LightToggleMode } from "../utils/lightToggleMode";

interface HeaderProps
{
    setPage : React.Dispatch<React.SetStateAction<string>>;
}

export const Header: React.FC<HeaderProps> = ({ setPage }) =>
{
    return (
        <div className="flex items-center justify-center h-min">
            <div className="flex items-center space-x-4 m-4 w-full">
                <div className="w-3/5">
                    <div className="flex items-center justify-center">
                        <div className="flex items-center justify-between">
                            <a onClick={() => setPage("/")}
                                className="text-base no-underline noselect">
                                NaučSe!
                            </a>
                        </div>
                    </div>
                </div>
                <div className="w-2/5">
                    <div className="flex items-center justify-center">
                        <div className="flex items-center justify-between">
                            <a onClick={() => setPage("/login")}
                                className="items-center justify-center text-base no-underline mr-3">
                                Login
                            </a>
                            <LightToggleMode />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
