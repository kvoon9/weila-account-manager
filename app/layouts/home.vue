<script setup lang="ts">
defineOptions({ name: 'HomeLayout' })

const router = useRouter()

function logout() {
  localStorage.clear()
  window.location.reload()
}
</script>

<template>
  <div h-full grid="~ rows-[min-content_1fr]">
    <div flex p4 items-center border="b base" bg-white>
      <div flex items-center gap-3>
        <div font-semibold text-xl text-gray-8>
          Vois Chat
        </div>
      </div>
      <div flex-1 />
      <a-dropdown trigger="click">
        <template #content>
          <a-doption @click="logout">
            <template #icon>
              <div i-carbon-logout />
            </template>
            登出
          </a-doption>
        </template>

        <NuxtImg
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face&q=80"
          cursor-pointer
          hover:op75
          w8 h8
          rounded-full
          object-cover
          alt="User Avatar"
        />
      </a-dropdown>
    </div>
    <div flex of-y-auto>
      <Sidebar />
      <div grow-1 border="l base" grid="~ rows-[min-content_1fr]">
        <a-page-header
          v-if="router.currentRoute.value.name"
          border="b base"
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
