import React, { useEffect, useState } from "react";
import { getValData } from "../services/getDataChrome";
import { LightToggleMode } from "../utils/lightToggleMode";

interface HeaderProps {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}

export const Header: React.FC<HeaderProps> = ({ setPage }) => {
    const [userExist, setUserExist] = useState<string | null>(null);

    useEffect(() => {
        const checkUserExistence = async () =>
        {
            const userData = await getValData("user");
            if (userData !== null)
            {
                const userDataTrim = userData.slice(1, userData.length - 1);
                setUserExist(userDataTrim);
            }
        };

        checkUserExistence();
    }, []);


    const handleLogin = () =>
    {
        setPage("/login");
    };

    const handleNavigateHome = () =>
    {
        setPage("/");
    };

    return (
        <div className="flex items-center justify-center h-min">
            <div className="flex items-center space-x-4 m-4 w-full">
                <div className="w-3/5">
                    <div className="flex items-center justify-center">
                        <div className="flex items-center justify-between">
                            <a
                                onClick={handleNavigateHome}
                                className="text-base no-underline hover:underline noselect"
                            >
                                NaučSe!
                            </a>
                        </div>
                    </div>
                </div>
                <div className="w-2/5">
                    <div className="flex items-center justify-center">
                        <div className="flex items-center justify-between">
                            {userExist ? (
                                <span className="text-base no-underline mr-3 noselect">
                                    {userExist}
                                </span>
                            ) : (
                                <a
                                    onClick={handleLogin}
                                    className="items-center justify-center text-base no-underline mr-3 hover:underline noselect">
                                    Login
                                </a>
                            )}
                            <LightToggleMode />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
