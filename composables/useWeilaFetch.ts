import type { AsyncDataOptions } from '#app'
import { isFunction, isObject } from '@antfu/utils'

interface Options<T> extends AsyncDataOptions<T> {
  enabled?: MaybeRefOrGetter<boolean>
}

export function useWeilaFetch<T>(url: string, getBody: () => object, options?: Options<T>) {
  let { enabled = true, immediate = true } = options || {}

  if (options?.immediate === undefined
    && options?.enabled !== undefined
  ) {
    const value = isFunction(enabled)
      ? enabled()
      : unref(enabled)

    immediate = value !== null && value !== undefined
  }

  const res = useAsyncData(
    url,
    async () => await $v1(url, {
      body: getBody(),
    }).then((i) => {
      if (!(isObject(i)))
        return i

      const keys = Object.keys(i)
      if (keys.length === 1)
        // @ts-expect-error type error
        return i[keys[0]!]
      else
        return i
    }),
    {
      ...options,
      immediate,
    },
  )

  const { refresh } = res

  // refresh watch enabled true
  if (options?.enabled !== undefined
    && typeof options.enabled !== 'boolean'
  ) {
    watchOnce(options.enabled, () => refresh())
  }

  return res
}

export async function weilaRequest<T>(...args: Parameters<typeof $v1>): Promise<T> {
  return await $v1(...args).then((i) => {
    if (!(isObject(i)))
      return i

    const keys = Object.keys(i)
    if (keys.length === 1)
    // @ts-expect-error type error
      return i[keys[0]!]
    else
      return i
  })
}
