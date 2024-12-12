import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WordHighlighter } from "../utils/highlightTextUtils"; // Make sure this is the correct path
import { getValData } from "../services/getDataChrome"; // Make sure this is the correct path
import { removeAddedWords } from "../utils/homepageUtils";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import { CheckLoginUtils } from "../utils/checkLoginUtils";


// export const Homepage : React.FC = () =>
// {
//     return <>Test</>
// }


export const Homepage: React.FC = () => {
    const navigate = useNavigate();
    const [highlight, setHighlight] = useState(false);
    const [addedWords, setAddedWords] = useState<string[]>([]);

    CheckLoginUtils();

    useEffect(() => {
        const getWords = async () => {
            const storedWords = await getValData("words-data");
            if (storedWords) {
                setAddedWords(storedWords);
            } else {
                setAddedWords([]); // If no words are stored, initialize as empty array
            }
        };

        getWords();
    }, []);

    return (
        <>
            <div className="mt-4 space-y-4 m-3">
                <div className="mb-5">
                    <button
                        className="text-sm w-full py-3 px-6 rounded-lg text-white bg-blue-600 hover:bg-blue-700 no-style"
                        onClick={() => setHighlight((prev) => !prev)}
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
                                                role="button"
                                                key={index}
                                                className="text-sm dark:text-white flex w-full items-center rounded-md p-2 pl-3 transition-all">
                                                    {word.toLowerCase() }
                                                <div className="ml-auto flex align-center justify-center">
                                                    <button className="dark:text-white rounded-md border border-transparent p-1 text-center text-sm transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                                                        <IoMdAddCircleOutline size={18} />
                                                    </button>
                                                    <button className="dark:text-white rounded-md border border-transparent p-1 text-center text-sm transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button"
                                                        onClick={() => removeAddedWords(word, index)}>
                                                        <FaTrashAlt size={15} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    </nav>
                                    </div>
                                    <button
                                            className="dark:text-white w-full py-3 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 no-style">
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
