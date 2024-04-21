import type { KeySuffix, GeneralPrefixes } from "./TypesAndInterfaces";
export declare class StorageID {
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
    constructor(generalPrefix: GeneralPrefixes, keySuffix?: KeySuffix);
    get generalPrefix(): GeneralPrefixes;
    set generalPrefix(generalPrefix: GeneralPrefixes);
    get keySuffix(): KeySuffix;
    set keySuffix(keySuffix: KeySuffix);
    /**
     * Gets the complete key prefix by concatenating this.generalPrefix and the key.
     * @param key
     */
    getKeyPrefix(key: string): string;
    /**
     * Gets the complete key by concatenating this.getKeyPrefix and this.keySuffix.
     * @param key
     */
    getKey(key: string): string;
}
//# sourceMappingURL=StorageID.d.ts.map