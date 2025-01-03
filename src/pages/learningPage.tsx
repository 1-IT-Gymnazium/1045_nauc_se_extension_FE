import React, { useEffect, useState, useMemo } from "react";
import { Footer } from "../components/footer";
import { UserWordsApi } from "../api/userWordsApi";
import { getValData } from "../services/getDataChrome";
import { TranslateApi } from "../api/translateApi";
import { WordBankRemoveApi } from "../api/wordBankRemove";

interface LearnPageProps
{
  homepageDivRef: React.RefObject<HTMLDivElement | null>;
}

export const LearnPage: React.FC<LearnPageProps> = ({ homepageDivRef }) => {

    const [words, setWords] =  useState<string[]>([]);
    const [wordsLength, setWordsLength] = useState<number>(0);
    const [translatedWord, setTranslatedWord] = useState<string>("");

  useEffect(() => {
    if (homepageDivRef.current) {
      homepageDivRef.current.classList.add("page-big");
      homepageDivRef.current.classList.remove("page-small");
    }
  }, [homepageDivRef]);


    const callData = async () =>
    {
        try
        {
            const userId = await getValData("userId");

            const data = await UserWordsApi(userId);
            setWords(data)
            setWordsLength(data.length - 1);
        }
        catch(err)
        {
            throw new Error();
        }
    }

    useEffect(() => {
        callData();
      }, []);

    const randomWordNumber = (num: number) => Math.floor(Math.random() * num);

    const randomWord = useMemo(() => {
        return words[randomWordNumber(wordsLength)];
      }, [words, wordsLength]);


    useEffect(() => {
    const fetchTranslation = async () => {
        const translation = (await TranslateApi(randomWord)).toLowerCase().split('.').join("");;
        setTranslatedWord(translation);
    };

    fetchTranslation();
    }, [randomWord]);

    const newWordGenerate = () =>
    {
        callData();
    }

    const removeWord = async () => {
        if (!randomWord) {
            console.warn("No word to remove.");
            return;
        }

        try {
            const userId = await getValData("userId");
            await WordBankRemoveApi(userId, randomWord);
            newWordGenerate();
        } catch (err) {
            console.error("Error removing word:", err);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center flex-col p-6">
                <div className="relative h-64 w-64 mt-4 group [perspective:1000px]">
                    <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                        <div className="absolute w-full h-full shadow-2xl border-4 border-gray-200 rounded-2xl flex items-center justify-center bg-blue-500 [backface-visibility:hidden]">
                            {randomWord ?
                                <p className="text-center text-lg font-semibold">
                                    { randomWord }
                                </p>
                            :
                            <p className="text-center text-lg text-red-600 font-bold no-style">
                                No words added!
                            </p>
                            }
                        </div>
                        <div className="absolute w-full h-full shadow-2xl border-4 border-gray-200 rounded-2xl flex items-center justify-center bg-blue-500 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                            { randomWord ?
                                <p className="text-center text-lg font-semibold text-white">{translatedWord}</p>
                            :
                            <p className="text-center text-lg text-red-600 font-bold no-style">
                                No words added!
                            </p>
                            }
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-4 mt-8 w-full max-w-md">
                    <button className="flex-1 text-sm py-3 px-8 rounded-lg font-medium bg-gradient-to-r from-blue-500 to-blue-700 shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                            onClick={() => newWordGenerate()}
                        >
                        Next Word
                    </button>
                    <button className="flex-1 text-sm py-3 px-8 rounded-lg font-medium bg-gradient-to-r from-red-500 to-red-700 shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                            onClick={() => removeWord()}
                        >
                        Remove Word
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};
