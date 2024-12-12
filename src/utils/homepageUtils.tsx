import { CheckLoginUtils } from "./checkLoginUtils";
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


const removeItemByName = (arr: string[], name: string): string[] => {
    return arr.filter(item => item !== name);
  };
