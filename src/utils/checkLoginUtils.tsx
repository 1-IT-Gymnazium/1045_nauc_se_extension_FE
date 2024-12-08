import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getValData, removeValData } from "../services/getDataChrome";
import { CheckLoginApi } from "../api/checkLoginApi";

export const CheckLoginUtils = () =>
{
    const navigate = useNavigate();

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
                    navigate("/");
                }

            } else
            {
                removeValData("user");
                navigate("/login");
                window.location.reload();
            }
        };
        checkUserExistence();
    }, [navigate]);
};
