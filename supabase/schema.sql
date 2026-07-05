-- ============================================================================
-- quiz-app（在线题库）— Supabase 表结构
-- 严格对齐 apps/quiz-app/src/utils/sync.ts 的 .from() 与 upsert() 调用
-- 在 Supabase → SQL Editor 整段粘贴运行；幂等，可重复执行
-- ============================================================================

-- 前置：set_updated_at() 函数已在门户初始化 SQL 中创建，这里直接复用
-- （若还没跑过初始化，请先执行 [[02_Wiki/开发工具/Supabase 项目初始化规范.md]] 的初始化 SQL）

-- ─── 1. attempts：答题记录（append-only 事件流） ──────────────────────────
-- 对齐 sync.ts:  .from('attempts').upsert(rows, { onConflict: 'user_id,client_id' })
create table if not exists public.attempts (
  id           bigint generated always as identity primary key,
  user_id      uuid not null references auth.users(id) on delete cascade,
  client_id    uuid not null,                       -- 幂等键：本地 crypto.randomUUID()
  device_id    uuid,                                 -- 设备标识：区分多设备
  question_id  text not null,                        -- 题目 id，如 'D5-02'
  day          int  not null,                        -- Day 几的题
  category     text not null,                        -- 分类
  type         text not null check (type in ('choice','fill','short')),
  user_answer  text not null default '',             -- 作答：choice=key；fill=各空；short=自评
  correct      boolean not null default false,
  self_rating  text check (self_rating in ('ok','partial','no')),  -- 简答自评，可空
  at           bigint not null,                      -- 答题时间戳（ms，JS Date.now()）
  mode         text not null check (mode in ('today','random','wrong','browse')),
  created_at   timestamptz not null default now(),   -- 行插入时间（append-only，无 updated_at）
  constraint attempts_user_client_unique unique (user_id, client_id)
);
alter table public.attempts enable row level security;
create policy "attempts_owner_all" on public.attempts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create index if not exists on public.attempts (user_id, at desc);
create index if not exists on public.attempts (user_id, question_id);
create index if not exists on public.attempts (user_id, correct);

-- ─── 2. wrong_items：错题本（每题最新状态，多设备 last-write-wins） ────────
-- 对齐 sync.ts:  .from('wrong_items').upsert({...}, { onConflict: 'user_id,question_id' })
create table if not exists public.wrong_items (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  question_id     text not null,
  wrong_count     int  not null default 1,           -- 累计错次（驱动艾宾浩斯间隔）
  last_wrong_at   bigint not null,                   -- 最近答错时间（ms）
  next_review_at  bigint not null,                   -- 下次该复习时间（ms）
  resolved        boolean not null default false,    -- 是否已解决
  updated_at      timestamptz not null default now(), -- last-write-wins 依据（代码手动写）
  created_at      timestamptz not null default now(),
  constraint wrong_user_question_unique unique (user_id, question_id)
);
alter table public.wrong_items enable row level security;
create policy "wrong_owner_all" on public.wrong_items
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
-- 自动维护 updated_at（即使代码忘了写也安全；代码显式写也无妨，结果一致）
drop trigger if exists trg_wrong_items_updated on public.wrong_items;
create trigger trg_wrong_items_updated before update on public.wrong_items
  for each row execute function public.set_updated_at();
create index if not exists on public.wrong_items (user_id, next_review_at);
create index if not exists on public.wrong_items (user_id, resolved);

-- ─── 注册到门户：启用 bank 卡片 ───────────────────────────────────────────
update public.projects
  set is_enabled = true, description = '面试复习题库（已接入）'
  where slug = 'bank';

-- ============================================================================
-- 字段映射速查（sync.ts ↔ 本表）
-- ----------------------------------------------------------------------------
-- Attempt.clientId      → client_id     (uuid，幂等去重)
-- Attempt.questionId    → question_id
-- Attempt.userAnswer    → user_answer
-- Attempt.selfRating    → self_rating   (可空)
-- Attempt.at            → at            (bigint ms)
-- Attempt.mode          → mode
-- WrongItem.wrongCount  → wrong_count
-- WrongItem.lastWrongAt → last_wrong_at (bigint ms)
-- WrongItem.nextReviewAt→ next_review_at(bigint ms)
-- WrongItem.resolved    → resolved
-- (Attempt.id/syncedAt  → 不进云端；仅 Dexie 本地用)
-- ============================================================================
