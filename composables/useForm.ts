import type { BaseSchema } from 'valibot'
import { clearUndefined, objectEntries } from '@antfu/utils'
import * as v from 'valibot'
import { valibotArcoRules } from 'zod-arco-rules'

interface Form {
  [key: string]: any
}

export function useForm<T extends Form>(form: T) {
  type K = keyof T
  const _rules = {} as Record<K, T[K]['rule']>
  const _form = {} as Record<K, T[K]['value']>

  for (const [key, maybeValue] of objectEntries(form)) {
    const { value, rule } = normalizeValue(maybeValue)

    _rules[key] = rule
    _form[key] = value
  }

  return {
    ...valibotArcoRules(v.object(
      clearUndefined(_rules),
    )),
    form: reactive(_form),
  }
}

interface NormalizedFormValue {
  value: any
  rule?: BaseSchema<any, any, any>
}

// NOTE: value: any ---> { value: any, rule: undefined }
function normalizeValue(maybeValue: any) {
  const isValue = maybeValue?.value === undefined
  return (
    isValue
      ? { value: maybeValue, rule: undefined }
      : maybeValue
  ) as NormalizedFormValue
}
