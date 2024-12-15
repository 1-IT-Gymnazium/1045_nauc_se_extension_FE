import { Globals } from "..";

export const TranslateApi = async (textToTranslate: string): Promise<string> =>
{
    try
    {
        const response = await fetch(`${Globals.apiUrl}/translate`,
        {
            method : "POST",
            headers :
            {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: textToTranslate }),
        });

        if (!response.ok)
        {
            const errorData = await response.json();
            throw new Error(errorData.error || "Translation failed");
        }

        const data = await response.json();
        return data.translated_text;

    } catch (err)
    {
        return "Translation failed";
    }
};
