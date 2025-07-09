<script setup lang="ts">
import { utils, writeFileXLSX } from 'xlsx'

definePageMeta({
  layout: 'home',
  name: '设备导出',
  alias: ['/'],
})
const dateScope = shallowRef('0')

const input = shallowRef('')
$inspect(dateScope)

const pres = ref([
  { name: 'kwongliegaai', age: 18 },
  { name: 'Guoodli', age: 19 },
])

/* get state data and export to XLSX */
function exportFile() {
  /* generate worksheet from state */
  const ws = utils.json_to_sheet(pres.value)
  /* create workbook and append worksheet */
  const wb = utils.book_new()
  utils.book_append_sheet(wb, ws, 'Data')
  /* export to XLSX */
  writeFileXLSX(wb, `weila-devices-${Date.now()}.xlsx`)
}

const list = Array.from({ length: 10 })
const currentPage = shallowRef(1)
</script>

<template>
  <div h-full flex="~ col" gap2>
    <teleport to="#home-header-extra">
      <a-button @click="exportFile">
        导出为 Excel
      </a-button>
    </teleport>
    <div flex gap2>
      <a-input v-model="input" style="width: 300px" placeholder="手机号" />
      <a-button type="primary">
        搜索
      </a-button>
    </div>
    <div p4 bg-neutral-200:50 rounded>
      <span>
        到期时间
      </span>
      <a-radio-group v-model="dateScope" type="button">
        <a-radio value="0">
          本月
        </a-radio>
        <a-radio value="1">
          下个月
        </a-radio>
        <a-radio value="2">
          两个月
        </a-radio>
        <a-radio value="3">
          三个月
        </a-radio>
      </a-radio-group>
    </div>
    <section flex-1 of-y-auto>
      <a-list>
        <a-list-item v-for="i, idx in list" :key="idx">
          <a-list-item-meta
            title="Beijing Bytedance Technology Co., Ltd."
            description="Beijing ByteDance Technology Co., Ltd. is an enterprise located in China."
          >
            <template #avatar>
              <a-avatar shape="square">
                <img
                  alt="avatar"
                  src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                >
              </a-avatar>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </section>
    <a-pagination mxa v-model="currentPage" :total="list.length" show-total/>
  </div>
</template>
