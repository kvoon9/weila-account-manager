<script setup lang="ts">
import SearchInput from '~/components/SearchInput.vue'
import TheTable from '~/components/TheTable.vue'

definePageMeta({
  name: '用户查询',
  layout: 'home',
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

const columns = {
  user_id: '用户ID',
  nick: '昵称',
  gender: '性别',
  phone: '手机号',
  status: '状态',
  user_number: '用户编号',
  avatar: '头像',
  country_code: '国家代码',
}
</script>

<template>
  <div space-y-4 w-full>
    <SearchInput placeholder="账号/手机号" @search="search" />
    <TheTable :columns :data>
      <template #columns>
        <a-table-column title="操作">
          <template #cell>
            <a-button @click="() => void 0">
              view
            </a-button>
          </template>
        </a-table-column>
      </template>
    </TheTable>
  </div>
</template>
