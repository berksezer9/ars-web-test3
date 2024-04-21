import {StorageItems} from "./TypesAndInterfaces";
import {removeItemFromSessionStorage, setItemIntoSessionStorage} from "./storage-service";
import {SessionStorageManager} from "./SessionStorageManager";
import {StorageID} from "./StorageID";

export class Save extends SessionStorageManager
{
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
    constructor(items: StorageItems, storageID: StorageID)
    {
        super(storageID);

        this._items = items;
        this.saveItems(this.items);
    }

    public get items(): StorageItems
    {
        return this._items;
    }

    protected set items(items: StorageItems)
    {
        this._items = items;
    }

    /**
     * saves the item to the items property
     * @param key (the key of the item)
     * @param value (the value of the item)
     */
    protected saveItemToItems(key: string, value: any): void
    {
        //returns if value is not valid
        if( !SessionStorageManager.isItemValid(value) )
        {
            return;
        }

        this.items[key] = value;
    }

    /**
     * JSON-encodes the value and saves it to storage.
     * @param key (the key of the item)
     * @param value (the value of the item)
     */
    protected saveItemToStorage(key: string, value: any): void
    {
        //returns if value is not valid.
        if( !SessionStorageManager.isItemValid(value) )
        {
            return;
        }

        setItemIntoSessionStorage( this.getKeyPrefix(key), this.keySuffix, JSON.stringify(value) );
    }

    /**
     * saves the item to the items property and storage.
     * @param key (the key of the item)
     * @param value (the value of the item)
     */
    public saveItem(key: string, value: any): void
    {
        //returns if value is not valid
        if( !SessionStorageManager.isItemValid(value) )
        {
            return;
        }

        this.saveItemToItems(key, value);

        this.saveItemToStorage(key, value);
    }

    /**
     * saves the items to the items property and storage using Save.saveItem.
     */
    public saveItems(items: StorageItems): void
    {
        Object.keys(items).forEach( (key: string) => this.saveItem(key, this.items[key]) );
    }

    /**
     * deletes the key from the items property.
     * @param key
     */
    protected deleteItemFromItems(key: string): void
    {
        delete this.items[key];
    }

    /**
     * deletes the key from storage.
     * @param key
     */
    protected deleteItemFromStorage(key: string): void
    {
        removeItemFromSessionStorage(this.getKeyPrefix(key), this.keySuffix);
    }

    /**
     * deletes the item from the items property and storage.
     * @param key
     */
    public deleteItem(key: string): void
    {
        this.deleteItemFromItems(key);

        this.deleteItemFromStorage(key);
    }
}