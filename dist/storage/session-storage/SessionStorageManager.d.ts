import type { KeySuffix, GeneralPrefixes } from "./TypesAndInterfaces";
import { StorageID } from "./StorageID";
export declare class SessionStorageManager {
    /**
     * the id to manage storage.
     * @protected
     */
    protected _storageID: StorageID;
    constructor(storageID: StorageID);
    get storageID(): StorageID;
    set storageID(storageID: StorageID);
    get generalPrefix(): GeneralPrefixes;
    set generalPrefix(generalPrefix: GeneralPrefixes);
    get keySuffix(): KeySuffix;
    set keySuffix(keySuffix: KeySuffix);
    /**
     * Gets the complete key prefix by concatenating the this.generalPrefix and the key.
     * @param key
     */
    getKeyPrefix(key: string): string;
    /**
     * Checks whether the item is valid (whether it can be integrated into the items property)
     * @param item (the value of the item)
     * @return boolean
     */
    static isItemValid(item: any): boolean;
}
//# sourceMappingURL=SessionStorageManager.d.ts.map