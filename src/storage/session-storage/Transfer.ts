import {KeySuffix, TransferKey, TransferKeys} from "./TypesAndInterfaces";
import {
    getItemFromSessionStorage,
    setItemIntoSessionStorage
} from "./storage-service";
import {StorageID} from "./StorageID";

export class Transfer
{
    /**
     * the storage id of the sender
     * @protected
     */
    protected _senderID: StorageID;

    /**
     * the storage id of the recipient
     * @protected
     */
    protected _recipientID: StorageID;

    /**
     * The keys to be transferred.
     * @protected
     */
    protected _keys: TransferKeys;

    /**
     * automatically transfers items
     * @param senderID
     * @param recipientID
     * @param keys
     */
    constructor(keys: (string|TransferKey)[], senderID: StorageID, recipientID: StorageID)
    {
        this._senderID = senderID;
        this._recipientID = recipientID;
        this._keys = Transfer.convertIntoTransferKeys(keys);
        this.transferItems(this.keys);
    }

    public get senderID(): StorageID
    {
        return this._senderID;
    }

    public set senderID(senderID: StorageID)
    {
        this._senderID = senderID;
    }

    public get recipientID(): StorageID
    {
        return this._recipientID;
    }

    public set recipientID(recipientID: StorageID)
    {
        this._recipientID = recipientID;
    }

    public get keys(): TransferKeys
    {
        return this._keys;
    }

    public set keys(keys: TransferKeys)
    {
        this._keys = keys;
    }

    /**
     * generates a transfer key from a key
     * @param key
     */
    public static generateTransferKeyFromKey(key: string): TransferKey
    {
        return {
            sender: key,
            recipient: key
        };
    }

    /**
     * converts a string into TransferKey.
     * @param key
     */
    public static convertIntoTransferKey(key: string|TransferKey): TransferKey
    {
        return typeof key === 'string' ? Transfer.generateTransferKeyFromKey(key) : key;
    }

    /**
     * converts strings into TransferKeys.
     * @param array
     */
    public static convertIntoTransferKeys(array: (string|TransferKey)[]): TransferKeys
    {
        return array.map( (item: string|TransferKey) => Transfer.convertIntoTransferKey(item) );
    }

    /**
     * checks whether the value is valid (i.e.: can be saved to storage)
     * @param value
     */
    public static canBeSavedToStorage(value: any): boolean
    {
        return (typeof value) === 'string';
    }

    /**
     * Gets the complete key prefix by concatenating storageID's generalPrefix and the key.
     * @param storageID
     * @param key
     */
    public static getKeyPrefix(storageID: StorageID, key: string): string
    {
        return storageID.generalPrefix + key;
    }

    /**
     * Retrieves the key suffix of the storage id.
     * @param storageID
     */
    public static getKeySuffix(storageID: StorageID): KeySuffix
    {
        return storageID.keySuffix;
    }

    /**
     * @param key
     * @protected
     */
    protected retrieveItem(key: string): string | null
    {
        const keyPrefix: string = Transfer.getKeyPrefix(this.senderID, key);
        const keySuffix: KeySuffix = Transfer.getKeySuffix(this.senderID);

        return getItemFromSessionStorage(keyPrefix, keySuffix);
    }

    /**
     * @param key
     * @param value
     * @protected
     */
    protected saveItem(key: string, value: any): void
    {
        //returns if the value cannot be saved to storage.
        if( !Transfer.canBeSavedToStorage(value) )
        {
            return;
        }

        const keyPrefix: string = Transfer.getKeyPrefix(this.recipientID, key);
        const keySuffix: KeySuffix = Transfer.getKeySuffix(this.recipientID);

        setItemIntoSessionStorage(keyPrefix, keySuffix, value);
    }

    /**
     * transfers an item from the sender to the recipient
     * @public
     * @param key
     */
    public transferItem(key: string|TransferKey): void
    {
        key = Transfer.convertIntoTransferKey(key);

        this.saveItem( key.recipient, this.retrieveItem(key.sender) );
    }

    /**
     * transfers items from the sender to the recipient by calling Transfer.transferItem for each key.
     * @public
     * @param keys
     */
    public transferItems(keys: (string|TransferKey)[]): void
    {
        keys = Transfer.convertIntoTransferKeys(keys);

        keys.forEach( (key) => this.transferItem(key) );
    }
}