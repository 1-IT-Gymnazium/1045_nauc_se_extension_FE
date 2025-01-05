import { CheckLoginUtils } from "./checkLoginUtils";
import { WordBankAddApi } from "../api/wordBankAddApi";
import { getValData, setValData } from "../services/getDataChrome";



export const HomepageUtils = () =>
{
    CheckLoginUtils();
};

/**
 * Removes added word from storage.
* @async
* @function
* @param {string} id - User's ID.
*
*/

export const removeAddedWords = async (word: string) =>
{

    const storedWords : Array<string> = await getValData("words-data");
    if (storedWords)
    {;
        const arr = removeItemByName(storedWords, word);
        await setValData("words-data", arr);

        window.location.reload();
    }
};

/**
 * Removes added word from storage
* @async
* @function
* @param {string} id - User's ID.
* @param {string} word - The word that wants to be added.
* @throws {Error} Catch error from API call.
*
*/


export const addWordsToBank = async (user_id : string, word : string) =>
{
    try
    {
        WordBankAddApi(user_id, word);
    }
    catch (err: any)
    {
        throw new Error(`${(err as Error)?.message || err}`);
    }

}

/**
 * Remove from array unwanted word
* @async
* @function
* @param {string[]} arr - Given array to work with.
* @param {string} name - The word that wants to be removed.
* @returns {string[]} array with the removed word.
*
*/

const removeItemByName = (arr : string[], name : string): string[] =>
{
    return arr.filter(item => item !== name);
};



