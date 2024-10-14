export const StorageSetItem = (key : string, val : any) =>
{
    localStorage.setItem(key, val);
}

export const StorageGetItem = (key : string) : string | null =>
{
    return localStorage.getItem(key);
}

