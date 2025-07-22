export interface Legal {
  id: number
  org_num: number
  category: 0 | 1 // 0 corp  1 personal
  name: string

  identify: string

  business_license?: string

  // 身份证
  identify_card_front?: string
  identify_card_reverse?: string

  state: number
  updated: string // 2025-07-15 15:28:52
  reason?: string
}

// export interface CheckedLegal extends Legal {
//   reason: string
// }
