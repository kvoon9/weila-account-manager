<script setup lang="ts">
definePageMeta({
  name: '港澳台开户',
  layout: 'home',
})

const form = reactive({
  country_code: '',
  phone: '',
  password: ''
})

const regionOptions = [
  { label: '香港 +852', value: '+852' },
  { label: '澳门 +853', value: '+853' },
  { label: '台湾 +886', value: '+886' }
]
</script>

<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm">
    <h2 class="text-xl font-semibold mb-6 text-gray-800">港澳台开户</h2>
    
    <div class="space-y-4">
      <a-form :model="form" layout="vertical">
        <a-form-item label="手机号" field="phone">
          <a-input-group>
            <a-select
              v-model="form.country_code"
              :options="regionOptions"
              :style="{width:'160px'}"
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

        <a-button type="primary" long>提交</a-button>
      </a-form>
    </div>
  </div>
</template>

<style scoped>
/* 使用Tailwind CSS，无需额外样式 */
</style>
