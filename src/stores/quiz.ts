import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { allQuestions } from '@/utils/quiz-loader'
import { useProgressStore } from './progress'
import type { Question } from '@/types'

export type Mode = 'today' | 'random' | 'wrong' | 'browse' | 'day' | 'category' | 'interview' | 'cram' | 'recommended' | 'flashcard'

export interface SessionResult {
  questionId: string
  userAnswer: string        // choice: key；fill: JSON.stringify(inputs)；short: 自评关键词摘要
  correct: boolean
  detail?: unknown          // fill 的每空详情
  selfRating?: 'ok' | 'partial' | 'no'
  at: number
}

export interface Session {
  mode: Mode
  title: string
  questions: Question[]
  index: number
  results: SessionResult[]
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const useQuizStore = defineStore('quiz', () => {
  const questions = ref<Question[]>(allQuestions)

  const byDay = computed(() => {
    const m = new Map<number, Question[]>()
    for (const q of questions.value) {
      if (!m.has(q.day)) m.set(q.day, [])
      m.get(q.day)!.push(q)
    }
    return [...m.entries()].sort((a, b) => a[0] - b[0])
  })

  const days = computed(() => byDay.value.map(([d]) => d))
  const categories = computed(() => [...new Set(questions.value.map((q) => q.category))])

  function pick(pool: Question[], n: number, exclude = new Set<string>()): Question[] {
    return shuffle(pool.filter((q) => !exclude.has(q.id))).slice(0, n)
  }

  /** 今日练习：选择 6 + 填空 5 + 简答 4（共 15），可排除上次抽过的 */
  function buildToday(exclude?: Set<string>): Question[] {
    const ex = exclude ?? new Set<string>()
    const c = pick(questions.value.filter((q) => q.type === 'choice'), 6, ex)
    const f = pick(questions.value.filter((q) => q.type === 'fill'), 5, ex)
    const s = pick(questions.value.filter((q) => q.type === 'short'), 4, ex)
    return [...c, ...f, ...s]
  }

  function buildRandom(n = 15): Question[] {
    return shuffle(questions.value).slice(0, n)
  }

  function buildByDay(day: number): Question[] {
    return questions.value
      .filter((q) => q.day === day)
      .sort((a, b) => a.seq - b.seq)
  }

  function buildByCategory(cat: string): Question[] {
    return questions.value.filter((q) => q.category === cat)
  }

  function buildByIds(ids: string[]): Question[] {
    const m = new Map(questions.value.map((q) => [q.id, q]))
    return ids.map((id) => m.get(id)).filter(Boolean) as Question[]
  }

  /** 模拟面试：优先简答 + 覆盖不同 category */
  function buildInterview(): Question[] {
    const shorts = questions.value.filter((q) => q.type === 'short')
    const others = questions.value.filter((q) => q.type !== 'short')
    // 按 category 分散抽题
    const catSet = new Set(questions.value.map((q) => q.category))
    const pickedShorts: Question[] = []
    const pickedOthers: Question[] = []
    const usedCats = new Set<string>()
    // 先每个 category 抽一道简答
    for (const q of shuffle(shorts)) {
      if (pickedShorts.length >= 8) break
      if (!usedCats.has(q.category)) {
        pickedShorts.push(q)
        usedCats.add(q.category)
      }
    }
    // 再补到 8 道
    for (const q of shuffle(shorts)) {
      if (pickedShorts.length >= 8) break
      if (!pickedShorts.find((p) => p.id === q.id)) pickedShorts.push(q)
    }
    // 抽 3 道非简答热身（也分散 category）
    for (const q of shuffle(others)) {
      if (pickedOthers.length >= 3) break
      if (!usedCats.has(q.category)) {
        pickedOthers.push(q)
        usedCats.add(q.category)
      }
    }
    for (const q of shuffle(others)) {
      if (pickedOthers.length >= 3) break
      if (!pickedOthers.find((p) => p.id === q.id)) pickedOthers.push(q)
    }
    return [...shuffle(pickedOthers), ...shuffle(pickedShorts)]
  }

  /** 考前冲刺：错题 + 薄弱知识点 + 未练题 */
  function buildCram(ids?: string[]): Question[] {
    if (ids && ids.length > 0) return buildByIds(ids)
    const all = new Map(questions.value.map((q) => [q.id, q]))
    const result: Question[] = []
    const used = new Set<string>()
    // 1. 未解决错题（优先）
    const wrongIds = ids ?? []
    for (const id of wrongIds) {
      const q = all.get(id)
      if (q && !used.has(id)) { result.push(q); used.add(id) }
    }
    // 2. 未练过的题补齐到 20-30
    if (result.length < 30) {
      for (const q of shuffle(questions.value)) {
        if (result.length >= 25) break
        if (!used.has(q.id)) { result.push(q); used.add(q.id) }
      }
    }
    return result.length > 0 ? result : shuffle(questions.value).slice(0, 20)
  }

  function getQuestionById(id: string): Question | undefined {
    return questions.value.find((q) => q.id === id)
  }

  // ---------- 会话 ----------
  const session = ref<Session | null>(null)

  function startSession(mode: Mode, title: string, qs: Question[]): boolean {
    if (qs.length === 0) return false
    const sequential = mode === 'browse' || mode === 'day'
    const ordered = sequential ? qs : shuffle(qs)
    session.value = { mode, title, questions: ordered, index: 0, results: [] }
    return true
  }

  function endSession() {
    session.value = null
  }

  function next() {
    if (session.value && session.value.index < session.value.questions.length - 1) session.value.index++
  }
  function prev() {
    if (session.value && session.value.index > 0) session.value.index--
  }
  function goto(i: number) {
    if (session.value && i >= 0 && i < session.value.questions.length) session.value.index = i
  }

  async function recordResult(r: Omit<SessionResult, 'at'>) {
    if (!session.value) return
    const full: SessionResult = { ...r, at: Date.now() }
    const i = session.value.results.findIndex((x) => x.questionId === r.questionId)
    if (i >= 0) session.value.results[i] = full
    else session.value.results.push(full)
    const q = getQuestionById(r.questionId)
    if (q) {
      await useProgressStore().recordAttempt({
        questionId: q.id, day: q.day, category: q.category, type: q.type,
        userAnswer: r.userAnswer, correct: r.correct,
        selfRating: r.selfRating, at: full.at, mode: session.value.mode
      })
    }
  }

  function resultOf(qid: string): SessionResult | undefined {
    return session.value?.results.find((r) => r.questionId === qid)
  }

  return {
    questions, byDay, days, categories,
    buildToday, buildRandom, buildByDay, buildByCategory, buildByIds, buildInterview, buildCram, getQuestionById,
    session, startSession, endSession, next, prev, goto, recordResult, resultOf
  }
})
