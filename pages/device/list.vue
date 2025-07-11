<script setup lang="ts">
definePageMeta({
  name: '产品列表',
  layout: 'home',
})

const { data } = useWeilaFetch<{
  name: string
  desc: string
  group_limit: string
  created: string
}>('operator/extension/get-all-product')
</script>

<template>
  <div>
    <the-table
      :columns="{
        name: '名称',
        desc: '描述',
        group_limit: '群上限',
        created: '创建时间',
      }" :data
    />
  </div>
</template>
