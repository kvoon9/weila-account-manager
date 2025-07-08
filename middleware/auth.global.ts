export default defineNuxtRouteMiddleware((to) => {
  const { access_token } = useAuthStore()

  if (access_token || to.meta.public) {
    // empty
  }
  else {
    return navigateTo('/login', { replace: true })
  }
})
