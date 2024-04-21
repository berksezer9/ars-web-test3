<script setup lang="ts">

import type {NotificationsOptions} from "@kyvg/vue3-notification";
import {Component, computed, markRaw, onMounted, ref} from "vue";
import {useNotificationStore} from "../stores/notification";

interface Props {
  item: NotificationsOptions
  close: () => void
}

const props = defineProps<Props>()

const propsForChild = computed((): Props => {
  return {
    item: props.item,
    close: (): void => {
      notificationStore.closeNotification(props.item.id)
    },
  }
})

const notificationStore = useNotificationStore()

const component = ref<Component|null>(null)

onMounted(() => {
  if(! (typeof props.item.id === 'number')) {
    return
  }

  const notification = notificationStore.getNotificationById(props.item.id)

  if(! notification) {
    return
  }

  component.value = markRaw(notification.component.component)
})

</script>

<template>

  <component
      v-if="component !== null"
      :is="component"
      v-bind="propsForChild"
  />

</template>