import { WeilaApi } from '@weila/network'

export function useWeilaApi() {
  const { start, finish } = useLoadingIndicator()
  const weilaApi = useState('weilaApi', () => new WeilaApi(
    '102036',
    'b3c658bd2e637c65efb134fb381d4a18',
    { baseURL: 'v2' },
  ))

  weilaApi.value.hook('request:start', () => {
    start()
  })

  weilaApi.value.hook('done', () => {
    finish()
  })

  function onError(error: any) {
    console.error('error', error)
    if (error instanceof Error) {
      Message.error(error.message)
    }
    else {
      const { errcode, errmsg } = error
      if (errcode !== undefined && errmsg !== undefined) {
        Message.error(`${errcode}: ${errmsg}`)
      }
      else {
        console.error(error)
      }
    }
  }

  weilaApi.value.hook('request:error', onError)
  weilaApi.value.hook('response:error', onError)
  weilaApi.value.hook('success', (data) => {
    const isDebug = false
    if (isDebug)
      // eslint-disable-next-line no-console
      console.log('data', data)
  })
  weilaApi.value.hook('auth:error', () => {
    localStorage.setItem('token', '')
    navigateTo('/login')
  })

  return weilaApi
}
