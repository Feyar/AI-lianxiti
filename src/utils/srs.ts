/** 艾宾豪斯遗忘曲线间隔（天）：错 1 次 → 1 天后复习，逐步拉长 */
const INTERVALS_DAYS = [1, 2, 4, 7, 15, 30]

const DAY_MS = 24 * 60 * 60 * 1000

/** 根据"累计错次"算下一次复习间隔（毫秒） */
export function nextReviewAt(wrongCount: number, from = Date.now()): number {
  const idx = Math.max(0, Math.min(wrongCount - 1, INTERVALS_DAYS.length - 1))
  return from + INTERVALS_DAYS[idx] * DAY_MS
}

/** 距下次复习还剩多少毫秒（负值=已到期该复习） */
export function timeUntilReview(nextReviewAt: number, from = Date.now()): number {
  return nextReviewAt - from
}

/** 友好显示"还有多久/已过期多久" */
export function formatRemain(ms: number): string {
  const abs = Math.abs(ms)
  const day = Math.floor(abs / DAY_MS)
  const hour = Math.floor((abs % DAY_MS) / (60 * 60 * 1000))
  if (day > 0) return (ms < 0 ? '已过期 ' : '剩 ') + `${day} 天${hour} 时`
  if (hour > 0) return (ms < 0 ? '已过期 ' : '剩 ') + `${hour} 时`
  const min = Math.floor(abs / 60000)
  return (ms < 0 ? '已过期 ' : '剩 ') + `${Math.max(1, min)} 分`
}
