import type { NotificationItem, NotificationsOptions } from "@kyvg/vue3-notification";
interface NotificationObject {
    options: Omit<NotificationItem, 'length'>;
    component: {
        component: any;
        data?: any;
    };
}
interface NotificationArgument {
    options: NotificationsOptions;
    component: {
        component: any;
        data?: any;
    };
}
interface NotificationStoreState {
    nextNotificationId: number;
    oneNotificationOnly: boolean;
    notifications: {
        [key: number]: NotificationObject;
    };
}
export type { NotificationObject, NotificationArgument, NotificationStoreState };
//# sourceMappingURL=types.d.ts.map