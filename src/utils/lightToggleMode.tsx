import React, { useState, useEffect } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { StorageSetItem, StorageGetItem } from "./../services/storage";

export const LightToggleMode = () =>
{
    const [dark, setDark] = useState(false);

    useEffect(() => 
    {
        const storeMode = StorageGetItem("LightToggleMode");

        if (storeMode === "black")
        {
            setDark(true);
            applyDarkMode(true);
        } 
        else
        {
            setDark(false);
            applyDarkMode(false);
        }
    }, []);

    const applyDarkMode = (isDark : any) => 
    {
        const colorText = isDark ? "white" : "black";
        document.body.classList.toggle("dark", isDark);

        const bodyElements = document.querySelectorAll("body *");
        bodyElements.forEach((element) => 
        {
            if (element instanceof HTMLElement)
            {
                element.style.color = colorText;
            }
            
        });
    };

    const darkModeHandler = () => 
    {
        const newDarkMode = !dark;
        setDark(newDarkMode);
        StorageSetItem("LightToggleMode", newDarkMode ? "black" : "white");
        applyDarkMode(newDarkMode);
    };

    return (
        <div className="flex items-right justify-center mt-1.5">
            <button onClick={darkModeHandler}>
                {
                    dark ? <IoSunny className="text-base" style={{ color: "white" }} /> :
                           <IoMoon className="text-base" style={{ color: "black" }} />
                }
            </button>
        </div>
    );
};
