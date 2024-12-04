import { Globals } from "..";

export const CheckLoginApi = async (id : string) =>
{
    try
    {
        const response = await fetch(`${Globals.apiUrl}/checkuser`,
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
        return true;
    }
    catch (err: any)
    {
        throw err;
    }
};
