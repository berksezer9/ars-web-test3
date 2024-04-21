import type {KeySuffix, GeneralPrefixes} from "./TypesAndInterfaces";
import {generateKeyFromPrefixAndSuffix, generateKeySuffix} from "./storage-service";

export class StorageID
{
    /**
     * the general prefix for all the keys to be retrieved
     * @protected
     */
    protected _generalPrefix: GeneralPrefixes;

    /**
     * the key suffix for all the keys to be retrieved
     * @protected
     */
    protected _keySuffix: KeySuffix;

    /**
     * automatically generates a key suffix if the keySuffix parameter is left undefined.
     * @param generalPrefix
     * @param keySuffix
     */
    constructor(generalPrefix: GeneralPrefixes, keySuffix?: KeySuffix)
    {
        this._generalPrefix = generalPrefix;
        this._keySuffix = keySuffix ?? generateKeySuffix();
    }

    public get generalPrefix(): GeneralPrefixes
    {
        return this._generalPrefix;
    }

    public set generalPrefix(generalPrefix: GeneralPrefixes)
    {
        this._generalPrefix = generalPrefix;
    }

    public get keySuffix(): KeySuffix
    {
        return this._keySuffix;
    }

    public set keySuffix(keySuffix: KeySuffix)
    {
        this._keySuffix = keySuffix;
    }

    /**
     * Gets the complete key prefix by concatenating this.generalPrefix and the key.
     * @param key
     */
    public getKeyPrefix(key: string): string
    {
        return this.generalPrefix + key;
    }

    /**
     * Gets the complete key by concatenating this.getKeyPrefix and this.keySuffix.
     * @param key
     */
    public getKey(key: string): string
    {
        return generateKeyFromPrefixAndSuffix(this.getKeyPrefix(key), this.keySuffix);
    }
}