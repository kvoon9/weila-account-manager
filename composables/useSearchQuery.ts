export function useSearchQuery(key = 'search') {
  return useState(key, () => useRouteQuery(key, ''))
}
