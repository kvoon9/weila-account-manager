<script setup lang="ts">
import type { RouteRecordNormalized } from '#vue-router'
import { ClientOnly } from '#components'

const router = useRouter()
const api = useWeilaApi()

interface Menu {
  [key: string]: {
    name: string
    submenu: RouteRecordNormalized[]
  }
}

const menu = ref<Menu>({
  user: { name: '用户管理', submenu: [] },
  group: { name: '群组管理', submenu: [] },
  device: { name: '设备管理', submenu: [] },
  service: { name: '服务号管理', submenu: [] },
  org: { name: '组织管理', submenu: [] },
  driver: { name: '司机管理', submenu: [] },
})

const routeList = router.getRoutes().filter((i: any) =>
  i?.meta?.layout === 'home'
  && !i.aliasOf,
)

const routeRootRE = /^\/([\w-]+)(\/[\w-]+)*\/?$/

for (const route of routeList) {
  const matches = route.path.match(routeRootRE)
  if (!matches)
    continue

  const rootKey = matches[1] as keyof Menu
  if (!rootKey)
    continue

  const menuItem = menu.value?.[rootKey]
  if (!menuItem)
    continue

  menuItem.submenu.push(route)
}

function goTo(path: string) {
  navigateTo(path)
}

function logout() {
  api.value.clear()
  window.location.reload()
}
</script>

<template>
  <div h-full grid="~ rows-[min-content_1fr]">
    <div flex p4 items-center border-b>
      <div font-semibold text-2xl>
        Vois Chat
      </div>
      <div flex-1 />
      <a-button type="text" @click="logout">
        登出
      </a-button>
    </div>
    <div flex of-y-auto>
      <a-menu
        :style="{ width: '200px', height: '100%' }"
        :default-selected-keys="[router.currentRoute.value.path]"
        show-collapse-button
        auto-open
        @menu-item-click="goTo"
      >
        <a-sub-menu v-for="{ name, submenu } in menu" :key="name">
          <template #title>
            {{ name }}
          </template>
          <a-menu-item v-for="i in submenu" :key="i.path">
            {{ i.name }}
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
      <div grow-1 border-l grid="~ rows-[min-content_1fr]">
        <a-page-header
          v-if="router.currentRoute.value.name"
          border-b
          :title="router.currentRoute.value.name.toString()"
          :show-back="false"
        >
          <template #extra>
            <div id="home-header-extra" />
          </template>
        </a-page-header>
        <section relative>
          <div px6 py4 inset-0 absolute>
            <!--
            -->
            <slot name="default" />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
