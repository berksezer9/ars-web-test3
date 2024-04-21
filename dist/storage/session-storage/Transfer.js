import { getItemFromSessionStorage, setItemIntoSessionStorage } from "./storage-service";
export class Transfer {
    /**
     * automatically transfers items
     * @param senderID
     * @param recipientID
     * @param keys
     */
    constructor(keys, senderID, recipientID) {
        this._senderID = senderID;
        this._recipientID = recipientID;
        this._keys = Transfer.convertIntoTransferKeys(keys);
        this.transferItems(this.keys);
    }
    get senderID() {
        return this._senderID;
    }
    set senderID(senderID) {
        this._senderID = senderID;
    }
    get recipientID() {
        return this._recipientID;
    }
    set recipientID(recipientID) {
        this._recipientID = recipientID;
    }
    get keys() {
        return this._keys;
    }
    set keys(keys) {
        this._keys = keys;
    }
    /**
     * generates a transfer key from a key
     * @param key
     */
    static generateTransferKeyFromKey(key) {
        return {
            sender: key,
            recipient: key
        };
    }
    /**
     * converts a string into TransferKey.
     * @param key
     */
    static convertIntoTransferKey(key) {
        return typeof key === 'string' ? Transfer.generateTransferKeyFromKey(key) : key;
    }
    /**
     * converts strings into TransferKeys.
     * @param array
     */
    static convertIntoTransferKeys(array) {
        return array.map((item) => Transfer.convertIntoTransferKey(item));
    }
    /**
     * checks whether the value is valid (i.e.: can be saved to storage)
     * @param value
     */
    static canBeSavedToStorage(value) {
        return (typeof value) === 'string';
    }
    /**
     * Gets the complete key prefix by concatenating storageID's generalPrefix and the key.
     * @param storageID
     * @param key
     */
    static getKeyPrefix(storageID, key) {
        return storageID.generalPrefix + key;
    }
    /**
     * Retrieves the key suffix of the storage id.
     * @param storageID
     */
    static getKeySuffix(storageID) {
        return storageID.keySuffix;
    }
    /**
     * @param key
     * @protected
     */
    retrieveItem(key) {
        const keyPrefix = Transfer.getKeyPrefix(this.senderID, key);
        const keySuffix = Transfer.getKeySuffix(this.senderID);
        return getItemFromSessionStorage(keyPrefix, keySuffix);
    }
    /**
     * @param key
     * @param value
     * @protected
     */
    saveItem(key, value) {
        //returns if the value cannot be saved to storage.
        if (!Transfer.canBeSavedToStorage(value)) {
            return;
        }
        const keyPrefix = Transfer.getKeyPrefix(this.recipientID, key);
        const keySuffix = Transfer.getKeySuffix(this.recipientID);
        setItemIntoSessionStorage(keyPrefix, keySuffix, value);
    }
    /**
     * transfers an item from the sender to the recipient
     * @public
     * @param key
     */
    transferItem(key) {
        key = Transfer.convertIntoTransferKey(key);
        this.saveItem(key.recipient, this.retrieveItem(key.sender));
    }
    /**
     * transfers items from the sender to the recipient by calling Transfer.transferItem for each key.
     * @public
     * @param keys
     */
    transferItems(keys) {
        keys = Transfer.convertIntoTransferKeys(keys);
        keys.forEach((key) => this.transferItem(key));
    }
}
//# sourceMappingURL=Transfer.js.map