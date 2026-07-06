# quiz-app 数据库表结构备注

> 本文件是项目内"表结构备注"，配合 `schema.sql`（可执行的建表语句）使用。
> 所有云端表严格对齐 `src/utils/sync.ts` 的 `.from()` 与 `upsert()` 调用——改表必须三处同步。

## 整体设计

题目本身**不进数据库**——题目从 `source/questions-source.md` 静态加载（由 `npm run parse` 解析）。
数据库只存**用户进度**：答题流水 + 错题本。

## 表一览

| 表 | 用途 | 关键约束 |
|----|------|---------|
| `attempts` | 答题流水（每答一题一条，append-only） | UNIQUE(user_id, client_id) |
| `wrong_items` | 错题本（每题最新状态，多设备 last-write-wins） | UNIQUE(user_id, question_id) |

---

## 1. `attempts` — 答题流水

| 字段 | 类型 | 说明 | sync.ts 来源 |
|------|------|------|-------------|
| `id` | bigint PK | 自增 | — |
| `user_id` | uuid | 用户 | `auth.user.id` |
| `client_id` | uuid | **幂等键** | `Attempt.clientId` |
| `device_id` | uuid | 设备标识 | `getDeviceId()` |
| `question_id` | text | 题号，如 `D5-02` | `Attempt.questionId` |
| `day` | int | Day 几 | `Attempt.day` |
| `category` | text | 分类 | `Attempt.category` |
| `type` | text | `choice` / `fill` / `short` | `Attempt.type` |
| `user_answer` | text | 作答内容 | `Attempt.userAnswer` |
| `correct` | bool | 对错 | `Attempt.correct` |
| `self_rating` | text | `ok`/`partial`/`no`（简答自评，可空） | `Attempt.selfRating` |
| `at` | bigint | 答题时间戳 ms | `Attempt.at` |
| `mode` | text | `today`/`random`/`wrong`/`browse`/`day`/`category`/`interview`/`cram`/`recommended`/`flashcard` | `Attempt.mode` |
| `created_at` | timestamptz | 行插入时间 | — |

**设计要点**
- **append-only**：只插不改，所以没有 `updated_at`（有意违规通用铁律，因为流水不改）
- `client_id` 是幂等键：同一道答题多次同步不会重复（UNIQUE + `onConflict: 'user_id,client_id'`）
- `at` 用 bigint 存毫秒，对齐 JS `Date.now()`，避免前后端时区转换

## 2. `wrong_items` — 错题本

| 字段 | 类型 | 说明 | sync.ts 来源 |
|------|------|------|-------------|
| `id` | uuid PK | — | — |
| `user_id` | uuid | 用户 | `auth.user.id` |
| `question_id` | text | 题号 | `WrongItem.questionId` |
| `wrong_count` | int | 累计错次（驱动艾宾浩斯间隔） | `WrongItem.wrongCount` |
| `last_wrong_at` | bigint | 最近答错 ms | `WrongItem.lastWrongAt` |
| `next_review_at` | bigint | 下次复习 ms | `WrongItem.nextReviewAt` |
| `resolved` | bool | 是否已解决 | `WrongItem.resolved` |
| `updated_at` | timestamptz | **last-write-wins 依据** | sync.ts 手动写 |
| `created_at` | timestamptz | — | — |

**设计要点**
- 每题只一行（UNIQUE `user_id`+`question_id`），错一次就 `wrong_count+1`
- 多设备同步用 `updated_at` 做 last-write-wins（见 `sync.ts` 的 `syncWrong`）
- 复习间隔算法在 `src/utils/srs.ts`：`[1,2,4,7,15,30]` 天，按 `wrong_count` 取下标

---

## 字段命名约定

- 前端 TS 用 **camelCase**（`questionId`），数据库用 **snake_case**（`question_id`），在 `sync.ts` 转换
- 时间戳：业务时间用 `bigint` 毫秒（`at` / `last_wrong_at` / `next_review_at`），元数据时间用 `timestamptz`（`created_at` / `updated_at`）

## 改表结构时（铁律：三处同步）

1. 改 `supabase/schema.sql`（追加 ALTER，保持幂等）
2. 改 `src/types.ts`（TS 接口）
3. 改 `src/utils/sync.ts`（字段映射）

三处不同步，同步就会丢字段或报错。建表/改表规则另见 [[Supabase 项目初始化规范]]。
