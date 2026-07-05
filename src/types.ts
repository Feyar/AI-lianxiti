export interface Option {
  key: string
  text: string
}

export type QType = 'choice' | 'fill' | 'short'

export interface Question {
  id: string
  day: number
  seq: number
  category: string
  type: QType
  stem: string
  options?: Option[]     // choice
  answer?: string        // choice: 'A'; short: 参考答案文本
  explanation?: string   // choice 解析
  blanks?: string[]      // fill: 每个空的参考答案
  incomplete?: boolean   // choice 缺选项 → App 降级为对照模式
}

export interface QuestionDB {
  generatedAt: string
  source: string
  total: number
  byType: Record<string, number>
  questions: Question[]
}

/** 一次答题记录（每道题一条） */
export interface Attempt {
  id?: number
  clientId?: string       // 同步幂等键（uuid）
  questionId: string
  day: number
  category: string
  type: QType
  /** 用户作答内容（choice: 选 key；fill: 各空文本；short: 自评等级 ok/partial/no） */
  userAnswer: string
  correct: boolean       // choice/fill 自动判；short: ok→true, partial/no→false
  selfRating?: 'ok' | 'partial' | 'no' // 简答题自评
  at: number             // 时间戳 ms
  mode: string           // 'today' | 'random' | 'wrong' | 'browse'
  syncedAt?: number       // 上次推送到云端的时间（null=未同步）
}

/** 错题本：每道错题最新状态 */
export interface WrongItem {
  questionId: string
  day: number
  category: string
  type: QType
  wrongCount: number
  lastWrongAt: number
  nextReviewAt: number   // 艾宾浩斯下一次复习时间
  resolved?: boolean
}
