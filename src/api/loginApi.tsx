import { setValData } from "../services/getDataChrome";

export const LoginApi = async (username: string, password: string) =>
{
    try
    {
        const response = await fetch("http://127.0.0.1:5000/loginuser",
        {
            method : "POST",
            headers :
            {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: username,
                password: password,
            }),
        });

        if (!response.ok)
        {
            const errorData = await response.json();
            throw new Error(errorData.error || "Error occured");
        }

        const data = await response.json();
        setValData("user", data)
        return data;

    }
    catch (err : any)
    {
        throw err;
    }
};
