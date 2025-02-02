import React, { useState, useEffect } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { getValData, setValData } from "../services/getDataChrome";

export const LightToggleMode: React.FC = () =>
{
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const fetchStoredMode = async () => {
            try {
                const storedMode = await getValData("LightToggleMode");
                if (storedMode === "black") {
                    setDark(true);
                    applyDarkMode(true);
                } else {
                    setDark(false);
                    applyDarkMode(false);
                }
            } catch (error) {
                console.error("Error fetching stored mode:", error);
            }
        };

        fetchStoredMode();
    }, []);

    const applyDarkMode = (isDark: boolean) => {
        const colorText = isDark ? "white" : "black";
        document.body.classList.toggle("dark", isDark);

        const bodyElements = Array.from(document.querySelectorAll("body *"))
            .filter(el => !el.classList.contains("no-style"));

        bodyElements.forEach((el) => {
            if (el instanceof HTMLElement) {
                el.style.color = colorText;
            }
        });
    };

    const darkModeHandler = async () => {
        const newDarkMode = !dark;
        setDark(newDarkMode);
        try {
            await setValData("LightToggleMode", newDarkMode ? "black" : "white");
        } catch (error) {
            console.error("Error saving mode:", error);
        }
        applyDarkMode(newDarkMode);
    };

    return (
        <div className="flex items-right justify-center">
            <button onClick={darkModeHandler}>
                {dark ? (
                    <IoSunny className="text-base" style={{ color: "white" }} />
                ) : (
                    <IoMoon className="text-base" style={{ color: "black" }} />
                )}
            </button>
        </div>
    );
};
