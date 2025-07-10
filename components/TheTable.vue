<script lang="ts" setup>
import { objectEntries } from '@antfu/utils'

withDefaults(defineProps<{
  columns: Record<string, string>
  data?: Record<string, any>
}>(), {
  columns: () => ({}),
})
</script>

<template>
  <a-table :data="data">
    <template #columns="data">
      <a-table-column v-for="[key, title] in objectEntries(columns)" :key ellipsis tooltip :title :data-index="key" />
      <slot name="columns" :data />
    </template>
  </a-table>
</template>
