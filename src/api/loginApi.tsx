import { setValData } from "../services/getDataChrome";
import { Globals } from "..";

export const LoginApi = async (username: string, password: string) =>
{
    try
    {
        const response = await fetch(`${Globals.apiUrl}/loginuser`,
        {
            method : "POST",
            headers :
            {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
            {
                name : username,
                password : password,

            }),
        });

        if (!response.ok)
        {
            const errorData = await response.json();
            throw new Error(errorData.error || "Error Login");
        }

        const data = await response.json();

        setValData("userId", data.id);
        setValData("user", data.name);
        setValData("level", data.level);

        return data;
    }
    catch (err: any)
    {
        throw err;
    }
};
