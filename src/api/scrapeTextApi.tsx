import { getValData } from "../services/getDataChrome";
import { Globals } from "..";

export const GetTextApi = async (url: string, level: string) =>
{

    const userId = await getValData("userId");
    try
    {

        const response = await fetch(`${Globals.apiUrl}/scrape`,
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
            {
                url: url,
                level: level,
                user_id : userId,
            }),
        });

        const data = await response.json();

        if (!response.ok)
        {
            return "error";
        }

        return data;
    }
    catch (err)
    {
        throw err;
    }
};
