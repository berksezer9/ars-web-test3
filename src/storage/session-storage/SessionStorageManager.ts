import type {KeySuffix, GeneralPrefixes} from "./TypesAndInterfaces";
import {StorageID} from "./StorageID";

export class SessionStorageManager
{
    /**
     * the id to manage storage.
     * @protected
     */
    protected _storageID: StorageID;

    constructor(storageID: StorageID)
    {
        this._storageID = storageID;
    }

    public get storageID(): StorageID
    {
        return this._storageID;
    }

    public set storageID(storageID: StorageID)
    {
        this._storageID = storageID;
    }

    public get generalPrefix(): GeneralPrefixes
    {
        return this.storageID.generalPrefix;
    }

    public set generalPrefix(generalPrefix: GeneralPrefixes)
    {
        this.storageID.generalPrefix = generalPrefix;
    }

    public get keySuffix(): KeySuffix
    {
        return this.storageID.keySuffix;
    }

    public set keySuffix(keySuffix: KeySuffix)
    {
        this.storageID.keySuffix = keySuffix;
    }

    /**
     * Gets the complete key prefix by concatenating the this.generalPrefix and the key.
     * @param key
     */
    public getKeyPrefix(key: string): string
    {
        return this.generalPrefix + key;
    }

    //you may later use something like "valueOf" instead:
    //https://stackoverflow.com/questions/49285864/is-there-a-valueof-similar-to-keyof-in-typescript
    /**
     * Checks whether the item is valid (whether it can be integrated into the items property)
     * @param item (the value of the item)
     * @return boolean
     */
    public static isItemValid(item: any): boolean
    {
        return item !== undefined;
    }
}