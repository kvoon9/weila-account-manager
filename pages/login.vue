<script setup lang="ts">
import md5 from 'md5'

const api = useWeilaApi().value

definePageMeta({
  public: true,
  layout: 'welcome',
})

const form = reactive<{
  account: string
  passwd: string
  areacode: string | undefined
}>({
  account: '10000002',
  passwd: '123456',
  areacode: undefined, // 默认不选中
})

function submit() {
  api.v2.fetch(`opt/auth/login`, {
    body: {
      ...form,
      passwd: md5(form.passwd),
    },
  }).then((res) => {
    localStorage.setItem('token', res.access_token)
    navigateTo('/')
    Message.info('登录成功')
  }).catch(() => {
    Message.error('登录失败')
  })
}
</script>

<template>
  <div h-full flex="~ items-center justify-center">
    <a-space direction="vertical" size="large" :style="{ width: '600px' }">
      <a-form border p8 rounded :model="form" layout="vertical">
        <h1 text-center>
          登录
        </h1>

        <!-- 地区码 -->
        <a-form-item field="areacode" label="地区码">
          <a-select v-model="form.areacode" placeholder="请选择地区码" allow-clear>
            <a-option value="86">
              +86 中国大陆
            </a-option>
            <a-option value="852">
              +852 中国香港
            </a-option>
            <a-option value="853">
              +853 中国澳门
            </a-option>
            <a-option value="886">
              +886 中国台湾
            </a-option>
            <a-option value="1">
              +1 美国/加拿大
            </a-option>
          </a-select>
        </a-form-item>

        <!-- 账号 -->
        <a-form-item field="account" label="账号/手机号">
          <a-input v-model="form.account" placeholder="please enter your username..." />
        </a-form-item>

        <!-- 密码 -->
        <a-form-item field="passwd" label="密码">
          <a-input v-model="form.passwd" type="password" placeholder="please enter your password..." />
        </a-form-item>

        <!-- 登录按钮 -->
        <a-form-item>
          <a-button mxa @click="submit">
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </a-space>
  </div>
</template>
