export function $inspect(...args: MaybeRef<any>[]) {
  watchEffect(() => {
    // eslint-disable-next-line no-console
    console.log(...args.map(i => i?.value))
  })
}
