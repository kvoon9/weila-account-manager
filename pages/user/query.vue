<script setup lang="ts">
definePageMeta({
  name: '用户查询',
  layout: 'home',
  keepalive: true,
})

interface User {
  user_id: string
  gender: string
  user_number: string
  nick: string
  status: string
  avatar: string
  phone: string
  country_code: string
}

const input = shallowRef('')

const data = shallowRef<User>()

async function search() {
  data.value = await useWeilaApi().value.v1.fetch<User>('operator/user/search-user', {
    body: { number: input.value },
  })
}

const columns = [
  { title: '用户ID', dataIndex: 'user_id' },
  { title: '昵称', dataIndex: 'nick' },
  { title: '性别', dataIndex: 'gender' },
  { title: '手机号', dataIndex: 'phone' },
  { title: '状态', dataIndex: 'status' },
  { title: '用户编号', dataIndex: 'user_number' },
  { title: '头像', dataIndex: 'avatar' },
  { title: '国家代码', dataIndex: 'country_code' },
]
</script>

<template>
  <div space-y-4 w-full>
    <div flex gap-4>
      <a-input v-model="input" :style="{ width: '320px' }" placeholder="账号/手机号" @keydown.enter="search" />
      <a-button @click="search">
        搜索
      </a-button>
    </div>
    <a-table :columns="columns" :data="data" />
  </div>
</template>
