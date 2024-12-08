if (typeof chrome !== 'undefined' && chrome.contextMenus)
{
    chrome.contextMenus.create(
    {
        id: "naučse",
        title: "naučse",
        contexts: ["all"]
    });
}


chrome.contextMenus.onClicked.addListener((info) =>
{
    if (info.selectionText !== null)
    {
        updateStorage(info);
        chrome.action.openPopup();
    }
});


const updateStorage = async (text, info) =>
{
    try
    {
        await setData(text, info.selectionText);
    }
    catch (err)
    {
        console.error(err);
    }
};


const setData = async (key, value) =>
{
    return new Promise((resolve, reject) =>
    {
            chrome.storage.local.set({ [key]: value }, () =>
        {
            if (chrome.runtime.lastError)
            {
                reject(chrome.runtime.lastError);
            }
            else
            {
                resolve();
            }
            });
    });
};

//         "chrome-extension://jfkpfocnjofoibmcihgfhibpeionpidf/*"
