import { KeySuffix, TransferKey, TransferKeys } from "./TypesAndInterfaces";
import { StorageID } from "./StorageID";
export declare class Transfer {
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
    constructor(keys: (string | TransferKey)[], senderID: StorageID, recipientID: StorageID);
    get senderID(): StorageID;
    set senderID(senderID: StorageID);
    get recipientID(): StorageID;
    set recipientID(recipientID: StorageID);
    get keys(): TransferKeys;
    set keys(keys: TransferKeys);
    /**
     * generates a transfer key from a key
     * @param key
     */
    static generateTransferKeyFromKey(key: string): TransferKey;
    /**
     * converts a string into TransferKey.
     * @param key
     */
    static convertIntoTransferKey(key: string | TransferKey): TransferKey;
    /**
     * converts strings into TransferKeys.
     * @param array
     */
    static convertIntoTransferKeys(array: (string | TransferKey)[]): TransferKeys;
    /**
     * checks whether the value is valid (i.e.: can be saved to storage)
     * @param value
     */
    static canBeSavedToStorage(value: any): boolean;
    /**
     * Gets the complete key prefix by concatenating storageID's generalPrefix and the key.
     * @param storageID
     * @param key
     */
    static getKeyPrefix(storageID: StorageID, key: string): string;
    /**
     * Retrieves the key suffix of the storage id.
     * @param storageID
     */
    static getKeySuffix(storageID: StorageID): KeySuffix;
    /**
     * @param key
     * @protected
     */
    protected retrieveItem(key: string): string | null;
    /**
     * @param key
     * @param value
     * @protected
     */
    protected saveItem(key: string, value: any): void;
    /**
     * transfers an item from the sender to the recipient
     * @public
     * @param key
     */
    transferItem(key: string | TransferKey): void;
    /**
     * transfers items from the sender to the recipient by calling Transfer.transferItem for each key.
     * @public
     * @param keys
     */
    transferItems(keys: (string | TransferKey)[]): void;
}
//# sourceMappingURL=Transfer.d.ts.map