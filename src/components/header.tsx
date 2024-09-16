import React from "react";
import { LightToggleMode } from "../utils/lightToggleMode";

export const Header : React.FC = () =>
{
    return (
        <>
            <div className="flex items-center justify-center h-min">
                <div className="flex items-center space-x-4 m-4 w-full">
                    <div className="w-1/2">
                        <div className="flex items-center justify-center">
                            <div className="flex items-center justify-between">
                                <a href="/home" className="text-base no-underline noselect">NaučSe!</a>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <LightToggleMode />
                    </div>
                </div>
            </div>
        </>
    );

}