import type { Attempt, WrongItem, Question } from '@/types'

export interface CategoryMastery {
  name: string
  total: number          // 该分类总题量
  practiced: number       // 已练题量
  correct: number         // 答对数
  accuracy: number        // 正确率 0-1
  wrongCount: number      // 未解决错题数
  coverage: number        // 覆盖率（已练/总题量）
  score: number           // 综合掌握度 0-100
}

export interface Analytics {
  categoryMastery: CategoryMastery[]
  weakCategories: CategoryMastery[]
  recommendedQuestionIds: string[]
}

/** 计算知识点掌握度和薄弱点分析 */
export function computeAnalytics(
  questions: Question[],
  attempts: Attempt[],
  wrongItems: WrongItem[]
): Analytics {
  // 按 category 聚合题目
  const qByCat = new Map<string, Question[]>()
  for (const q of questions) {
    const arr = qByCat.get(q.category) ?? []
    arr.push(q)
    qByCat.set(q.category, arr)
  }

  // 按 category 聚合作答
  const aByCat = new Map<string, { total: number; correct: number; qids: Set<string> }>()
  for (const a of attempts) {
    const c = aByCat.get(a.category) ?? { total: 0, correct: 0, qids: new Set<string>() }
    c.total++
    if (a.correct) c.correct++
    c.qids.add(a.questionId)
    aByCat.set(a.category, c)
  }

  // 未解决错题按 category
  const wByCat = new Map<string, Set<string>>()
  for (const w of wrongItems) {
    if (w.resolved) continue
    const s = wByCat.get(w.category) ?? new Set<string>()
    s.add(w.questionId)
    wByCat.set(w.category, s)
  }

  const DAY = 86_400_000
  const now = Date.now()
  // 最近 3 天做错的题（加权）
  const recentWrongIds = new Set<string>()
  for (const a of attempts) {
    if (!a.correct && (now - a.at) < 3 * DAY) recentWrongIds.add(a.questionId)
  }

  const categoryMastery: CategoryMastery[] = []

  for (const [name, qs] of qByCat) {
    const total = qs.length
    const stats = aByCat.get(name)
    const practiced = stats ? stats.qids.size : 0
    const correct = stats ? stats.correct : 0
    const accuracy = stats ? (stats.total ? correct / stats.total : 0) : 0
    const wrongSet = wByCat.get(name)
    const wrongCount = wrongSet ? wrongSet.size : 0
    const coverage = total > 0 ? practiced / total : 0

    // 综合掌握度公式：
    // 基础分 = 正确率 * 50 + 覆盖率 * 30 + (1 - 错题密度) * 20
    // 扣分：未解决错题多、最近做错
    const wrongDensity = total > 0 ? wrongCount / total : 0
    let score = accuracy * 50 + coverage * 30 + (1 - wrongDensity) * 20
    // 扣分：未解决错题
    score -= wrongCount * 3
    // 扣分：最近做错（该分类下）
    const recentWrongInCat = qs.filter((q) => recentWrongIds.has(q.id)).length
    score -= recentWrongInCat * 2
    score = Math.max(0, Math.min(100, score))

    categoryMastery.push({
      name, total, practiced, correct, accuracy, wrongCount, coverage, score
    })
  }

  // 排序：掌握度低的排前面
  categoryMastery.sort((a, b) => a.score - b.score)

  // 薄弱知识点：score < 60 或 wrongCount > 0 或 coverage < 0.5
  const weakCategories = categoryMastery.filter(
    (c) => c.score < 60 || c.wrongCount > 0 || c.coverage < 0.5
  )

  // 推荐练习题 ID：从薄弱分类中抽题
  const recommendedQuestionIds: string[] = []
  const usedIds = new Set<string>()
  // 优先错题
  for (const w of wrongItems) {
    if (w.resolved || usedIds.has(w.questionId)) continue
    recommendedQuestionIds.push(w.questionId)
    usedIds.add(w.questionId)
  }
  // 再从薄弱分类补题（未练过的）
  for (const c of weakCategories) {
    if (recommendedQuestionIds.length >= 30) break
    const qs = qByCat.get(c.name) ?? []
    for (const q of qs) {
      if (recommendedQuestionIds.length >= 30) break
      if (!usedIds.has(q.id) && c.coverage < 0.8) {
        recommendedQuestionIds.push(q.id)
        usedIds.add(q.id)
      }
    }
  }

  return { categoryMastery, weakCategories, recommendedQuestionIds }
}
