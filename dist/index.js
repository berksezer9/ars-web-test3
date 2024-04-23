import { defineStore as g } from "pinia";
import { useNotification as I } from "@kyvg/vue3-notification";
import { defineComponent as l, computed as y, ref as S, onMounted as p, markRaw as x, openBlock as d, createBlock as v, resolveDynamicComponent as D, normalizeProps as P, mergeProps as k, createCommentVNode as K } from "vue";
const m = I(), N = g("notification", {
  state: () => ({
    nextNotificationId: 0,
    oneNotificationOnly: !0,
    notifications: {}
  }),
  actions: {
    /**
     * returns the next notification id and increments the "next notification id" property.
     */
    useNextNotificationId() {
      const i = this.nextNotificationId;
      return this.nextNotificationId += 1, i;
    },
    setTimeout(i, e) {
      return setTimeout(i, e);
    },
    /**
     * @return the created notification
     */
    notify(i) {
      this.oneNotificationOnly && this.closeAllNotifications(), i.options.id = this.useNextNotificationId();
      const e = i.options.duration;
      return i.options.duration = -1, m.notify(i.options), this.notifications[i.options.id] = i, typeof e == "number" && e < 0 || this.setTimeout(
        () => this.closeNotification(i.options.id),
        //uses "duration" if it is a positive number. otherwise uses the notification api's
        // default value 3_000
        typeof e == "number" && e > 0 ? e : 3e3
      ), i;
    },
    closeNotification(i) {
      return m.notify.close(i), delete this.notifications[i], this;
    },
    closeAllNotifications() {
      return m.notify({
        clean: !0
      }), this.notifications = {}, this;
    },
    getNotificationById(i) {
      return this.notifications[i] ?? null;
    }
  }
}), A = /* @__PURE__ */ l({
  __name: "Notification",
  props: {
    item: {},
    close: { type: Function }
  },
  setup(i) {
    const e = i, t = y(() => ({
      item: e.item,
      close: () => {
        r.closeNotification(e.item.id);
      }
    })), r = N(), a = S(null);
    return p(() => {
      if (typeof e.item.id != "number")
        return;
      const f = r.getNotificationById(e.item.id);
      f && (a.value = x(f.component.component));
    }), (f, w) => a.value !== null ? (d(), v(D(a.value), P(k({ key: 0 }, t.value)), null, 16)) : K("", !0);
  }
}), _ = () => typeof Storage < "u", n = () => {
  if (!_())
    throw new Error("The browser does not support storage.");
}, o = (i, e) => i + e, F = () => {
  const i = Math.floor(Date.now() / 1e3), e = Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
  return `-${i}-${e}`;
}, u = (i, e, t) => {
  n(), sessionStorage.setItem(o(i, e), t);
}, h = (i, e) => (n(), sessionStorage.getItem(o(i, e))), T = (i, e) => (n(), sessionStorage.removeItem(o(i, e))), E = (i, e, t) => i.getItemOrDefault(e, t), M = (i, e, t) => {
  n(), localStorage.setItem(o(i, e), t);
}, V = (i, e) => (n(), localStorage.getItem(o(i, e))), C = (i, e) => (n(), localStorage.removeItem(o(i, e)));
class c {
  constructor(e) {
    this._storageID = e;
  }
  get storageID() {
    return this._storageID;
  }
  set storageID(e) {
    this._storageID = e;
  }
  get generalPrefix() {
    return this.storageID.generalPrefix;
  }
  set generalPrefix(e) {
    this.storageID.generalPrefix = e;
  }
  get keySuffix() {
    return this.storageID.keySuffix;
  }
  set keySuffix(e) {
    this.storageID.keySuffix = e;
  }
  /**
   * Gets the complete key prefix by concatenating the this.generalPrefix and the key.
   * @param key
   */
  getKeyPrefix(e) {
    return this.generalPrefix + e;
  }
  //you may later use something like "valueOf" instead:
  //https://stackoverflow.com/questions/49285864/is-there-a-valueof-similar-to-keyof-in-typescript
  /**
   * Checks whether the item is valid (whether it can be integrated into the items property)
   * @param item (the value of the item)
   * @return boolean
   */
  static isItemValid(e) {
    return e !== void 0;
  }
}
class L extends c {
  /**
   * automatically retrieves values for the keys from session storage
   * @param keys
   * @param storageID
   */
  constructor(e, t) {
    super(t), this._keys = e, this.setUpItems();
  }
  get keys() {
    return this._keys;
  }
  set keys(e) {
    this._keys = e;
  }
  get items() {
    return this._items;
  }
  set items(e) {
    this._items = e;
  }
  /**
   * retrieves values from session storage and returns the JSON-decoded versions.
   * @return StorageItems
   */
  retrieveItems() {
    const e = {};
    return this.keys.forEach((t) => {
      const r = h(this.getKeyPrefix(t), this.keySuffix);
      r !== null && (e[t] = JSON.parse(r));
    }), e;
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
  getItemOrDefault(e, t) {
    const r = this.items[e];
    return r !== void 0 ? r : t;
  }
}
class J extends c {
  /**
   * automatically saves items to storage
   * @param items
   * @param storageID
   */
  constructor(e, t) {
    super(t), this._items = e, this.saveItems(this.items);
  }
  get items() {
    return this._items;
  }
  set items(e) {
    this._items = e;
  }
  /**
   * saves the item to the items property
   * @param key (the key of the item)
   * @param value (the value of the item)
   */
  saveItemToItems(e, t) {
    c.isItemValid(t) && (this.items[e] = t);
  }
  /**
   * JSON-encodes the value and saves it to storage.
   * @param key (the key of the item)
   * @param value (the value of the item)
   */
  saveItemToStorage(e, t) {
    c.isItemValid(t) && u(this.getKeyPrefix(e), this.keySuffix, JSON.stringify(t));
  }
  /**
   * saves the item to the items property and storage.
   * @param key (the key of the item)
   * @param value (the value of the item)
   */
  saveItem(e, t) {
    c.isItemValid(t) && (this.saveItemToItems(e, t), this.saveItemToStorage(e, t));
  }
  /**
   * saves the items to the items property and storage using Save.saveItem.
   */
  saveItems(e) {
    Object.keys(e).forEach((t) => this.saveItem(t, this.items[t]));
  }
  /**
   * deletes the key from the items property.
   * @param key
   */
  deleteItemFromItems(e) {
    delete this.items[e];
  }
  /**
   * deletes the key from storage.
   * @param key
   */
  deleteItemFromStorage(e) {
    T(this.getKeyPrefix(e), this.keySuffix);
  }
  /**
   * deletes the item from the items property and storage.
   * @param key
   */
  deleteItem(e) {
    this.deleteItemFromItems(e), this.deleteItemFromStorage(e);
  }
}
class s {
  /**
   * automatically transfers items
   * @param senderID
   * @param recipientID
   * @param keys
   */
  constructor(e, t, r) {
    this._senderID = t, this._recipientID = r, this._keys = s.convertIntoTransferKeys(e), this.transferItems(this.keys);
  }
  get senderID() {
    return this._senderID;
  }
  set senderID(e) {
    this._senderID = e;
  }
  get recipientID() {
    return this._recipientID;
  }
  set recipientID(e) {
    this._recipientID = e;
  }
  get keys() {
    return this._keys;
  }
  set keys(e) {
    this._keys = e;
  }
  /**
   * generates a transfer key from a key
   * @param key
   */
  static generateTransferKeyFromKey(e) {
    return {
      sender: e,
      recipient: e
    };
  }
  /**
   * converts a string into TransferKey.
   * @param key
   */
  static convertIntoTransferKey(e) {
    return typeof e == "string" ? s.generateTransferKeyFromKey(e) : e;
  }
  /**
   * converts strings into TransferKeys.
   * @param array
   */
  static convertIntoTransferKeys(e) {
    return e.map((t) => s.convertIntoTransferKey(t));
  }
  /**
   * checks whether the value is valid (i.e.: can be saved to storage)
   * @param value
   */
  static canBeSavedToStorage(e) {
    return typeof e == "string";
  }
  /**
   * Gets the complete key prefix by concatenating storageID's generalPrefix and the key.
   * @param storageID
   * @param key
   */
  static getKeyPrefix(e, t) {
    return e.generalPrefix + t;
  }
  /**
   * Retrieves the key suffix of the storage id.
   * @param storageID
   */
  static getKeySuffix(e) {
    return e.keySuffix;
  }
  /**
   * @param key
   * @protected
   */
  retrieveItem(e) {
    const t = s.getKeyPrefix(this.senderID, e), r = s.getKeySuffix(this.senderID);
    return h(t, r);
  }
  /**
   * @param key
   * @param value
   * @protected
   */
  saveItem(e, t) {
    if (!s.canBeSavedToStorage(t))
      return;
    const r = s.getKeyPrefix(this.recipientID, e), a = s.getKeySuffix(this.recipientID);
    u(r, a, t);
  }
  /**
   * transfers an item from the sender to the recipient
   * @public
   * @param key
   */
  transferItem(e) {
    e = s.convertIntoTransferKey(e), this.saveItem(e.recipient, this.retrieveItem(e.sender));
  }
  /**
   * transfers items from the sender to the recipient by calling Transfer.transferItem for each key.
   * @public
   * @param keys
   */
  transferItems(e) {
    e = s.convertIntoTransferKeys(e), e.forEach((t) => this.transferItem(t));
  }
}
class R {
  /**
   * automatically generates a key suffix if the keySuffix parameter is left undefined.
   * @param generalPrefix
   * @param keySuffix
   */
  constructor(e, t) {
    this._generalPrefix = e, this._keySuffix = t ?? F();
  }
  get generalPrefix() {
    return this._generalPrefix;
  }
  set generalPrefix(e) {
    this._generalPrefix = e;
  }
  get keySuffix() {
    return this._keySuffix;
  }
  set keySuffix(e) {
    this._keySuffix = e;
  }
  /**
   * Gets the complete key prefix by concatenating this.generalPrefix and the key.
   * @param key
   */
  getKeyPrefix(e) {
    return this.generalPrefix + e;
  }
  /**
   * Gets the complete key by concatenating this.getKeyPrefix and this.keySuffix.
   * @param key
   */
  getKey(e) {
    return o(this.getKeyPrefix(e), this.keySuffix);
  }
}
export {
  A as Notification,
  L as Retrieve,
  J as Save,
  R as StorageID,
  s as Transfer,
  o as generateKeyFromPrefixAndSuffix,
  F as generateKeySuffix,
  V as getItemFromLocalStorage,
  h as getItemFromSessionStorage,
  E as getItemOrDefault,
  C as removeItemFromLocalStorage,
  T as removeItemFromSessionStorage,
  M as setItemIntoLocalStorage,
  u as setItemIntoSessionStorage,
  N as useNotificationStore
};
