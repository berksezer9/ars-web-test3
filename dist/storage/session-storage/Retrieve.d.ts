import { StorageItems } from "./TypesAndInterfaces";
import { SessionStorageManager } from "./SessionStorageManager";
import { StorageID } from "./StorageID";
export declare class Retrieve extends SessionStorageManager {
    protected _keys: string[];
    /**
     * items retrieved through storage
     * @protected
     */
    protected _items: StorageItems;
    /**
     * automatically retrieves values for the keys from session storage
     * @param keys
     * @param storageID
     */
    constructor(keys: string[], storageID: StorageID);
    get keys(): string[];
    set keys(keys: string[]);
    get items(): StorageItems;
    private set items(value);
    /**
     * retrieves values from session storage and returns the JSON-decoded versions.
     * @return StorageItems
     */
    retrieveItems(): StorageItems;
    /**
     * sets the items property using Retrieve.retrieveItems.
     */
    setUpItems(): void;
    /**
     * if the item is not undefined, returns the item. Otherwise, returns defaultValue.
     * @param key
     * @param defaultValue
     */
    getItemOrDefault(key: string, defaultValue: any): any;
}
//# sourceMappingURL=Retrieve.d.ts.map