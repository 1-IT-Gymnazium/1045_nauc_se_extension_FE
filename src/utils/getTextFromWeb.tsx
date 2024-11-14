import React, { useState, useEffect } from "react";

interface ScrapedData
{
    text : string;
}

export const GetTextUtils: React.FC = () => {
    const [scrapedText, setScrapedText] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [url, setUrl] = useState<string>("");

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            if (!url) return;
            try
            {
                const response = await fetch(`http://localhost:5000/scrape?url=${encodeURIComponent(url)}`);
                if (!response.ok)
                {
                    throw new Error();
                }
                const data : ScrapedData = await response.json();
                setScrapedText(data.text);
            }
            catch (err : any)
            {
                console.error(err.message);
                setError(err.message);
            }
        };

        fetchData();
    }, [url]);

    useEffect(() =>
    {
        const getActiveTabUrl = () =>
        {
            chrome.tabs.query({ active : true, currentWindow : true }, (tabs) =>
            {
                const activeTab = tabs[0];
                if (activeTab && activeTab.url)
                {
                    setUrl(activeTab.url);
                }
            });
        };
        getActiveTabUrl();

    }, []);

    return (
        <div>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                <p>Scraped Text: {scrapedText || "Loading..."}</p>
            )}
        </div>
    );
};


