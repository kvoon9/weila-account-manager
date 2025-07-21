<script setup lang="ts">
import * as v from 'valibot'
import '@valibot/i18n/zh-CN'

v.setGlobalConfig({
  lang: 'zh-CN',
})
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
