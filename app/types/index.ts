export interface Legal {
  id: number
  org_num: number
  category: number
  name: string
  identify: string
  identify_card_front: string
  identify_card_reverse: string
  state: number
  updated: string // 2025-07-15 15:28:52
}

export interface CheckedLegal extends Legal {
  reason: string
}
