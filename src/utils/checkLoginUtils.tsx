import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getValData, removeValData } from "../services/getDataChrome";
import { CheckLoginApi } from "../api/checkLoginApi";

export const CheckLoginUtils = () => {
    const navigate = useNavigate();
    const [userExists, setUserExists] = useState<boolean | null>(null);

    useEffect(() =>
    {
        const checkUserExistence = async () =>
        {
            const userId = await getValData("userId");
            if (userId !== null)
            {
                const res = await CheckLoginApi(userId);
                if (res)
                {
                    setUserExists(res);
                    navigate("/");
                }

            } else
            {
                setUserExists(false);
                removeValData("user");
                navigate("/login");
                window.location.reload();
            }
        };
        checkUserExistence();
    }, [navigate]);
};
