import type {NotificationItem, NotificationsOptions} from "@kyvg/vue3-notification";

interface NotificationObject {
    options: Omit<NotificationItem, 'length'>
    //for the vue component to be rendered through Notification.vue
    component: {
        //the vue component
        component: any
        //additional data to be used inside the component.
        data?: any
    }
}

interface NotificationArgument {
    options: NotificationsOptions
    //for the vue component to be rendered through Notification.vue
    component: {
        //the vue component
        component: any
        //additional data to be used inside the component.
        data?: any
    },
}

interface NotificationStoreState {
    nextNotificationId: number
    //if true, all existing notifications will be closed before a new notification is opened so that there is only one
    //notification at a time.
    oneNotificationOnly: boolean
    notifications: {[key: number]: NotificationObject}
}

export type {
    NotificationObject,
    NotificationArgument,
    NotificationStoreState
}