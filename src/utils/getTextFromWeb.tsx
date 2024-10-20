import React, { useState, useEffect } from "react";

interface ScrapedData {
    text: string;
}

const GetTextUtils: React.FC = () => {
    const [scrapedText, setScrapedText] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [url, setUrl] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            if (!url) return; // Ensure that URL is defined before making the request
            try {
                // Include the URL as a query parameter in the request
                const response = await fetch(`http://localhost:5000/scrape?url=${encodeURIComponent(url)}`);
                if (!response.ok) {
                    throw new Error('Error fetching data');
                }
                const data: ScrapedData = await response.json();
                setScrapedText(data.text);
            } catch (err: any) {
                console.error(err.message);
                setError(err.message);
            }
        };

        fetchData();
    }, [url]);

    useEffect(() => {
        // Function to get the active tab's URL
        const getActiveTabUrl = () => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const activeTab = tabs[0];
                if (activeTab && activeTab.url) {
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

export default GetTextUtils; // Export the component for use
