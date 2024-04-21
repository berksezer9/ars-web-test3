import {Retrieve} from "./Retrieve";

const checkBrowserSupportForStorage = (): boolean =>
{
    return typeof(Storage) !== "undefined";
}

const checkBrowserSupportForStorageThrowAnExceptionOtherwise = (): void =>
{
    if(! checkBrowserSupportForStorage())
    {
        throw new Error('The browser does not support storage.');
    }
}

export const generateKeyFromPrefixAndSuffix = (keyPrefix: string, keySuffix: string): string =>
{
    return keyPrefix + keySuffix;
}

export const generateKeySuffix = (): string =>
{
    //gets the current unix timestamp
    const timestamp = Math.floor(Date.now() / 1000);

    //gets a pseudo-random number in string format
    const random = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

    return `-${timestamp}-${random}`;
}

export const setItemIntoSessionStorage = (keyPrefix: string, keySuffix: string, value: string): void =>
{
    checkBrowserSupportForStorageThrowAnExceptionOtherwise();

    sessionStorage.setItem(generateKeyFromPrefixAndSuffix(keyPrefix, keySuffix), value);
}

export const getItemFromSessionStorage = (keyPrefix: string, keySuffix: string): string | null =>
{
    checkBrowserSupportForStorageThrowAnExceptionOtherwise();

    return sessionStorage.getItem(generateKeyFromPrefixAndSuffix(keyPrefix, keySuffix));
}

/**
 * @param keyPrefix
 * @param keySuffix
 */
export const removeItemFromSessionStorage = (keyPrefix: string, keySuffix: string): void =>
{
    checkBrowserSupportForStorageThrowAnExceptionOtherwise();

    return sessionStorage.removeItem(generateKeyFromPrefixAndSuffix(keyPrefix, keySuffix));
}

/**
 * returns the item from the items property of the Retrieve object if the key is defined and the default value
 * if it is not.
 * @param retrieve
 * @param key
 * @param defaultValue
 */
export const getItemOrDefault = (retrieve: Retrieve, key: string, defaultValue: any): any =>
{
    return retrieve.getItemOrDefault(key, defaultValue);
}

export const setItemIntoLocalStorage = (keyPrefix: string, keySuffix: string, value: string): void =>
{
    checkBrowserSupportForStorageThrowAnExceptionOtherwise();

    localStorage.setItem(generateKeyFromPrefixAndSuffix(keyPrefix, keySuffix), value);
}

export const getItemFromLocalStorage = (keyPrefix: string, keySuffix: string): string | null =>
{
    checkBrowserSupportForStorageThrowAnExceptionOtherwise();

    return localStorage.getItem(generateKeyFromPrefixAndSuffix(keyPrefix, keySuffix));
}

/**
 * @param keyPrefix
 * @param keySuffix
 */
export const removeItemFromLocalStorage = (keyPrefix: string, keySuffix: string): void =>
{
    checkBrowserSupportForStorageThrowAnExceptionOtherwise();

    return localStorage.removeItem(generateKeyFromPrefixAndSuffix(keyPrefix, keySuffix));
}