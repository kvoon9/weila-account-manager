<script setup lang="ts">
import type { Legal } from '~/types'

defineProps<{
  legal: Legal | null
}>()
</script>

<template>
  <ADescriptions v-if="legal" :column="2" bordered>
    <ADescriptionsItem label="企业号" :span="2">
      {{ legal?.org_num }}
    </ADescriptionsItem>
    <ADescriptionsItem label="姓名" :span="2">
      {{ legal?.name }}
    </ADescriptionsItem>
    <ADescriptionsItem label="证件号" :span="2">
      {{ legal?.identify }}
    </ADescriptionsItem>
    <ADescriptionsItem label="证件类型" :span="2">
      {{ legal?.category === 0 ? '企业' : '个人' }}
    </ADescriptionsItem>

    <!-- 企业显示营业执照 -->
    <ADescriptionsItem v-if="legal?.category === 0" label="营业执照" :span="2">
      <AImage
        v-if="legal.business_license"
        :src="legal.business_license"
        width="200"
        height="120"
        fit="cover"
      />
      <span v-else>暂无图片</span>
    </ADescriptionsItem>

    <!-- 个人显示身份证 -->
    <ADescriptionsItem v-if="legal?.category === 1" label="身份证正面" :span="2">
      <AImage
        v-if="legal?.identify_card_front"
        :src="legal.identify_card_front"
        width="200"
        height="120"
        fit="cover"
      />
      <span v-else>暂无图片</span>
    </ADescriptionsItem>
    <ADescriptionsItem v-if="legal?.category === 1" label="身份证反面" :span="2">
      <AImage
        v-if="legal?.identify_card_reverse"
        :src="legal.identify_card_reverse"
        width="200"
        height="120"
        fit="cover"
      />
      <span v-else>暂无图片</span>
    </ADescriptionsItem>

    <ADescriptionsItem label="更新时间" :span="2">
      {{ legal?.updated }}
    </ADescriptionsItem>
  </ADescriptions>
  <AEmpty v-else />
</template>
