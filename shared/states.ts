export const timestamp = useTimestamp({ offset: 0 })
export const et = computed(() => Math.floor(timestamp.value / 999))
