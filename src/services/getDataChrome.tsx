export const getValData = async (key : string) : Promise<any> =>
{
    return new Promise((resolve, reject) =>
    {
        chrome.storage.local.get([key], (result) => 
        {
            if (chrome.runtime.lastError)
            {
                reject(new Error(chrome.runtime.lastError.message));
            } 
            else
            {
                resolve(result[key]);
            } 
        });
    });
}

export const setValData = async (key : string) : Promise<any> =>
{
    return new Promise((resolve, reject) =>
    {
    });
}