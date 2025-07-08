<script setup lang="ts">
const { logout } = useAuthStore()
const router = useRouter()

const routeList = router.getRoutes().filter((i: any) => i?.meta)

function goTo(path: string) {
  router.push(path)
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
        :default-open-keys="['0']"
        :default-selected-keys="['0_1']"
        show-collapse-button
        @menu-item-click="goTo"
      >
        <a-menu-item v-for="{ name, path } in routeList" :key="path">
          {{ name }}
        </a-menu-item>
      </a-menu>
      <div p4 grow-1 border-l>
        <slot />
      </div>
    </div>
  </div>
</template>
