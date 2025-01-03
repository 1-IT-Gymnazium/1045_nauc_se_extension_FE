import { Globals } from "..";

export const WordBankRemoveApi = async (id: string, word: string) =>
{
    try
    {
        const response = await fetch(`${Globals.apiUrl}/removewordbank`,
        {
            method : "POST",
            headers :
            {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
            {
                id : id,
                word : word,

            }),
        });

        if (!response.ok)
        {
            const errorData = await response.json();
            throw new Error(errorData.error || "Error");
        }

        const data = await response.json();
        return data;
    }
    catch (err: any)
    {
        throw err;
    }
};
