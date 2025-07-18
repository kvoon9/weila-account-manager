<script setup lang="ts">
import type { Legal } from '~/types'

definePageMeta({
  layout: 'home',
  name: '待审核认证',
})

const { data: uncheckedLegals, pending: pendingUnchecked, refresh } = useWeilaFetch<{
  count: number
  legals: Legal[]
}>('opt/corp/legal-get-wait-audit-list')

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
  // refreshUncheckedLegals()
  refresh()
}

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
</script>

<template>
  <div>
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
  </div>
</template>
