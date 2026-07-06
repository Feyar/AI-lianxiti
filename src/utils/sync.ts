import { db } from './db'
import { allQuestions } from '@/utils/quiz-loader'
import { supabase, supabaseEnabled } from './supabase'
import { useAuthStore } from '@/stores/auth'
import type { Attempt } from '@/types'

function uuid(): string {
  return crypto.randomUUID()
}

/** 设备唯一标识（持久化），用于区分是哪台设备答的 */
function getDeviceId(): string {
  let id = localStorage.getItem('quiz_device_id')
  if (!id) {
    id = uuid()
    localStorage.setItem('quiz_device_id', id)
  }
  return id
}

/** 推送本地未同步的 attempts 到云端（幂等：按 client_id 去重） */
export async function pushAttempts(): Promise<void> {
  if (!supabase) return
  const auth = useAuthStore()
  if (!auth.user) return

  const pending = await db.attempts.filter((a) => !a.syncedAt).toArray()
  if (pending.length === 0) return

  const rows = pending.map((a) => ({
    user_id: auth.user!.id,
    client_id: a.clientId || uuid(),
    device_id: getDeviceId(),
    question_id: a.questionId,
    day: a.day,
    category: a.category,
    type: a.type,
    user_answer: a.userAnswer,
    correct: a.correct,
    self_rating: a.selfRating ?? null,
    at: a.at,
    mode: a.mode
  }))

  const { error } = await supabase
    .from('attempts')
    .upsert(rows, { onConflict: 'user_id,client_id' })
  if (error) throw error

  // 标记已同步（用 client_id 反查本地）
  const now = Date.now()
  for (const r of rows) {
    const local = await db.attempts.where('clientId').equals(r.client_id).first()
    if (local?.id !== undefined) await db.attempts.update(local.id, { syncedAt: now })
  }
}

/** 拉取云端 attempts 到本地（按 client_id 去重 merge） */
async function pullAttempts(): Promise<void> {
  if (!supabase) return
  const auth = useAuthStore()
  if (!auth.user) return

  const { data, error } = await supabase.from('attempts').select('*')
  if (error) throw error
  if (!data) return

  for (const row of data) {
    const exist = await db.attempts.where('clientId').equals(row.client_id).first()
    if (exist) {
      if (exist.syncedAt === undefined) await db.attempts.update(exist.id!, { syncedAt: Date.now() })
    } else {
      const a: Attempt = {
        clientId: row.client_id,
        questionId: row.question_id,
        day: row.day,
        category: row.category,
        type: row.type,
        userAnswer: row.user_answer,
        correct: row.correct,
        selfRating: row.self_rating ?? undefined,
        at: row.at,
        mode: row.mode,
        syncedAt: Date.now()
      }
      await db.attempts.add(a)
    }
  }
}

/** 错题本同步：本地 ↔ 云端（last-write-wins，靠云端 updated_at） */
async function syncWrong(): Promise<void> {
  if (!supabase) return
  const auth = useAuthStore()
  if (!auth.user) return

  // push 本地所有 wrong → 云端 upsert
  const local = await db.wrong.toArray()
  for (const w of local) {
    await supabase.from('wrong_items').upsert(
      {
        user_id: auth.user.id,
        question_id: w.questionId,
        wrong_count: w.wrongCount,
        last_wrong_at: w.lastWrongAt,
        next_review_at: w.nextReviewAt,
        resolved: w.resolved ?? false,
        updated_at: new Date().toISOString()
      },
      { onConflict: 'user_id,question_id' }
    )
  }

  // pull 云端 → 本地（put 覆盖，靠 updated_at 保证多设备最终一致）
  const { data } = await supabase.from('wrong_items').select('*')
  if (data) {
    for (const row of data) {
      const q = allQuestions.find((x) => x.id === row.question_id)
      await db.wrong.put({
        questionId: row.question_id,
        day: q?.day ?? 0,
        category: q?.category ?? '',
        type: q?.type ?? 'choice',
        wrongCount: row.wrong_count,
        lastWrongAt: row.last_wrong_at,
        nextReviewAt: row.next_review_at,
        resolved: row.resolved ?? false
      })
    }
  }
}

/** 全量同步：push attempts → pull attempts → sync wrong。返回是否成功 */
export async function syncAll(): Promise<boolean> {
  if (!supabaseEnabled || !supabase) return false
  try {
    await pushAttempts()
    await pullAttempts()
    await syncWrong()
    return true
  } catch (e) {
    console.error('[sync] failed:', e)
    return false
  }
}
