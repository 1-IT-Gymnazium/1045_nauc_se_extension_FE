import { Globals } from "..";

export const WordBankAddApi = async (id: string, word: string) =>
{
    try
    {
        const response = await fetch(`${Globals.apiUrl}/addwordbank`,
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
            throw new Error(errorData.error || "Error words added");
        }

        const data = await response.json();
        return data;
    }
    catch (err: any)
    {
        throw err;
    }
};
