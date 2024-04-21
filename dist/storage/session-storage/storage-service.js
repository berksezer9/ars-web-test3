const checkBrowserSupportForStorage = () => {
    return typeof (Storage) !== "undefined";
};
const checkBrowserSupportForStorageThrowAnExceptionOtherwise = () => {
    if (!checkBrowserSupportForStorage()) {
        throw new Error('The browser does not support storage.');
    }
};
export const generateKeyFromPrefixAndSuffix = (keyPrefix, keySuffix) => {
    return keyPrefix + keySuffix;
};
export const generateKeySuffix = () => {
    //gets the current unix timestamp
    const timestamp = Math.floor(Date.now() / 1000);
    //gets a pseudo-random number in string format
    const random = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return `-${timestamp}-${random}`;
};
export const setItemIntoSessionStorage = (keyPrefix, keySuffix, value) => {
    checkBrowserSupportForStorageThrowAnExceptionOtherwise();
    sessionStorage.setItem(generateKeyFromPrefixAndSuffix(keyPrefix, keySuffix), value);
};
export const getItemFromSessionStorage = (keyPrefix, keySuffix) => {
    checkBrowserSupportForStorageThrowAnExceptionOtherwise();
    return sessionStorage.getItem(generateKeyFromPrefixAndSuffix(keyPrefix, keySuffix));
};
/**
 * @param keyPrefix
 * @param keySuffix
 */
export const removeItemFromSessionStorage = (keyPrefix, keySuffix) => {
    checkBrowserSupportForStorageThrowAnExceptionOtherwise();
    return sessionStorage.removeItem(generateKeyFromPrefixAndSuffix(keyPrefix, keySuffix));
};
/**
 * returns the item from the items property of the Retrieve object if the key is defined and the default value
 * if it is not.
 * @param retrieve
 * @param key
 * @param defaultValue
 */
export const getItemOrDefault = (retrieve, key, defaultValue) => {
    return retrieve.getItemOrDefault(key, defaultValue);
};
export const setItemIntoLocalStorage = (keyPrefix, keySuffix, value) => {
    checkBrowserSupportForStorageThrowAnExceptionOtherwise();
    localStorage.setItem(generateKeyFromPrefixAndSuffix(keyPrefix, keySuffix), value);
};
export const getItemFromLocalStorage = (keyPrefix, keySuffix) => {
    checkBrowserSupportForStorageThrowAnExceptionOtherwise();
    return localStorage.getItem(generateKeyFromPrefixAndSuffix(keyPrefix, keySuffix));
};
/**
 * @param keyPrefix
 * @param keySuffix
 */
export const removeItemFromLocalStorage = (keyPrefix, keySuffix) => {
    checkBrowserSupportForStorageThrowAnExceptionOtherwise();
    return localStorage.removeItem(generateKeyFromPrefixAndSuffix(keyPrefix, keySuffix));
};
//# sourceMappingURL=storage-service.js.map