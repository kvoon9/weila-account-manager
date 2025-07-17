<script setup lang="ts">
definePageMeta({
  name: '群信息查询',
  layout: 'home',
})

const api = useWeilaApi()

interface Group {
  group_id: string
  group_name: string
  owner_id: string
  user_limit: string
  user_count: string
  group_number: string
  avatar: string
  created: string
}
interface InactiveMemberCount {

  count: number
  user_ids: string[]
}

const group = shallowRef<Group | undefined>()
const inactiveActiveMemberCount = shallowRef<InactiveMemberCount | undefined>({
  count: 16,
  user_ids: [
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '39',
    '40',
    '46',
    '47',
    '48',
    '49',
    '50',
  ],
})

const groupNumber = useSearchQuery()

async function onSearch() {
  group.value = await api.value.v1.fetch<Group>('/operator/group/get-group-info', {
    body: {
      group_number: groupNumber.value,
    },
  })
  getInactiveMemberCount()
}

async function getInactiveMemberCount() {
  inactiveActiveMemberCount.value = await api.value.v1.fetch<InactiveMemberCount>('/operator/group/get-inactive-member-count', {
    body: {
      group_number: groupNumber.value,
    },
  })
}
</script>

<template>
  <div space-y-6>
    <SearchInput placeholder="群号" @search="onSearch" />

    <a-empty v-if="!group" />
    <div v-else class="space-y-6">
      <div flex gap8>
        <NuxtImg size-55 rounded-lg :src="group.avatar" />

        <div flex-1 space-y-2>
          <h2 flex itemsc-etne>
            <span text-xl font-semibold>
              {{ group.group_name }}
            </span>
            <a-tag mx2>
              {{ group.group_number }}
            </a-tag>
          </h2>

          <div class="grid grid-cols-2 gap-6">
            <div class="p-3 bg-neutral-50 rounded-lg">
              <p class="text-sm text-neutral-500 mb-1">
                群主ID
              </p>
              <p class="font-medium text-lg">
                {{ group.owner_id }}
              </p>
            </div>
            <div class="p-3 bg-neutral-50 rounded-lg">
              <p class="text-sm text-neutral-500 mb-1">
                成员数
              </p>
              <p class="font-medium text-lg">
                <span class="text-blue-600">{{ group.user_count }}</span> / {{ group.user_limit }}
              </p>
            </div>
            <div v-if="inactiveActiveMemberCount" class="p-3 bg-neutral-50 rounded-lg">
              <p class="text-sm text-neutral-500 mb-1">
                不活跃成员
              </p>
              <p class="font-medium text-lg">
                <span class="text-orange">{{ inactiveActiveMemberCount.count }}</span> / {{ group.user_limit }}
              </p>
            </div>
            <div class="p-3 bg-neutral-50 rounded-lg">
              <p class="text-sm text-neutral-500 mb-1">
                创建时间
              </p>
              <p class="font-medium text-lg">
                {{ new Date(Number(group.created) * 1000).toLocaleDateString() }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="inactiveActiveMemberCount">
        <div class="flex items-center gap2 mb-4">
          <h3 class="">
            不活跃成员 ID
          </h3>
          <div class="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm font-medium">
            {{ inactiveActiveMemberCount.count }} 位
          </div>
        </div>

        <div v-if="inactiveActiveMemberCount.user_ids.length">
          <a-tag v-for="userId in inactiveActiveMemberCount.user_ids" :key="userId" mx2>
            {{ userId }}
          </a-tag>
        </div>
        <a-empty v-else />
      </div>
    </div>
  </div>
</template>
