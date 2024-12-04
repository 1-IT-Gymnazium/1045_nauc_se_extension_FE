import React from "react";
import { useNavigate } from "react-router-dom";
import { HomepageUtils } from "../utils/homepageUtils";

export const Homepage: React.FC = () => {
    const navigate = useNavigate();

    const openExtension = () => {
        navigate("/");
        const url = "chrome-extension://jfkpfocnjofoibmcihgfhibpeionpidf/index.html#learnpage";
        window.open(url, "_blank");
    };

    return (
        <div className="mt-4 space-y-4 m-3">
            <HomepageUtils />
            <button
                onClick={openExtension}
                className="w-full py-3 px-6 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
            >
                Start revision
            </button>
        </div>
    );
};
