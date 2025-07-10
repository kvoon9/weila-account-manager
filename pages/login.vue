<script setup lang="ts">
import md5 from 'md5'

definePageMeta({
  public: true,
  layout: 'welcome',
})

const form = reactive({
  user_name: '10000002',
  password: '123456',
})

function submit() {
  const { user_name, password } = form
  useWeilaApi().value.login('sessions/login', {
    user_name,
    password: md5(password),
  }).then(() => {
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
        <a-form-item field="name" label="账号/手机号">
          <a-input v-model="form.user_name" placeholder="please enter your username..." />
        </a-form-item>
        <a-form-item field="password" label="密码">
          <a-input v-model="form.password" type="password" placeholder="please enter your password..." />
        </a-form-item>
        <a-form-item>
          <a-button mxa @click="submit">
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </a-space>
  </div>
</template>
