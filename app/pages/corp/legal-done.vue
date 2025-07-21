<script setup lang="ts">
import type { CheckedLegal } from '~/types'

definePageMeta({
  layout: 'home',
  name: '认证记录查询',
})

const search = ref({
  org_num: 100055, // a-input
  identify: '123456789012345678', // a-input
  date: undefined, // a-date-p机构icker
})

const { data: checkedLegals, refresh, pending: pendingChecked } = useWeilaMutation<{
  count: number
  legals: CheckedLegal[]
}>('opt/corp/legal-record-search', {
  body: search,
})
</script>

<template>
  <ACard title="已审核记录" :loading="pendingChecked">
    <template #extra>
      <ASpace>
        <AInput
          v-model.number="search.org_num"
          placeholder="企业号"
          class="w-32"
          allow-clear
        />
        <AInput
          v-model.trim="search.identify"
          placeholder="证件号"
          class="w-48"
          allow-clear
        />
        <ADatePicker v-model="search.date" />
        <AButton @click="() => refresh()">
          查询
        </AButton>
      </ASpace>
    </template>

    <ATable
      :data="checkedLegals?.legals || []"
      :pagination="{ pageSize: 1 }"
      row-key="id"
    >
      <template #columns>
        <ATableColumn title="企业号" data-index="org_num" />
        <ATableColumn title="姓名" data-index="name" />
        <ATableColumn title="证件号" data-index="identify" />
        <ATableColumn title="状态">
          <template #cell="{ record }">
            <ATag :color="record.state === 8 ? 'green' : 'red'">
              {{ record.state === 8 ? '通过' : '拒绝' }}
            </ATag>
          </template>
        </ATableColumn>
        <ATableColumn title="原因" data-index="reason" />
        <ATableColumn title="更新时间" data-index="updated" />
      </template>
    </ATable>
  </ACard>
</template>
