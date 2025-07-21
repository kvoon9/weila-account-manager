<script setup lang="ts">
import * as v from 'valibot'
import { useForm } from 'zod-arco-rules/valibot'

definePageMeta({
  name: '港澳台开户',
  layout: 'home',
})

const api = useWeilaApi()

const { form, rules, reset, handleSubmit } = useForm(v.object({
  country_code: v.optional(v.string(), '+852'),
  phone: v.string(),
  password: v.pipe(v.string(), v.minLength(6)),
}))

const regionOptions = [
  { label: '香港 +852', value: '+852' },
  { label: '澳门 +853', value: '+853' },
  { label: '台湾 +886', value: '+886' },
]

interface Account {
  weila_number: string
  password: string
}

const accounts = ref<Account[]>([])

const submit = handleSubmit(async () => {
  const newAccount = await api.value.v1.fetch<Account>('/operator/user/create-international-account', {
    body: form,
  })
  if (newAccount)
    accounts.value.push(newAccount)

  reset()
})
</script>

<template>
  <div class="max-w-md bg-white rounded-lg ">
    <div class="space-y-4 p-4">
      <a-form :rules :model="form" layout="vertical" @submit="submit">
        <a-form-item label="手机号" field="phone">
          <a-input-group>
            <a-select
              v-model="form.country_code"
              :options="regionOptions"
              :style="{ width: '160px' }"
              placeholder="地区码"
            />
            <a-input
              v-model="form.phone"
              placeholder="请输入手机号"
              allow-clear
            />
          </a-input-group>
        </a-form-item>

        <a-form-item label="密码" field="password">
          <a-input-password
            v-model="form.password"
            placeholder="请输入密码"
            allow-clear
          />
        </a-form-item>

        <a-form-item>
          <a-button mla @click="reset">
            重置
          </a-button>
          <a-button ml4 type="primary" html-type="submit">
            提交
          </a-button>
        </a-form-item>
      </a-form>

      <!-- Display created accounts -->
      <div v-if="accounts.length > 0" class="mt-6">
        <a-typography-title :heading="6">
          已创建账号
        </a-typography-title>
        <a-table
          :data="accounts"
          :pagination="false"
          :bordered="false"
          class="mt-2"
        >
          <template #columns>
            <a-table-column title="微喇号" data-index="weila_number" />
            <a-table-column title="密码" data-index="password" />
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>
