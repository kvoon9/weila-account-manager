<script setup lang="ts">
import type { CheckedLegal } from '~/types'

const search2 = ref({
  org_num: undefined,
  identify: '',
})
const result = ref<{
  count: number
  legals: CheckedLegal[]
} | undefined>(undefined)
const isLoading = shallowRef(false)

async function fetchLatestLegal() {
  const api = useWeilaApi()
  isLoading.value = true
  try {
    result.value = await api.value.v2.fetch('opt/corp/legal-search', {
      body: search2.value,
    })
  }
  catch (error) {
    Message.error(String(error))
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div>
    <ACard title="待审核列表" :loading="isLoading">
      <template #extra>
        <ASpace>
          <AInput
            v-model.number="search2.org_num"
            placeholder="企业号"
            class="w-32"
            allow-clear
          />
          <AInput
            v-model.trim="search2.identify"
            placeholder="证件号"
            class="w-48"
            allow-clear
          />
          <AButton type="primary" @click="fetchLatestLegal">
            查询
          </AButton>
        </ASpace>
      </template>

      <ATable
        v-if="result"
        :data="result.legals"
        :pagination="false"
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
  </div>
</template>
