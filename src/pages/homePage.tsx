import React, { useEffect, useState } from "react";
import { WordHighlighter } from "../utils/highlightTextUtils";
import { getValData } from "../services/getDataChrome";
import { removeAddedWords, addWordsToBank } from "../utils/homepageUtils";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import { CheckLoginUtils } from "../utils/checkLoginUtils";
import { TranslateApi } from "../api/translateApi";
import { setValData } from "../services/getDataChrome";


/**
 * Homepage
 *
 * @component
 * @returns {React.ReactElement} The rendered Homepage component.
 */


export const Homepage: React.FC = () =>
{
    const [userId, setUserId] = useState("");
    const [addedWords, setAddedWords] = useState<string[]>([]);
    const [translations, setTranslations] = useState<Record<string, string>>({});

    CheckLoginUtils();

    const getUserId = async () =>
    {
        const userIdGet = await getValData("userId");
        setUserId(userIdGet)
    }
    getUserId();

    useEffect(() =>
    {
        const getWords = async () => {
            const storedWords = await getValData("words-data");

            if (storedWords) setAddedWords(storedWords);
            else setAddedWords([]);
        };

        getWords();
    }, []);


    useEffect(() =>
    {
        chrome.storage.local.get("selectedText", (result) =>
        {
            if (result.selectedText)
            {
                setAddedWords((currentWords) =>
                {

                    if (currentWords.includes(result.selectedText)) {
                        return currentWords;
                    }

                    const updatedWords = [...currentWords, result.selectedText];
                    setValData("words-data", updatedWords);
                    return updatedWords;
                });


                chrome.storage.local.remove("selectedText");
            }
        });
    }, []);

    useEffect(() =>
    {
        const fetchTranslations = async () =>
        {
            const newTranslations: Record<string, string> = {};
            for (const word of addedWords)
            {
                newTranslations[word] = await TranslateApi(word.toLowerCase());
            }
            setTranslations(newTranslations);
        };

        fetchTranslations();
    }, [addedWords]);


    const openExtension = () => window.open("chrome-extension://jfkpfocnjofoibmcihgfhibpeionpidf/index.html#/learnpage", "_blank");


    return (
        <>
            <div className="mt-4 space-y-4 m-3">
                <div className="mb-5">
                    <button
                        className="text-sm w-full py-3 px-6 rounded-lg text-white bg-blue-600 hover:bg-blue-700 no-style"
                        onClick={() => openExtension()}
                    >
                        Start revision
                    </button>
                </div>
                        {addedWords.length > 0 ? (
                                <>
                                <div className="relative flex flex-col rounded-lg shadow-sm border border-slate-200">
                                    <nav className="flex max-w-[240px] flex-col gap-1 p-1.5">
                                        <div className="max-h-[300px] overflow-y-auto
                                                        [&::-webkit-scrollbar]:w-2
                                                        [&::-webkit-scrollbar-track]:rounded-full
                                                        [&::-webkit-scrollbar-track]:bg-gray-100
                                                        [&::-webkit-scrollbar-thumb]:rounded-full
                                                        [&::-webkit-scrollbar-thumb]:bg-gray-300
                                                        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                                                        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                                            {addedWords.map((word, index) =>
                                            (
                                                <div
                                                    key={index}
                                                    className="text-sm dark:text-white flex w-full items-center rounded-md p-2 pl-3 transition-all">
                                                        <div className="flex items-center justify-center gap-1">
                                                            <p className="text-xs">{` ${word.toLowerCase()}` }</p>
                                                            <span>{" - "}</span>
                                                            <p className="text-xs">{(translations[word] as string)?.toLowerCase()}</p>
                                                        </div>
                                                    <div className="ml-auto flex align-center justify-center">
                                                        <button className="dark:text-white rounded-md border border-transparent p-1 text-center text-sm transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button"
                                                                onClick={async () =>
                                                                {
                                                                    await addWordsToBank(userId, word);
                                                                    const updatedWords = addedWords.filter((_, i) => i !== index);
                                                                    await setValData("words-data", updatedWords);
                                                                    setAddedWords(updatedWords);
                                                                }}
                                                        >
                                                            <IoMdAddCircleOutline size={18} />
                                                        </button>
                                                        <button className="dark:text-white rounded-md border border-transparent p-1 text-center text-sm transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button"
                                                            onClick={() => removeAddedWords(word)}>
                                                            <FaTrashAlt size={15} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </nav>
                                </div>
                                <button
                                        className="text-sm w-full py-3 px-6 rounded-lg text-white bg-blue-600 hover:bg-blue-700 no-style"
                                        onClick={async () =>
                                        {
                                            for (const wordEl of addedWords)
                                            {
                                                await addWordsToBank(userId, wordEl);
                                            }
                                            await setValData("words-data", []);
                                            window.location.reload();
                                        }}
                                        >
                                        Add to learning list
                                </button>
                            </>

                        ) :
                        (
                            <h2 className="text-center">No words added yet</h2>
                        )}

                </div>
            <WordHighlighter />
        </>
    );
};
