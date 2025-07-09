export default defineNuxtRouteMiddleware((to) => {
  if (weilaApi.token.value || to.meta.public) {
    // empty
  }
  else {
    return navigateTo('/login', { replace: true })
  }
})
