import { WeilaApi } from '@weila/network'

export function useWeilaApi() {
  const weilaApi = useState('weilaApi', () => new WeilaApi({
    baseURL: 'v1',
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
