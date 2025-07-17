export default defineNuxtRouteMiddleware((to) => {
  if (localStorage.getItem('token') || to.meta.public) {
    // empty
  }
  else {
    return navigateTo('/login', { replace: true })
  }
})
