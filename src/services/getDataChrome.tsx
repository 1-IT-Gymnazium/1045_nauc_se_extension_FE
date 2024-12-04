export const getValData = async (key: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
            chrome.storage.local.get([key], (result) => {
                if (chrome.runtime.lastError) {
                    reject(new Error(chrome.runtime.lastError.message));
                } else {
                    resolve(result[key] || null);
                }
            });
        } else {
            const value = localStorage.getItem(key);
            resolve(value || null);
        }
    });
};


export const setValData = (key: string, value: any): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
            chrome.storage.local.set({ [key]: value }, () => {
                if (chrome.runtime.lastError) {
                    reject(new Error(chrome.runtime.lastError.message));
                } else {
                    resolve();
                }
            });
        } else {
            localStorage.setItem(key, value);
            resolve();
        }
    });
};

export const removeValData = (key: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
            chrome.storage.local.remove([key], () => {
                if (chrome.runtime.lastError) {
                    reject(new Error(chrome.runtime.lastError.message));
                } else {
                    resolve();
                }
            });
        } else {
            try {
                localStorage.removeItem(key);
                resolve();
            } catch (error) {
                if (error instanceof Error) {
                    reject(new Error(`Error removing key '${key}': ${error.message}`));
                } else {
                    reject(new Error(`Unknown error occurred while removing key '${key}'`));
                }
            }
        }
    });
};

