import React, { useState, useEffect } from "react";
import { getValData } from "../services/getDataChrome";

// export const GetTextUtils = () => {
//     const [scrapedText, setScrapedText] = useState<string>("");
//     const [highlightedWords, setHighlightedWords] = useState<string[]>([]);
//     const [error, setError] = useState<string | null>(null);
//     const [url, setUrl] = useState<string>("");
//     const userLevel = getValData("level");

//     // Fetch scraped text based on the URL
//     useEffect(() => {
//         const fetchData = async () => {
//             if (!url) return;
//             try {
//                 const response = await fetch(`http://localhost:5000/scrape?url=${encodeURIComponent(url)}`);
//                 if (!response.ok) {
//                     throw new Error("Error fetching scraped text");
//                 }
//                 const data = await response.json();

//                 const cleanText = data.text.split(/\s+/).join(" ").trim();
//                 setScrapedText(cleanText);
//             } catch (err: any) {
//                 console.error("Error fetching scraped text:", err.message);
//                 setError(err.message);
//             }
//         };

//         fetchData();
//     }, [url]);

//     // Get the active tab's URL from the browser extension or use a fallback for development
//     useEffect(() => {
//         const getActiveTabUrl = () => {
//             if (typeof chrome !== "undefined" && chrome.tabs) {
//                 chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//                     if (tabs && tabs.length > 0) {
//                         const activeTab = tabs[0];
//                         if (activeTab.url) {
//                             setUrl(activeTab.url);
//                         }
//                     } else {
//                         console.warn("No active tabs found.");
//                     }
//                 });
//             } else {
//                 console.warn("chrome.tabs is not available. Are you running this in a browser extension?");
//                 setUrl("https://example.com");
//             }
//         };
//         getActiveTabUrl();
//     }, []);

//     // Filter words based on scraped text and user level
//     useEffect(() => {
//         if (scrapedText) {
//             const filterWords = async () => {
//                 try {
//                     const requestBody = {
//                         text: scrapedText,
//                         user_level: userLevel,
//                     };

//                     const response = await fetch("http://localhost:5000/filter-words", {
//                         method: "POST",
//                         headers: {
//                             "Content-Type": "application/json",
//                         },
//                         body: JSON.stringify(requestBody),
//                     });

//                     if (response.ok) {
//                         const data = await response.json();
//                         setHighlightedWords(data.highlighted_words || []);
//                     } else {
//                         console.error("Failed to filter words.");
//                     }
//                 } catch (err: any) {
//                     console.error("Error filtering words:", err.message);
//                 }
//             };

//             filterWords();
//         }
//     }, [scrapedText, userLevel]);

//     return (
//         <div>
//             <div>
//                 <h3>Highlighted Words</h3>
//                 {highlightedWords.length > 0 ? (
//                     <ul>
//                         {highlightedWords.map((word, index) => (
//                             <li key={index}>{word}</li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p>No words highlighted above your level.</p>
//                 )}
//             </div>
//         </div>
//     );
// };
