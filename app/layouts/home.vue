<script setup lang="ts">
const router = useRouter()

function logout() {
  localStorage.clear()
  window.location.reload()
}
</script>

<template>
  <div h-full grid="~ rows-[min-content_1fr]">
    <div flex p4 items-center border="b base">
      <div font-semibold text-2xl>
        Vois Chat
      </div>
      <div flex-1 />
      <a-button type="text" @click="logout">
        登出
      </a-button>
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
