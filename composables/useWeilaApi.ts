import { WeilaApi } from '@weila/network'

export function useWeilaApi() {
  const { start, finish } = useLoadingIndicator()
  const weilaApi = useState('weilaApi', () => new WeilaApi(
    '102036',
    'b3c658bd2e637c65efb134fb381d4a18',
    {
      baseURL: 'v2',
      onStart() {
        start()
      },
      onDone() {
        finish()
      },
      onError(error: any) {
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
      },
      onAuthError() {
        localStorage.setItem('token', '')
        navigateTo('/login')
      },
    },
  ))

  return weilaApi
}
