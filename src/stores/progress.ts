import { defineStore } from 'pinia'
import { db } from '@/utils/db'
import { pushAttempts } from '@/utils/sync'
import { nextReviewAt } from '@/utils/srs'
import { allQuestions } from '@/utils/quiz-loader'
import { computeAnalytics, type Analytics } from '@/utils/analytics'
import type { Attempt, Question, WrongItem } from '@/types'

export const useProgressStore = defineStore('progress', () => {
  /** 记一次作答，并同步更新错题本 */
  async function recordAttempt(a: Omit<Attempt, 'id'>) {
    const clientId = crypto.randomUUID()
    await db.attempts.add({ ...a, clientId } as Attempt)
    if (!a.correct) await addOrUpdateWrong(a)
    else if (a.mode === 'wrong') await markWrongResolved(a.questionId, a.at)
    // 异步推送云端，不阻塞答题；失败静默（下次启动 syncAll 补救）
    void pushAttempts().catch(() => {})
  }

  async function addOrUpdateWrong(a: Omit<Attempt, 'id'>) {
    const exist = await db.wrong.get(a.questionId)
    if (exist) {
      const newCount = exist.wrongCount + 1
      await db.wrong.update(a.questionId, {
        wrongCount: newCount,
        lastWrongAt: a.at,
        nextReviewAt: nextReviewAt(newCount, a.at),
        resolved: false
      })
    } else {
      await db.wrong.put({
        questionId: a.questionId,
        day: a.day, category: a.category, type: a.type,
        wrongCount: 1, lastWrongAt: a.at, nextReviewAt: nextReviewAt(1, a.at)
      })
    }
  }

  async function markWrongResolved(qid: string, at: number) {
    const exist = await db.wrong.get(qid)
    if (!exist || exist.resolved) return
    await db.wrong.update(qid, { resolved: true, nextReviewAt: at })
  }

  async function forgetWrong(qid: string) {
    await db.wrong.delete(qid)
  }

  /** 已到期、该复习的错题 */
  async function getDueWrong(): Promise<WrongItem[]> {
    const now = Date.now()
    const items = await db.wrong.where('nextReviewAt').belowOrEqual(now).toArray()
    return items.filter((w) => !w.resolved)
  }

  /** 全部未解决错题（按到期时间排序） */
  async function getAllWrong(): Promise<WrongItem[]> {
    const items = await db.wrong.toArray()
    return items.filter((w) => !w.resolved).sort((a, b) => a.nextReviewAt - b.nextReviewAt)
  }

  async function getWrongCount(): Promise<number> {
    return (await getAllWrong()).length
  }

  function wrongToQuestions(items: WrongItem[]): Question[] {
    const m = new Map(allQuestions.map((q) => [q.id, q]))
    return items.map((i) => m.get(i.questionId)).filter(Boolean) as Question[]
  }

  // ---------- 统计 ----------
  async function getStats() {
    const all = await db.attempts.toArray()
    const total = all.length
    const correct = all.filter((a) => a.correct).length
    const unresolvedWrong = (await db.wrong.toArray()).filter((w) => !w.resolved).length

    const byCat = new Map<string, { total: number; correct: number }>()
    const byDay = new Map<number, { total: number; correct: number }>()
    for (const a of all) {
      const c = byCat.get(a.category) ?? { total: 0, correct: 0 }
      c.total++; if (a.correct) c.correct++; byCat.set(a.category, c)
      const d = byDay.get(a.day) ?? { total: 0, correct: 0 }
      d.total++; if (a.correct) d.correct++; byDay.set(a.day, d)
    }

    // 最近 7 天题量
    const DAY = 86_400_000
    const now = Date.now()
    const recent7: { key: string; total: number; correct: number }[] = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now - i * DAY)
      recent7.push({ key: `${d.getMonth() + 1}/${d.getDate()}`, total: 0, correct: 0 })
    }
    const today = new Date(now)
    for (const a of all) {
      const d = new Date(a.at)
      const key = `${d.getMonth() + 1}/${d.getDate()}`
      const diff = Math.floor((new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()
        - new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()) / DAY)
      if (diff >= 0 && diff < 7) {
        const slot = recent7[6 - diff]
        if (slot.key === key) { slot.total++; if (a.correct) slot.correct++ }
      }
    }

    return {
      total, correct, accuracy: total ? correct / total : 0, unresolvedWrong,
      byCategory: [...byCat.entries()]
        .map(([name, v]) => ({ name, ...v, accuracy: v.total ? v.correct / v.total : 0 }))
        .sort((a, b) => a.accuracy - b.accuracy),
      byDay: [...byDay.entries()]
        .sort((a, b) => a[0] - b[0])
        .map(([day, v]) => ({ day, ...v, accuracy: v.total ? v.correct / v.total : 0 })),
      recent7
    }
  }

  // ---------- Analytics ----------
  async function getAnalytics(): Promise<Analytics> {
    const attempts = await db.attempts.toArray()
    const wrongItems = await db.wrong.toArray()
    return computeAnalytics(allQuestions, attempts, wrongItems)
  }

  return {
    recordAttempt, forgetWrong, getDueWrong, getAllWrong, getWrongCount, wrongToQuestions, getStats, getAnalytics
  }
})
