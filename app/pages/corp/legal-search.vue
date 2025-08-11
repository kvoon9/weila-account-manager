<script setup lang="ts">
import type { Legal } from '~/types'

definePageMeta({
  layout: 'home',
  name: '认证信息查询',
})

const search = ref({
  org_num: undefined,
  identify: '',
})

const curPage = shallowRef(1)
const pageSize = shallowRef(10)
const { data: result, refresh, pending: isLoading } = useWeilaMutation<{
  count: number
  legals: Legal[]
}>('opt/corp/legal-search', {
  body: search,
  query: computed(() => ({
    page: curPage.value,
    size: pageSize.value,
  })),
})

const modalVisible = ref(false)
const currentLegal = ref<Legal | null>(null)
function openAuditModal(legal: Legal) {
  currentLegal.value = legal
  modalVisible.value = true
}
</script>

<template>
  <div>
    <ACard title="查询结果" :loading="isLoading">
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
          <AButton type="primary" @click="() => refresh()">
            查询
          </AButton>
        </ASpace>
      </template>

      <ATable
        :data="result?.legals || []"
        :pagination="{ pageSize, current: curPage, total: result?.count || 0 }"
        :column-resizable="true"
        @page-change="(page: number) => curPage = page"
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
          <ATableColumn title="操作">
            <template #cell="{ record }">
              <ASpace>
                <AButton
                  type="primary"
                  size="mini"
                  @click="openAuditModal(record)"
                >
                  查看
                </AButton>
              </ASpace>
            </template>
          </ATableColumn>
        </template>
      </ATable>
    </ACard>

    <AModal
      v-model:visible="modalVisible"
      title="审核认证"
      :footer="false"
    >
      <LegalDetail :legal="currentLegal" />
    </AModal>
  </div>
</template>
