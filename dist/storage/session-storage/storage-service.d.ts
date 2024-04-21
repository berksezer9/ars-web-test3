import { Retrieve } from "./Retrieve";
export declare const generateKeyFromPrefixAndSuffix: (keyPrefix: string, keySuffix: string) => string;
export declare const generateKeySuffix: () => string;
export declare const setItemIntoSessionStorage: (keyPrefix: string, keySuffix: string, value: string) => void;
export declare const getItemFromSessionStorage: (keyPrefix: string, keySuffix: string) => string | null;
/**
 * @param keyPrefix
 * @param keySuffix
 */
export declare const removeItemFromSessionStorage: (keyPrefix: string, keySuffix: string) => void;
/**
 * returns the item from the items property of the Retrieve object if the key is defined and the default value
 * if it is not.
 * @param retrieve
 * @param key
 * @param defaultValue
 */
export declare const getItemOrDefault: (retrieve: Retrieve, key: string, defaultValue: any) => any;
export declare const setItemIntoLocalStorage: (keyPrefix: string, keySuffix: string, value: string) => void;
export declare const getItemFromLocalStorage: (keyPrefix: string, keySuffix: string) => string | null;
/**
 * @param keyPrefix
 * @param keySuffix
 */
export declare const removeItemFromLocalStorage: (keyPrefix: string, keySuffix: string) => void;
//# sourceMappingURL=storage-service.d.ts.map