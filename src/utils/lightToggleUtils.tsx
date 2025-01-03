import React, { useState, useEffect } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { StorageSetItem, StorageGetItem } from "../services/storage";

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

        const bodyElements = Array.from(document.querySelectorAll("body *"))
            .filter(el => !el.classList.contains("no-style"));

        bodyElements.forEach((el) =>
        {
            if (el instanceof HTMLElement)
            {
                el.style.color = colorText;
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
        <div className="flex items-right justify-center">
            <button onClick={darkModeHandler}>
                {
                    dark ? <IoSunny className="text-base" style={{ color: "white" }} /> :
                           <IoMoon className="text-base" style={{ color: "black" }} />
                }
            </button>
        </div>
    );
};
