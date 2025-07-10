import type { AsyncDataOptions } from '#app'
import { isFunction } from '@antfu/utils'

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
    () => weilaApi.value.v1.fetch(url, {
      body: toValue(body),
    }),
    options,
  )

  const { refresh } = res

  if (body && (isRef(body) || isFunction(body))) {
    watch(body, () => {
      refresh()
    }, { deep: true })
  }

  return res
}
