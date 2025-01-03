import { CheckLoginUtils } from "./checkLoginUtils";
import { WordBankAddApi } from "../api/wordBankAddApi";
import { getValData, setValData } from "../services/getDataChrome";

export const HomepageUtils: React.FC = () =>
{
    CheckLoginUtils();
    return null;
};

export const removeAddedWords = async (word: string, index: number) =>
{

    const storedWords : Array<string> = await getValData("words-data");
    if (storedWords)
    {;
        const arr = removeItemByName(storedWords, word);
        await setValData("words-data", arr);

        window.location.reload();
    }
};

export const addWordsToBank = async (user_id : string, word : string) =>
{
    try
    {
        WordBankAddApi(user_id, word);
    }
    catch (err)
    {

    }

}

const removeItemByName = (arr: string[], name: string): string[] =>
{
    return arr.filter(item => item !== name);
};



