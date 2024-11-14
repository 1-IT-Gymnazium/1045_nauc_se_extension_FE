import React, { useState, useEffect } from "react";

interface UrlApiProps
{
    url : string;
}

export const UrlApi: React.FC<UrlApiProps> = ({ url }) =>
{
    const [urlString, setUrlString] = useState<string>("");

    const getStringUrl = async () =>
    {
        try
        {
            const response = await fetch("http://127.0.0.1:5000/url_proccess",
            {
                method : "POST",
                headers :
                {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                {
                    text : url,
                }),
            });

            if (!response.ok)
            {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const data = await response.json();
            setUrlString(data.translated_text);
        }
        catch (err: any)
        {
            console.error(err.message);
        }
    };

    useEffect(() =>
    {
        if (url)
        {
            getStringUrl();
        }
    }, [url]);

    return (
        <div>
            <p>{urlString || "Loading..."}</p>
        </div>
    );
};
