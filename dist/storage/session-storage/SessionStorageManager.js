export class SessionStorageManager {
    constructor(storageID) {
        this._storageID = storageID;
    }
    get storageID() {
        return this._storageID;
    }
    set storageID(storageID) {
        this._storageID = storageID;
    }
    get generalPrefix() {
        return this.storageID.generalPrefix;
    }
    set generalPrefix(generalPrefix) {
        this.storageID.generalPrefix = generalPrefix;
    }
    get keySuffix() {
        return this.storageID.keySuffix;
    }
    set keySuffix(keySuffix) {
        this.storageID.keySuffix = keySuffix;
    }
    /**
     * Gets the complete key prefix by concatenating the this.generalPrefix and the key.
     * @param key
     */
    getKeyPrefix(key) {
        return this.generalPrefix + key;
    }
    //you may later use something like "valueOf" instead:
    //https://stackoverflow.com/questions/49285864/is-there-a-valueof-similar-to-keyof-in-typescript
    /**
     * Checks whether the item is valid (whether it can be integrated into the items property)
     * @param item (the value of the item)
     * @return boolean
     */
    static isItemValid(item) {
        return item !== undefined;
    }
}
//# sourceMappingURL=SessionStorageManager.js.map