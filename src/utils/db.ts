import Dexie, { type Table } from 'dexie'
import type { Attempt, WrongItem } from '@/types'

class QuizDB extends Dexie {
  attempts!: Table<Attempt, number>
  wrong!: Table<WrongItem, string>

  constructor() {
    super('quiz-app')
    // v1: 初始 schema
    this.version(1).stores({
      attempts: '++id, questionId, day, category, at, correct, mode, type',
      wrong: 'questionId, day, category, nextReviewAt, resolved, lastWrongAt'
    })
    // v2: 加同步字段索引（clientId 幂等键、syncedAt 推送追踪）
    this.version(2).stores({
      attempts: '++id, questionId, day, category, at, correct, mode, type, clientId, syncedAt',
      wrong: 'questionId, day, category, nextReviewAt, resolved, lastWrongAt'
    })
  }
}

export const db = new QuizDB()

/** 清空所有数据（设置页用） */
export async function clearAllData() {
  await Promise.all([db.attempts.clear(), db.wrong.clear()])
}
