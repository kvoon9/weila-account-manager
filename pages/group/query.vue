<script setup lang="ts">
definePageMeta({
  name: '群信息查询',
  layout: 'home',
})

const input = ref('')
const loading = ref(false)

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

const group = shallowRef<Group | undefined>(undefined)
const inactiveActiveMemberCount = shallowRef<InactiveMemberCount | undefined>(undefined)

$inspect(group, inactiveActiveMemberCount)

async function getGroupInfo() {
  group.value = await weilaRequest<Group>('/operator/group/get-group-info', {
    body: {
      group_number: input.value,
    },
  })
  getInactiveMemberCount()
}

async function getInactiveMemberCount() {
  inactiveActiveMemberCount.value = await weilaRequest<InactiveMemberCount>('/operator/group/get-inactive-member-count', {
    body: {
      group_number: input.value,
    },
  })
}
</script>

<template>
  <div>
    <!-- 搜索区域 -->
    <div class="flex flex-col gap-4 mb-8 max-w-xl">
      <div class="flex gap-3">
        <a-input
          v-model="input"
          placeholder="请输入群号或群名称"
          allow-clear
          class="flex-1"
          size="large"
          @press-enter="getGroupInfo"
        />
        <a-button
          type="primary"
          :loading="loading"
          size="large"
          @click="() => getGroupInfo()"
        >
          查询
        </a-button>
      </div>
      <p class="text-gray-500 text-sm">
        输入群号或群名称以查询详细信息
      </p>
    </div>

    <!-- 结果展示 -->
    <div v-if="group" class="space-y-6">
      <!-- 群信息卡片 -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="flex flex-col md:flex-row">
          <!-- 群头像 -->
          <div class="md:w-1/3 p-4 flex justify-center">
            <a-avatar
              :image-url="group.avatar"
              :size="180"
              shape="square"
              class="border border-gray-200"
            />
          </div>

          <!-- 群信息 -->
          <div class="md:w-2/3 p-6">
            <h2 class="text-xl font-semibold mb-4">
              {{ group.group_name }}
            </h2>

            <div class="grid grid-cols-2 gap-6">
              <div class="p-3 bg-gray-50 rounded-lg">
                <p class="text-sm text-gray-500 mb-1">
                  群号
                </p>
                <p class="font-medium text-lg">
                  {{ group.group_number }}
                </p>
              </div>
              <div class="p-3 bg-gray-50 rounded-lg">
                <p class="text-sm text-gray-500 mb-1">
                  群主ID
                </p>
                <p class="font-medium text-lg">
                  {{ group.owner_id }}
                </p>
              </div>
              <div class="p-3 bg-gray-50 rounded-lg">
                <p class="text-sm text-gray-500 mb-1">
                  成员数
                </p>
                <p class="font-medium text-lg">
                  <span class="text-blue-600">{{ group.user_count }}</span> / {{ group.user_limit }}
                </p>
              </div>
              <div class="p-3 bg-gray-50 rounded-lg">
                <p class="text-sm text-gray-500 mb-1">
                  创建时间
                </p>
                <p class="font-medium text-lg">
                  {{ new Date(Number(group.created) * 1000).toLocaleDateString() }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部操作区域 -->
        <div class="border-t border-gray-100 p-4 bg-gray-50 flex justify-end">
          <a-button type="outline" class="mr-2">
            查看成员
          </a-button>
          <a-button type="primary">
            申请加入
          </a-button>
        </div>
      </div>

      <!-- 不活跃成员信息 -->
      <div v-if="inactiveActiveMemberCount" class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium">
            不活跃成员信息
          </h3>
          <div class="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm font-medium">
            {{ inactiveActiveMemberCount.count }} 位成员
          </div>
        </div>

        <div v-if="inactiveActiveMemberCount.user_ids.length" class="space-y-2">
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <div
              v-for="userId in inactiveActiveMemberCount.user_ids"
              :key="userId"
              class="p-2 bg-gray-50 rounded text-sm"
            >
              {{ userId }}
            </div>
          </div>
        </div>
        <div v-else class="text-gray-500 text-center py-4">
          暂无不活跃成员
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <a-empty v-else-if="!loading" description="输入群号或群名称查询群信息" />
  </div>
</template>
