export const useLocalStorage = () => {
    // return JSON.parse(localStorage.getItem(key) || "");

    const get = (key: string) => {
        const localStorageValue = localStorage.getItem(key);
        return localStorageValue ? JSON.parse(localStorageValue) : undefined;
    };

    const set = (key: string, value: unknown) =>
        localStorage.setItem(key, JSON.stringify(value));

    return { get, set };
};
