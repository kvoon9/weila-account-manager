<script setup lang="ts">
definePageMeta({
  layout: 'home',
  name: '认证审核',
})

export interface Legal {
  id: number
  org_num: number
  category: number
  name: string
  identify: string
  identify_card_front: string
  identify_card_reverse: string
  state: number
  updated: string // 2025-07-15 15:28:52
}

export interface CheckedLegal extends Legal {
  reason: string
}

const { data: uncheckedLegals, refresh: refreshUncheckedLegals, pending: pendingUnchecked } = useWeilaFetch<{
  count: number
  legals: Legal[]
}>('opt/corp/legal-get-wait-audit-list')

const search = ref({
  org_num: 100055, // a-input
  identify: '123456789012345678', // a-input
  date: undefined, // a-date-p机构icker
})

const { data: checkedLegals, refresh, pending: pendingChecked } = useWeilaFetch<{
  count: number
  legals: CheckedLegal[]
}>('opt/corp/legal-record-search', {
  body: search,
  deep: true,
})

function legalAudit(body: {
  id: number
  state: number // 8 pass, 9 reject
  reason: string
}) {
  const api = useWeilaApi()
  return api.value.v2.fetch('opt/corp/legal-audit', {
    body,
  })
}

// 审核弹窗
const modalVisible = ref(false)
const currentLegal = ref<Legal | null>(null)
const auditForm = reactive({
  state: 8,
  reason: '',
})

function openAuditModal(legal: Legal) {
  currentLegal.value = legal
  auditForm.state = 8
  auditForm.reason = ''
  modalVisible.value = true
}

async function handleAudit() {
  if (!currentLegal.value)
    return
  await legalAudit({
    id: currentLegal.value.id,
    state: auditForm.state,
    reason: auditForm.reason,
  })
  modalVisible.value = false
  refreshUncheckedLegals()
  refresh()
}

const isSearchModalOpen = shallowRef(false)
</script>

<template>
  <div class="p-6 space-y-6">
    <!-- 待审核列表 -->
    <ACard title="待审核列表" :loading="pendingUnchecked">
      <ATable
        :data="uncheckedLegals?.legals || []"
        :pagination="{ pageSize: 1 }"
        row-key="id"
      >
        <template #columns>
          <ATableColumn title="企业号" data-index="org_num" />
          <ATableColumn title="姓名" data-index="name" />
          <ATableColumn title="证件号" data-index="identify" />
          <ATableColumn title="更新时间" data-index="updated" />
          <ATableColumn title="操作">
            <template #cell="{ record }">
              <ASpace>
                <AButton
                  type="primary"
                  size="mini"
                  @click="openAuditModal(record)"
                >
                  审核
                </AButton>
              </ASpace>
            </template>
          </ATableColumn>
        </template>
      </ATable>
    </ACard>

    <!-- 已审核记录 -->
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
          <!-- 新增：搜索最新按钮 -->
          <AButton type="primary" @click="isSearchModalOpen = true">
            搜索最新
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

    <!-- 审核弹窗 -->
    <AModal
      v-model:visible="modalVisible"
      title="审核认证"
      @ok="handleAudit"
    >
      <AForm :model="auditForm" layout="vertical">
        <AFormItem label="审核结果">
          <ARadioGroup v-model="auditForm.state">
            <ARadio :value="8">
              通过
            </ARadio>
            <ARadio :value="9">
              拒绝
            </ARadio>
          </ARadioGroup>
        </AFormItem>
        <AFormItem v-if="auditForm.state === 9" label="拒绝原因">
          <ATextarea
            v-model="auditForm.reason"
            placeholder="请输入拒绝原因"
            :rows="3"
          />
        </AFormItem>
      </AForm>
    </AModal>

    <!-- 搜索最新数据模态框 -->
    <AModal
      v-model:visible="isSearchModalOpen"
      title="搜索最新数据"
      :footer="false"
      width="800px"
    >
      <SearchCorpLegal v-if="isSearchModalOpen" />
    </AModal>
  </div>
</template>
