import { generateKeyFromPrefixAndSuffix, generateKeySuffix } from "./storage-service";
export class StorageID {
    /**
     * automatically generates a key suffix if the keySuffix parameter is left undefined.
     * @param generalPrefix
     * @param keySuffix
     */
    constructor(generalPrefix, keySuffix) {
        this._generalPrefix = generalPrefix;
        this._keySuffix = keySuffix !== null && keySuffix !== void 0 ? keySuffix : generateKeySuffix();
    }
    get generalPrefix() {
        return this._generalPrefix;
    }
    set generalPrefix(generalPrefix) {
        this._generalPrefix = generalPrefix;
    }
    get keySuffix() {
        return this._keySuffix;
    }
    set keySuffix(keySuffix) {
        this._keySuffix = keySuffix;
    }
    /**
     * Gets the complete key prefix by concatenating this.generalPrefix and the key.
     * @param key
     */
    getKeyPrefix(key) {
        return this.generalPrefix + key;
    }
    /**
     * Gets the complete key by concatenating this.getKeyPrefix and this.keySuffix.
     * @param key
     */
    getKey(key) {
        return generateKeyFromPrefixAndSuffix(this.getKeyPrefix(key), this.keySuffix);
    }
}
//# sourceMappingURL=StorageID.js.map