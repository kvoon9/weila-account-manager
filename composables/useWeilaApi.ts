import { WeilaApi } from '@weila/network'

// const app_id = '102036'
// const key = 'b3c658bd2e637c65efb134fb381d4a18'

export function useWeilaApi() {
  const { start, finish } = useLoadingIndicator()
  const weilaApi = useState('weilaApi', () => new WeilaApi({
    baseURL: 'v1',
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
    onLogout() {
      weilaApi.value.clear()
      navigateTo('/login')
    },
  }))

  return weilaApi
}
