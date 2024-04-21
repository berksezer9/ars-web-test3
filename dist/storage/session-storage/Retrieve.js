import { getItemFromSessionStorage } from "./storage-service";
import { SessionStorageManager } from "./SessionStorageManager";
export class Retrieve extends SessionStorageManager {
    /**
     * automatically retrieves values for the keys from session storage
     * @param keys
     * @param storageID
     */
    constructor(keys, storageID) {
        super(storageID);
        this._keys = keys;
        this.setUpItems();
    }
    get keys() {
        return this._keys;
    }
    set keys(keys) {
        this._keys = keys;
    }
    get items() {
        return this._items;
    }
    set items(items) {
        this._items = items;
    }
    /**
     * retrieves values from session storage and returns the JSON-decoded versions.
     * @return StorageItems
     */
    retrieveItems() {
        const items = {};
        this.keys.forEach((key) => {
            const value = getItemFromSessionStorage(this.getKeyPrefix(key), this.keySuffix);
            //assigns the JSON-decoded value to the key if the key is found in session storage.
            if (value !== null) {
                items[key] = JSON.parse(value);
            }
        });
        return items;
    }
    /**
     * sets the items property using Retrieve.retrieveItems.
     */
    setUpItems() {
        this.items = this.retrieveItems();
    }
    /**
     * if the item is not undefined, returns the item. Otherwise, returns defaultValue.
     * @param key
     * @param defaultValue
     */
    getItemOrDefault(key, defaultValue) {
        const value = this.items[key];
        return value !== undefined ? value : defaultValue;
    }
}
//# sourceMappingURL=Retrieve.js.map