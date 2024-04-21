import type { NotificationObject, NotificationArgument, NotificationStoreState as State } from "../types";
/**
 * This store enables us to attach extra data to each notification element by reading/writing the extra data of each
 * element's state to/from this store. For example, when we make a notification element, we can attach the vue component
 * and its props using which we will render the notification.
 */
declare const useNotificationStore: import("pinia").StoreDefinition<"notification", State, {}, {
    /**
     * returns the next notification id and increments the "next notification id" property.
     */
    useNextNotificationId(): number;
    setTimeout(callback: () => void, ms?: number): any;
    /**
     * @return the created notification
     */
    notify(notification: NotificationArgument): NotificationObject;
    closeNotification(id: number): any & {
        nextNotificationId: number;
        oneNotificationOnly: boolean;
        notifications: {
            [key: number]: NotificationObject;
        };
    } & import("pinia")._StoreWithState<"notification", State, {}, any> & import("pinia")._StoreWithGetters<{}> & import("pinia").PiniaCustomProperties<string, import("pinia").StateTree, import("pinia")._GettersTree<import("pinia").StateTree>, import("pinia")._ActionsTree>;
    closeAllNotifications(): any & {
        nextNotificationId: number;
        oneNotificationOnly: boolean;
        notifications: {
            [key: number]: NotificationObject;
        };
    } & import("pinia")._StoreWithState<"notification", State, {}, any> & import("pinia")._StoreWithGetters<{}> & import("pinia").PiniaCustomProperties<string, import("pinia").StateTree, import("pinia")._GettersTree<import("pinia").StateTree>, import("pinia")._ActionsTree>;
    getNotificationById(id: number): NotificationObject | null;
}>;
export { useNotificationStore, };
//# sourceMappingURL=notification.d.ts.map