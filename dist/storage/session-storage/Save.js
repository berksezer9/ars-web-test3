import { removeItemFromSessionStorage, setItemIntoSessionStorage } from "./storage-service";
import { SessionStorageManager } from "./SessionStorageManager";
export class Save extends SessionStorageManager {
    /**
     * automatically saves items to storage
     * @param items
     * @param storageID
     */
    constructor(items, storageID) {
        super(storageID);
        this._items = items;
        this.saveItems(this.items);
    }
    get items() {
        return this._items;
    }
    set items(items) {
        this._items = items;
    }
    /**
     * saves the item to the items property
     * @param key (the key of the item)
     * @param value (the value of the item)
     */
    saveItemToItems(key, value) {
        //returns if value is not valid
        if (!SessionStorageManager.isItemValid(value)) {
            return;
        }
        this.items[key] = value;
    }
    /**
     * JSON-encodes the value and saves it to storage.
     * @param key (the key of the item)
     * @param value (the value of the item)
     */
    saveItemToStorage(key, value) {
        //returns if value is not valid.
        if (!SessionStorageManager.isItemValid(value)) {
            return;
        }
        setItemIntoSessionStorage(this.getKeyPrefix(key), this.keySuffix, JSON.stringify(value));
    }
    /**
     * saves the item to the items property and storage.
     * @param key (the key of the item)
     * @param value (the value of the item)
     */
    saveItem(key, value) {
        //returns if value is not valid
        if (!SessionStorageManager.isItemValid(value)) {
            return;
        }
        this.saveItemToItems(key, value);
        this.saveItemToStorage(key, value);
    }
    /**
     * saves the items to the items property and storage using Save.saveItem.
     */
    saveItems(items) {
        Object.keys(items).forEach((key) => this.saveItem(key, this.items[key]));
    }
    /**
     * deletes the key from the items property.
     * @param key
     */
    deleteItemFromItems(key) {
        delete this.items[key];
    }
    /**
     * deletes the key from storage.
     * @param key
     */
    deleteItemFromStorage(key) {
        removeItemFromSessionStorage(this.getKeyPrefix(key), this.keySuffix);
    }
    /**
     * deletes the item from the items property and storage.
     * @param key
     */
    deleteItem(key) {
        this.deleteItemFromItems(key);
        this.deleteItemFromStorage(key);
    }
}
//# sourceMappingURL=Save.js.map