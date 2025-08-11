<script setup lang="ts">
import md5 from 'md5'

const api = useWeilaApi()

definePageMeta({
  public: true,
  layout: 'welcome',
})

const form = reactive<{
  account: string
  passwd: string
  areacode: string | undefined
}>({
  // account: '10000002',
  // passwd: '123456',

  account: '',
  passwd: '',
  areacode: undefined, // 默认不选中
})

function submit() {
  api.value.v2.fetch(`opt/auth/login`, {
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
  <div h-full flex="~ items-center justify-center" bg-gray-50>
    <div bg-white rounded-xl shadow-lg p8 w-full max-w-md mx4>
      <div text-center mb8>
        <h1 text-3xl font-bold text-gray-800 mb2>
          欢迎登录
        </h1>
        <p text-gray-500>
          请输入您的账号信息
        </p>
      </div>

      <a-form :model="form" layout="vertical" size="large">
        <!-- 地区码 -->
        <a-form-item field="areacode" label="地区码" mb4>
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
        <a-form-item field="account" label="账号 / 手机号" mb4>
          <a-input v-model="form.account" placeholder="请输入您的账号或手机号" />
        </a-form-item>

        <!-- 密码 -->
        <a-form-item field="passwd" label="密码" mb6>
          <a-input v-model="form.passwd" type="password" placeholder="请输入密码" />
        </a-form-item>

        <!-- 登录按钮 -->
        <a-form-item mb0>
          <a-button
            type="primary"
            long
            size="large"
            :style="{ height: '48px', fontSize: '16px' }"
            @click="submit"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
