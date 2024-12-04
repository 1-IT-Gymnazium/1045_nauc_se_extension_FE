import React, { useState, useEffect } from "react";
import { Globals } from "..";

interface TranslateApiProps
{
    textToTranslate : string;
}

export const TranslateApi: React.FC<TranslateApiProps> = ({ textToTranslate }) =>
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
            console.error(err.message);
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
