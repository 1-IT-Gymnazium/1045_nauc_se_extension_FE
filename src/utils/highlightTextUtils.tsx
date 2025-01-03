import React, { useEffect } from "react";
import { useScrapedData } from "./scrapeTextUtils";
import { LoadingBlock } from "../blocks/loadingBlock";

declare global
{
    interface Window {
        captureWord: (event: MouseEvent) => void;
    }
}

export const WordHighlighter: React.FC = () =>
{
    const { scrapedData, loading, error } = useScrapedData();

    useEffect(() => {
        if (!loading && scrapedData) {
            const wordsToHighlight = WordsToHighlight(scrapedData);
            const wordIdMapping = GenerateWordId(wordsToHighlight);
            storeWordsAndHighlight(wordIdMapping);
        }
    }, [scrapedData, loading]);

    if (loading) return <LoadingBlock/>
    if (error) return <div>Error: {error}</div>;

    return null;
};





const WordsToHighlight = (text: string): string[] => {
    const words = text.match(/\b\w+\b/g);
    return words ? Array.from(new Set(words)) : [];
};

const GenerateWordId = (words: string[]): Record<string, string> => {
    return words.reduce((acc, word, index) => {
        acc[word] = `word-${index}`;
        return acc;
    }, {} as Record<string, string>);
};

const storeWordsAndHighlight = (wordIdMapping: Record<string, string>) => {
    chrome.storage.local.set({ wordIdMapping }, () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]?.id) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: (mapping) => {
                        const words = Object.keys(mapping);
                        const regex = new RegExp(`\\b(${words.join("|")})\\b`, "gi");

                        const walkTextNodes = (node: Node) => {
                            if (node.nodeType === Node.TEXT_NODE) {
                                const textNode = node as Text;
                                const originalText = textNode.textContent || "";
                                const newText = originalText.replace(regex, (match) => {
                                    const id = mapping[match];
                                    return `<span class="highlighted-word" data-id="${id}" data-word="${match}" style="color: red; font-weight: bold; cursor: pointer;">${match}</span>`;
                                });
                                if (newText !== originalText) {
                                    const span = document.createElement("span");
                                    span.innerHTML = newText;
                                    textNode.replaceWith(span);
                                }
                            } else {
                                node.childNodes.forEach(walkTextNodes);
                            }
                        };

                        walkTextNodes(document.body);

                        const highlightedWords = document.querySelectorAll(".highlighted-word");
                        highlightedWords.forEach((wordElement) => {
                            if (wordElement instanceof HTMLElement) {
                                wordElement.addEventListener("mouseenter", (event) => {
                                    const word = (event.target as HTMLElement).dataset.word;
                                    const box = document.createElement("div-box");
                                    box.innerHTML = `<button class="add-word-btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">Add</button>`;

                                    const rect = (event.target as HTMLElement).getBoundingClientRect();
                                    box.style.position = "absolute";
                                    box.style.left = `${rect.right + window.scrollX - 40}px`;
                                    box.style.top = `${rect.top + window.scrollY - 40}px`;
                                    document.body.appendChild(box);

                                    const addButton = box.querySelector(".add-word-btn");
                                    addButton?.addEventListener("click", () => {
                                        window.captureWord(event);
                                        box.remove();
                                    });

                                    const isMouseFar = (e: MouseEvent) => {
                                        const wordRect = (event.target as HTMLElement).getBoundingClientRect();
                                        const distance = Math.sqrt(
                                            Math.pow(e.clientX - wordRect.left, 2) +
                                            Math.pow(e.clientY - wordRect.top, 2)
                                        );
                                        return distance > 150;
                                    };

                                    const onMouseMove = (e: MouseEvent) => {
                                        if (isMouseFar(e)) {
                                            box.remove();
                                            document.removeEventListener("mousemove", onMouseMove);
                                        }
                                    };

                                    document.addEventListener("mousemove", onMouseMove);
                                });
                            }
                        });

                        window.captureWord = async (event: MouseEvent) => {
                            const clickedElement = event.target as HTMLElement;
                            const clickedWord = clickedElement.dataset.word?.toLowerCase();

                            if (clickedWord) {
                                try {
                                    chrome.storage.local.get(['words-data'], (result) =>
                                    {
                                        const existingWords: string[] = result['words-data'] || [];

                                        if (!existingWords.includes(clickedWord.toLowerCase())) {
                                            existingWords.push(clickedWord);

                                            chrome.storage.local.set({ 'words-data': existingWords });

                                        }
                                    });
                                } catch (err) {
                                   throw err;
                                }
                            }
                        };

                    },
                    args: [wordIdMapping],
                });
            }
        });
    });
};
