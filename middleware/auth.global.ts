export default defineNuxtRouteMiddleware((to) => {
  const weilaApi = useWeilaApi()
  if (weilaApi.value.token.value || to.meta.public) {
    // empty
  }
  else {
    return navigateTo('/login', { replace: true })
  }
})
