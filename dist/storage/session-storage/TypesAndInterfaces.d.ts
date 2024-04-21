export type KeySuffix = string;
export type StorageItem = Exclude<any, undefined>;
export interface StorageItems {
    [key: string]: StorageItem;
}
export interface TransferKey {
    sender: string;
    recipient: string;
}
export type TransferKeys = TransferKey[];
export type GeneralPrefixes = {
    [key: string]: string;
};
//# sourceMappingURL=TypesAndInterfaces.d.ts.map