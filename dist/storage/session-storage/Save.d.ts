import { StorageItems } from "./TypesAndInterfaces";
import { SessionStorageManager } from "./SessionStorageManager";
import { StorageID } from "./StorageID";
export declare class Save extends SessionStorageManager {
    /**
     * the items to be saved to storage
     * @protected
     */
    protected _items: StorageItems;
    /**
     * automatically saves items to storage
     * @param items
     * @param storageID
     */
    constructor(items: StorageItems, storageID: StorageID);
    get items(): StorageItems;
    protected set items(items: StorageItems);
    /**
     * saves the item to the items property
     * @param key (the key of the item)
     * @param value (the value of the item)
     */
    protected saveItemToItems(key: string, value: any): void;
    /**
     * JSON-encodes the value and saves it to storage.
     * @param key (the key of the item)
     * @param value (the value of the item)
     */
    protected saveItemToStorage(key: string, value: any): void;
    /**
     * saves the item to the items property and storage.
     * @param key (the key of the item)
     * @param value (the value of the item)
     */
    saveItem(key: string, value: any): void;
    /**
     * saves the items to the items property and storage using Save.saveItem.
     */
    saveItems(items: StorageItems): void;
    /**
     * deletes the key from the items property.
     * @param key
     */
    protected deleteItemFromItems(key: string): void;
    /**
     * deletes the key from storage.
     * @param key
     */
    protected deleteItemFromStorage(key: string): void;
    /**
     * deletes the item from the items property and storage.
     * @param key
     */
    deleteItem(key: string): void;
}
//# sourceMappingURL=Save.d.ts.map