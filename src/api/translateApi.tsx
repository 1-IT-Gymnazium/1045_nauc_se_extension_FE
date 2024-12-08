import React, { useState, useEffect } from "react";
import { Globals } from "..";

export const TranslateApi = (textToTranslate : string) =>
{
    const [translatedText, setTranslatedText] = useState<string>("");

    const translateText = async () =>
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
                body : JSON.stringify(
                {
                    text : textToTranslate,
                }),
            });

            if (!response.ok)
            {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const data = await response.json();
            setTranslatedText(data.translated_text);
        }
        catch (err: any)
        {
            throw err;
        }
    };

    useEffect(() =>
    {
        if (textToTranslate)
        {
            translateText();
        }
    }, [textToTranslate]);

    return <>{translatedText ? translatedText : "Translating..."}</>;
};
