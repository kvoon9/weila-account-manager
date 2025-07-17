<script setup lang="ts">
definePageMeta({
  name: 'Top 10 群',
  layout: 'home',
})

interface Group {
  group_id: string
  group_number: string
  group_name: string
  seq: string
}

const columns = {
  seq: '序号',
  group_number: '群号',
  group_name: '群名称',
}

const { data } = useWeilaFetch<Group[]>('/operator/group/get-top-groups')
$inspect(data)
</script>

<template>
  <div>
    <TheTable :columns :data="data?.sort((a, b) => Number(a.seq) - Number(b.seq))" />
  </div>
</template>
