import { useState, useEffect } from 'react';
import {localStorageRead, localStorageSave} from "../utils/LocalStorageUtils";

function getStorageOrDefault(key: string, defaultValue: any) {
    const stored = localStorageRead(key);
    if (!stored) {
        return defaultValue;
    }
    return stored;
}

export function useSessionStorage(key: string, defaultValue: any) {
    const [value, setValue] = useState(
        getStorageOrDefault(key, defaultValue)
    );
    useEffect(() => {
        localStorageSave(key, value);
    }, [key, value]);

    return [value, setValue];
}
