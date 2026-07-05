# Supabase 三端同步方案

> 状态：**✅ 已实现**（代码已集成进 App，默认走纯本地，配 keys 后自动开同步）。前半是启用指南，后半是设计细节。

## 🚀 启用步骤（约 10 分钟）

### 1. 注册 Supabase（免费）
打开 https://supabase.com → GitHub 登录 → 「New Project」
- Region 选 **Northeast Asia (Tokyo)** 或 **Southeast Asia (Singapore)**（离你最近）
- 数据库密码记好，等约 2 分钟初始化

### 2. 拿 URL + anon key
项目「Settings → API」里复制两个值：
- **Project URL**：形如 `https://xxxx.supabase.co`
- **anon public** key：一长串

### 3. 建表
左侧「SQL Editor」→ 「New query」→ 粘贴下方「数据库表结构」那段 SQL → 「Run」

### 4. 配置本地环境变量
```bash
cd apps/quiz-app
cp .env.example .env.local
# 编辑 .env.local，填入第 2 步的 URL 和 anon key
```
重启 `npm run dev`（vite 读 env 需重启）。

### 5. App 里启用
「我的」页 → 状态从"未配置"变"未登录" → 「登录/注册」首次注册一个账号 → 同步自动开启。
其他设备同样配 `.env.local` + 登录**同一账号**，记录就三端同步了。

### 6. 部署到 Vercel 时
Vercel 项目「Settings → Environment Variables」加同名变量 `VITE_SUPABASE_URL` 和 `VITE_SUPABASE_ANON_KEY`，重新 deploy。

> 💡 不配 keys 时，App 自动走纯本地模式，所有现有功能不受影响。

## 目标

题库同步已经走"部署"解决。这份文档解决的是：**个人答题记录 / 错题本 / 统计跨设备同步**——手机上做错的题，Mac 上也能看到。

## 架构

```
📱 手机             💻 Mac              🖥️ Windows
Dexie 本地          Dexie 本地           Dexie 本地
   ↕                  ↕                    ↕
 同步层(pull/push)   同步层                同步层
   ↕                  ↕                    ↕
   └──────────► Supabase (PostgreSQL) ◄──────┘
                  - auth.users  (一个账号登录三端)
                  - attempts    (答题记录,带 user_id)
                  - wrong_items (错题本,带 user_id)
                  - RLS 策略    (只能看自己的)
```

**核心原则：本地 Dexie 仍是主存储**（离线可用、快），Supabase 是同步层。断网时正常做题，联网后自动同步。

## 数据库表结构

> ⚠️ **直接运行 [`supabase/schema.sql`](../supabase/schema.sql)**——那是唯一权威的建表脚本（含 RLS 策略、唯一约束、索引、触发器）。
> **不要再从本页复制 SQL 跑**——曾因本页 SQL 格式损坏，导致 RLS 开了但策略没建成、同步全被 403 拦的坑。

### 字段速览（权威定义见 `supabase/schema.sql`）

**`attempts`（答题流水，append-only）**
- `user_id`、`client_id`（幂等键）、`question_id`、`at`（ms 时间戳）、`correct`、`mode`
- 约束 `UNIQUE(user_id, client_id)` → 同一条答题不重复入库
- RLS：`auth.uid() = user_id`

**`wrong_items`（错题本，每题一行，last-write-wins）**
- `user_id`、`question_id`、`wrong_count`、`next_review_at`（ms）、`resolved`、`updated_at`
- 约束 `UNIQUE(user_id, question_id)`
- RLS：`auth.uid() = user_id`

## 登录方式

**邮箱 + 密码**（最简单）。三端用同一个账号登录即同步。
- 也可以开"魔法链接"免密登录
- 不想要账号体系的话可降级为匿名 auth（但换设备会丢）

## 同步策略

| 数据 | 同步方式 | 冲突处理 |
|---|---|---|
| `attempts` | append-only，每条带 `client_id` 幂等 | 无冲突（只追加） |
| `wrong_items` | upsert by (user_id, question_id) | `updated_at` 大的赢（last-write-wins） |

**触发时机：**
1. 本地 `recordAttempt` 写完后 → 异步 push 到 Supabase（带 client_id 幂等）
2. App 启动 → pull Supabase 最新 → merge 进本地 Dexie
3. 设置页"立即同步"按钮 → 手动 push+pull

**离线行为：** 断网时本地正常写，联网后补推。

## 需要改动的代码

| 文件 | 改动 |
|---|---|
| `package.json` | 加 `@supabase/supabase-js` 依赖 |
| `src/utils/supabase.ts` | 新建，初始化客户端（从 env 读 url + anon key） |
| `src/stores/auth.ts` | 新建，登录/登出/当前用户 |
| `src/views/LoginView.vue` | 新建登录页 |
| `src/stores/progress.ts` | `recordAttempt` 后异步 push；加 `syncWithRemote()` |
| `src/utils/sync.ts` | 新建，pull/push/merge 逻辑 |
| `src/views/SettingsView.vue` | 加登录入口 + 同步状态 + 手动同步按钮 |
| `.env.local` | `VITE_SUPABASE_URL` `VITE_SUPABASE_ANON_KEY`（不进 git） |

## 成本

Supabase 免费层：
- **500MB** 数据库（一条答题记录约 200 字节，能存 250 万条，永远用不完）
- **50000** 月活用户（你一个人随便用）
- **5GB** 带宽

**结论：永久免费，无需信用卡。**

## 隐私

- 数据存 Supabase（区域自选，可选亚太）
- RLS 保证只有你自己能读
- **不上传题库内容**，只传 `question_id` 引用（题库是公开部署的）
- Supabase 是开源的，不放心可以自托管

## 工作量预估

- 建表 + RLS：10 分钟
- 注册 Supabase + 拿 keys：5 分钟
- supabase 客户端 + auth：30 分钟
- 同步逻辑（pull/push/merge）：40 分钟
- 登录页 + 设置页集成：20 分钟
- 联调测试：20 分钟
- **合计约 2 小时**

## 优缺点对比

| | 不做（现状） | 做 Supabase |
|---|---|---|
| 题库三端更新 | ✅ | ✅ |
| 答题记录跨设备 | ❌ 各自独立 | ✅ 全同步 |
| 错题本跨设备 | ❌ | ✅ |
| 离线可用 | ✅ | ✅（本地优先） |
| 成本 | 0 | 0（免费层） |
| 维护 | 0 | 极低（建一次表） |
| 依赖 | 无 | 一个 Supabase 账号 |

## 决策建议

- 你**主要在多设备切换**刷题（手机通勤 + Mac 家里）→ **值得做**
- 你**基本固定一台设备**刷，只是偶尔换 → **不必做**，现状够用
