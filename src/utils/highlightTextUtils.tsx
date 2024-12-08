// import React, { useEffect } from "react";
// import { useScrapedData } from "./scrapeTextUtils";

// const WordHighlighter: React.FC = () => {
//   const { scrapedData, loading, error } = useScrapedData();

//   // Extract words to highlight from scraped data
//   const extractWordsToHighlight = (text: string): string[] => {
//     const words = text.match(/\b\w+\b/g); // Match all words
//     return words ? Array.from(new Set(words)) : [];
//   };

//   // Function to inject into the page for highlighting words
//   const highlightWords = (words: string[]) => {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       if (tabs[0]?.id) {
//         chrome.scripting.executeScript({
//           target: { tabId: tabs[0].id },
//           func: (highlightedWords) => {
//             const regex = new RegExp(`\\b(${highlightedWords.join("|")})\\b`, "gi");
//             document.body.innerHTML = document.body.innerHTML.replace(
//               regex,
//               `<span style="color: red; font-weight: bold;">$1</span>`
//             );
//           },
//           args: [words],
//         });
//       }
//     });
//   };

//   useEffect(() => {
//     if (!loading && scrapedData) {
//       const wordsToHighlight = extractWordsToHighlight(scrapedData);
//       highlightWords(wordsToHighlight);
//     }
//   }, [scrapedData, loading]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return null; // No UI required, everything happens in the background
// };

// export default WordHighlighter;

// WordHighlighter.tsx
// WordHighlighter.tsx
// WordHighlighter.tsx

import React, { useEffect } from "react";
import { useScrapedData } from "./scrapeTextUtils";

const WordHighlighter: React.FC = () =>
{
  const { scrapedData, loading, error } = useScrapedData();

  // Extract words to highlight from scraped data
  const extractWordsToHighlight = (text: string): string[] => {
    const words = text.match(/\b\w+\b/g); // Match all words
    return words ? Array.from(new Set(words)) : [];
  };

  // Function to store words in chrome.storage and inject them into the page for highlighting
  const storeWordsAndHighlight = (words: string[]) => {
    // Store the words in chrome storage
    chrome.storage.local.set({ wordsToHighlight: words }, () => {
      // After storing, we can inject a script to highlight these words
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: (highlightedWords) => {
              const regex = new RegExp(`\\b(${highlightedWords.join("|")})\\b`, "gi");
              document.body.innerHTML = document.body.innerHTML.replace(
                regex,
                `<span style="color: red; font-weight: bold;">$1</span>`
              );
            },
            args: [words],
          });
        }
      });
    });
  };

  useEffect(() => {
    if (!loading && scrapedData) {
      const wordsToHighlight = extractWordsToHighlight(scrapedData);
      storeWordsAndHighlight(wordsToHighlight); // Store words and highlight
    }
  }, [scrapedData, loading]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return null; // No UI required, everything happens in the background
};

export default WordHighlighter;
