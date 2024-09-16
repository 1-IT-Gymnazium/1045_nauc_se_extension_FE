export const StorageSetItem = (key : string, val : any) =>
{
    localStorage.setItem(key, val);
}

export const StorageGetItem = (key : string) : string | null =>
{
    return localStorage.getItem(key);
}

export const StorageRemoveItem = (key : string) =>
{
    localStorage.removeItem(key);
}