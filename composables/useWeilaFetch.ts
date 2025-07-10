import type { AsyncDataOptions } from '#app'
import { isFunction } from '@antfu/utils'

export function useWeilaFetch<T>(
  url: string,
  options?: AsyncDataOptions<T> & {
    body?: MaybeRefOrGetter<object>
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

  if (body && (isRef(body) || isFunction(body))) {
    watch(body, () => {
      const { refresh } = res

      refresh()
    }, { deep: true })
  }

  return res
}
