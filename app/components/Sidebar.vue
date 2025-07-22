<script setup lang="ts">
import type { RouteRecordNormalized } from '#vue-router'

const router = useRouter()

interface Menu {
  [key: string]: {
    name: string
    submenu: RouteRecordNormalized[]
  }
}

const menu = computed<Menu>(() => {
  const data: Menu = {
    user: { name: '用户管理', submenu: [] },
    group: { name: '群组管理', submenu: [] },
    device: { name: '设备管理', submenu: [] },
    service: { name: '服务号管理', submenu: [] },
    org: { name: '组织管理', submenu: [] },
    driver: { name: '司机管理', submenu: [] },
    corp: { name: '企业管理', submenu: [] },
  }

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

  return data
})

function goTo(path: string) {
  navigateTo(path)
}
</script>

<template>
  <a-menu
    :style="{ width: '200px', height: '100%' }"
    :default-selected-keys="[router.currentRoute.value.path]"
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
</template>
