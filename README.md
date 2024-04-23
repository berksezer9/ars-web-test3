### Overview

This package is a wrapper for @kyvg/vue3-notifications. It provides improved state management, and facilitates
rendering custom components for each notification element. 

### Setup

#### Install Packages
add these to dependencies on package.json. ensure you have the peer dependencies with compatible versions installed:
(peer dependencies: @kyvg/vue3-notification, pinia, vue)

```
"@altimayazilim/vue-notifications": "git+ssh://git@bitbucket.org:altimayazilim/vue-notifications.git"
"@kyvg/vue3-notification": "^3.0.1",
"pinia": "^2.0.32",
"vue": "^3.0.0"
```

Note: you need to have ssh access to this repository to be able to install it.

#### Set Up Packages
Set up peer dependency packages as described in their docs. It can be something like this on main.ts:

```ts
import {createApp} from 'vue'
import {createPinia} from 'pinia'
import Notifications from '@kyvg/vue3-notification'

//creates a vue app
const app = createApp(App)

//registers pinia
app.use(createPinia())

//registers @kyvg/vue3-notification
app.use(Notifications)
```

On App.vue
```vue
<script setup lang="ts">
  import {Notification} from "@altimayazilim/vue-notifications";
</script>

<template>
  <!-- The "Notifications" component exported by @kyvg/vue3-notification. It is registered into the consumer project through vueApp.use(Notifications) like any normal vue plugin.-->
  <Notifications style="right:8px; top:8px;">
    <template v-slot:body="props">
      <div class="drop-shadow-md p-2">
        <Notification :item="props.item" :close="props.close"/>
      </div>
    </template>
  </Notifications>
</template>
```

### Usage

#### Create Custom Component
For example, create "SuccessNotification.vue" to render your notifications about success.


```vue

<script setup lang="ts">

import type {NotificationsOptions} from "@kyvg/vue3-notification";
import Icon from "@/components/utils/Icon.vue";

interface Props {
  item: NotificationsOptions
  close: () => void
}

const props = defineProps<Props>()

</script>

<template>
  <div class="grid gap-y-2 bg-white border rounded-lg p-2">
    <div class="flex gap-x-2">
      <Icon icon="check-circle" prefix="far" class="my-auto text-lg text-blue-500"/>

      <div v-if="props.item.title" class="my-auto text-base text-slate-900">
        {{props.item.title}}
      </div>

      <Icon
          icon="xmark"
          prefix="fas"
          @click="props.close"
          class="ml-auto my-auto text-lg text-gray-700 hover:bg-gray-200 relative rounded-full px-1.5 py-1"
      />
    </div>

    <div v-if="props.item.text" class="text-slate-700 text-sm">
      {{props.item.text}}
    </div>
  </div>

</template>
```

#### Create Notification Service
You can create a service file "src/services/notification.ts" to manage notifications. Although this is optional, it provides an easier interface.

```ts
import type {NotificationsOptions} from "@kyvg/vue3-notification";
import {merge} from "lodash";
import SuccessNotification from "@/components/notifications/SuccessNotification.vue";
import type {NotificationArgument, NotificationObject} from "@altimayazilim/vue-notifications";
import {useNotificationStore} from "@altimayazilim/vue-notifications"

function getDefaultNotificationsOptions(): NotificationsOptions {
    return {
        duration: 5_000,
    }
}

function notify (notification: NotificationArgument): NotificationObject {
    return useNotificationStore().notify({
        ...notification,
        ...{
            options: {
                ...getDefaultNotificationsOptions(),
                ...notification.options,
            }
        }
    })
}

function notifyAboutSuccess (notification: {
    options: NotificationsOptions
    //for the vue component to be rendered through Notification.vue
    component?: {
        //the vue component
        component?: any
        //additional data to be used inside the component.
        data?: any
    },
}): NotificationObject {
    return notify(merge(
        {
            component: {
                component: SuccessNotification,
            }
        },
        notification
    ))
}

export {
    notifyAboutSuccess,
}
```
Then you can call "notifyAboutSuccess" to notify.
```vue
<script setup lang="ts">
import {notifyAboutSuccess} from "@/services/notification";

notifyAboutSuccess({
    options: {
      title: 'Success',
      text: 'Product added to your inventory.'
    }
})
</script>
```

Likewise, you can also create a MyNotification.vue component, and add a myNotify function to
src/services/notification.ts; then call myNotify to make a notification.

# js-storage
