import {defineStore} from "pinia";
import {useNotification} from "@kyvg/vue3-notification";
import type {NotificationObject, NotificationArgument, NotificationStoreState as State} from "../types";

//the object that serves as an api for "@kyvg/vue3-notification"
const notificationApi = useNotification()

/**
 * This store enables us to attach extra data to each notification element by reading/writing the extra data of each
 * element's state to/from this store. For example, when we make a notification element, we can attach the vue component
 * and its props using which we will render the notification.
 */
const useNotificationStore = defineStore('notification', {
    state: (): State => {
        return {
            nextNotificationId: 0,
            oneNotificationOnly: true,
            notifications: {}
        }
    },

    actions: {
        /**
         * returns the next notification id and increments the "next notification id" property.
         */
        useNextNotificationId (): number {
            const id = this.nextNotificationId

            this.nextNotificationId += 1

            return id
        },

        setTimeout(callback: () => void, ms?: number): any {
            return setTimeout(callback, ms)
        },

        /**
         * @return the created notification
         */
        notify (notification: NotificationArgument): NotificationObject {
            if(this.oneNotificationOnly) {
                //all existing notifications are closed before a new notification is opened so that there is only one
                //notification at a time.
                this.closeAllNotifications()
            }

            //automatically sets the id
            notification.options.id = this.useNextNotificationId()

            //saves the duration option
            const duration: any = notification.options.duration

            //sets to -1 so that the notification stays open until we close it using this.closeNotification.
            //we need to do this for consistency between this store's state and notificationApi's state.
            notification.options.duration = -1

            //notifies through the api
            notificationApi.notify(notification.options)

            //adds to the notifications object. Note: the "options" property gets mutated due to the notification api.
            //Post-mutation, the notification object will be of type Notification.
            this.notifications[notification.options.id] = notification as unknown as NotificationObject

            //unless the duration is a negative number, sets a timeout. (this is how the notification api we use
            // underneath works)
            if (! (typeof duration === 'number' && duration < 0.0)) {
                this.setTimeout(
                    () => this.closeNotification(notification.options.id as unknown as number),
                    //uses "duration" if it is a positive number. otherwise uses the notification api's
                    // default value 3_000
                    typeof duration === 'number' && duration > 0.0 ? duration : 3_000
                )
            }

            return notification as unknown as NotificationObject
        },

        closeNotification (id: number) {
            notificationApi.notify.close(id)

            delete this.notifications[id]

            return this
        },

        closeAllNotifications () {
            notificationApi.notify({
                clean: true,
            })

            this.notifications = {}

            return this
        },

        getNotificationById(id: number): NotificationObject|null {
            return this.notifications[id] ?? null
        },
    }
})

export {
    useNotificationStore,
}
