import { Globals } from "..";

export const UserWordsApi = async (id : string) =>
{
    try
    {
        const response = await fetch(`${Globals.apiUrl}/userwords`,
        {
            method : "POST",
            headers :
            {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
            {
                id : id,

            }),
        });

        if (!response.ok)
        {
            return false;
        }

        const data = await response.json();
        return data;

    }
    catch (err: any)
    {
        throw err;
    }
};
