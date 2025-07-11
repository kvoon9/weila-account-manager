<script setup lang="ts">
import { useSearchQuery } from '~/composables/useSearchQuery'

const props = withDefaults(defineProps<{
  width?: number
  queryKey?: string
  placeholder?: string
}>(), {
  width: 320,
  queryKey: 'search',
})

const emits = defineEmits<{
  (e: 'search', value: string): void
}>()

const search = useSearchQuery(props.queryKey)

function onSearch() {
  if (!search.value) {
    Message.error('搜索内容不能为空')
    return
  }

  emits('search', search.value)
}
</script>

<template>
  <div flex gap-4>
    <a-input
      v-model="search"
      :style="{ width: `${width}px` }"
      :placeholder
      @keydown.enter="() => onSearch()"
    />
    <a-button type="primary" @click="() => onSearch()">
      搜索
    </a-button>
  </div>
</template>
