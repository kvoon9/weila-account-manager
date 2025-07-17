import type { AsyncDataOptions } from '#app'

export function useWeilaFetch<T>(
  url: string,
  options?: AsyncDataOptions<T> & {
    body?: MaybeRefOrGetter<RequestInit['body'] | Record<string, any>>
  },
) {
  const { body } = options || {}

  const weilaApi = useWeilaApi()
  const res = useAsyncData(
    url,
    () => weilaApi.value.v2.fetch(url, {
      body: toValue(body),
    }),
    options,
  )

  return res
}

// const { refresh } = res

// if (body && (isRef(body) || isFunction(body))) {
//   watch(body, (value) => {
//     console.log('value', value)
//     // refresh()
//   }, { deep: true })
// }
