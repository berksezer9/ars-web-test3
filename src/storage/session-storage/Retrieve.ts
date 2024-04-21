import {StorageItems} from "./TypesAndInterfaces";
import {getItemFromSessionStorage} from "./storage-service";
import {SessionStorageManager} from "./SessionStorageManager";
import {StorageID} from "./StorageID";

export class Retrieve extends SessionStorageManager
{
    protected _keys: string[];

    /**
     * items retrieved through storage
     * @protected
     */
    //@ts-ignore
    protected _items: StorageItems;

    /**
     * automatically retrieves values for the keys from session storage
     * @param keys
     * @param storageID
     */
    constructor(keys: string[], storageID: StorageID)
    {
        super(storageID);

        this._keys = keys;
        this.setUpItems();
    }

    public get keys(): string[]
    {
        return this._keys;
    }

    public set keys(keys: string[])
    {
        this._keys = keys;
    }

    public get items(): StorageItems
    {
        return this._items;
    }

    private set items(items: StorageItems)
    {
        this._items = items;
    }

    /**
     * retrieves values from session storage and returns the JSON-decoded versions.
     * @return StorageItems
     */
    public retrieveItems(): StorageItems
    {
        const items: StorageItems = {};

        this.keys.forEach( (key: string) =>
        {
            const value: string | null = getItemFromSessionStorage(this.getKeyPrefix(key), this.keySuffix);

            //assigns the JSON-decoded value to the key if the key is found in session storage.
            if(value !== null)
            {
                items[key] = JSON.parse(value);
            }
        });

        return items;
    }

    /**
     * sets the items property using Retrieve.retrieveItems.
     */
    public setUpItems(): void
    {
        this.items = this.retrieveItems();
    }

    /**
     * if the item is not undefined, returns the item. Otherwise, returns defaultValue.
     * @param key
     * @param defaultValue
     */
    public getItemOrDefault(key: string, defaultValue: any): any
    {
        const value: any = this.items[key];

        return value !== undefined ? value : defaultValue;
    }
}