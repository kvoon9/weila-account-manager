import process from 'node:process'
import { computed, shallowRef } from 'vue'

export const AMapKeys = {
  js: '590d2eef2313b156f80a2936df9babad',
  secert: 'cdc03a7b9de2a9ca188da9ab76c4b450',
  regeo: '',
}

export const ENCRYPTION_KEY = 'weila-frontend-key' // Replace with a secure encryption key

export const headers = {
  'Access-Control-Allow-Origin': '*',
}

export const isMocking = shallowRef(false)

export const isDev = computed(() => process.env.NODE_ENV === 'development')

export const trackOptions = shallowRef([
  { value: 0, label: '关闭' },
  { value: 1, label: '高' },
  { value: 2, label: '中' },
  { value: 3, label: '低' },
])
