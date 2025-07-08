<script setup lang="ts">
definePageMeta({
  public: true,
})

const router = useRouter()
const form = reactive({
  user_name: '10000002',
  password: '123456',
})

const { login } = useAuthStore()

function submit() {
  login(form)
    .then(() => {
      router.push('/org/list')
      Message.info('登录成功')
    })
    .catch(() => {
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
          <a-button @click="submit">
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </a-space>
  </div>
</template>
