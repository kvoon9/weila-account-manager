/* eslint-disable ts/ban-ts-comment */
// @ts-nocheck type inter too deep
export function useWeilaMutation<DataT = void>(
  ...args: Parameters<typeof useFetch<DataT>>
) {
  const weilaApi = useWeilaApi()
  const [url, options] = args

  return useFetch(
    url,
    {
      server: false,
      immediate: false,
      watch: false,
      lazy: true,
      ...options,
      // @ts-expect-error type error
      $fetch: weilaApi.value.v2.fetch,
    },
  )
}
