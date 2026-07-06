import type { Question } from '@/types'

/** 标准化：去空格、标点、转小写，用于填空题宽松匹配 */
function norm(s: string): string {
  return (s ?? '')
    .toLowerCase()
    .replace(/[\s，,。.、；;：:（）()「」""''']/g, '')
}

export interface FillDetail {
  ok: boolean
  expect: string
  got: string
}

/** 选择题判分：直接比对字母 */
export function gradeChoice(userKey: string, q: Question): boolean {
  return !!q.answer && userKey === q.answer
}

/**
 * 填空题判分：标准化后严格相等。
 * 多空时每空独立判，全对才算对。返回每空详情供 UI 高亮。
 */
export function gradeFill(userInputs: string[], q: Question): {
  correct: boolean
  detail: FillDetail[]
} {
  const blanks = q.blanks ?? []
  if (blanks.length === 0) return { correct: false, detail: [] }
  const detail = blanks.map((expect, i) => {
    const got = (userInputs[i] ?? '').trim()
    const ok = norm(got) !== '' && norm(got) === norm(expect)
    return { ok, expect, got }
  })
  return { correct: detail.every((d) => d.ok), detail }
}

export type SelfRating = 'ok' | 'partial' | 'no'

export function ratingToCorrect(r?: SelfRating): boolean {
  return r === 'ok'
}
