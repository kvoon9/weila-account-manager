import { WeilaApi } from '@weila/network'

export function useWeilaApi() {
  const { start, finish } = useLoadingIndicator()
  const weilaApi = useState('weilaApi', () => new WeilaApi({
    baseURL: 'v1',
    enableRequest: false,
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
