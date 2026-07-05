# quiz-app 项目记忆

> 本文件是 Claude 在本项目工作时**必读**的项目级记忆。修改本项目代码时遵守这里的约定。
> 建库/改库规则见知识库 `02_Wiki/开发工具/Supabase 项目初始化规范.md`。

## 项目概况

- **是什么**：面试复习题库 PWA，每天打卡后从题库随机抽题练习，错题进错题本按艾宾浩斯复习
- **技术栈**：Vue 3 + Vite + TypeScript + Pinia + Vue Router + Tailwind CSS + vite-plugin-pwa
- **存储架构**：本地 Dexie (IndexedDB) 为主，Supabase 做可选云同步（多设备一致）
- **部署**：Vercel
- **仓库**：https://github.com/Feyar/AI-lianxiti

## 数据库（Supabase）

- 表结构详见 `supabase/README.md`（备注）和 `supabase/schema.sql`（建表 SQL）
- **只有两张表**：`attempts`（答题流水）、`wrong_items`（错题本）
- **题目不进数据库**，从 `source/questions-source.md` 加载（`npm run parse` 解析）
- 字段命名：数据库 snake_case ↔ 前端 camelCase，转换在 `src/utils/sync.ts`
- RLS 已开（owner = `user_id`），单用户锁死；前提是 Supabase 关闭了公开注册

## 关键文件

| 文件 | 作用 |
|------|------|
| `src/types.ts` | 数据模型：`Question` / `Attempt` / `WrongItem` |
| `src/utils/db.ts` | Dexie 本地数据库 schema（v2） |
| `src/utils/sync.ts` | Supabase 云同步（attempts push/pull、wrong_items 双向） |
| `src/utils/srs.ts` | 艾宾浩斯间隔重复算法（间隔 1/2/4/7/15/30 天） |
| `src/utils/supabase.ts` | Supabase 客户端（env 控制 `supabaseEnabled`） |
| `src/stores/progress.ts` | 答题 + 错题本业务逻辑 |
| `supabase/schema.sql` | 云端建表 SQL（严格对齐 sync.ts） |

## 开发命令

```bash
npm install        # 装依赖（node_modules 已从仓库删除，新机器/重装先跑这个）
npm run dev        # 启动开发服务器
npm run build      # 构建
npm run parse      # 重新解析 source/questions-source.md 为题库数据
npm run sync       # 同步题目源
```

## 环境变量（`.env.local`，已 gitignore）

```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_xxx   # 用 publishable 公开密钥，别用 service_role / sb_secret
```

## 规则与约定

- **改表结构三处同步**：`supabase/schema.sql` + `src/types.ts` + `src/utils/sync.ts`
- **新增表**遵循知识库 `Supabase 项目初始化规范` 的铁律：每表开 RLS、必有 id/created_at/updated_at、表名加项目前缀、schema 变更进 GitHub
  - 本项目的两处有意例外：`at`/`last_wrong_at`/`next_review_at` 用 bigint ms（配合前端 Date.now()）；`attempts` 表无 updated_at（append-only 流水）
- **git 推送走 7897 代理**（已写入本仓库 `.git/config` 的 http.proxy / https.proxy）；CWD 不在仓库时用 `git -C` 操作
- `node_modules/` 和 `dist/` 已从仓库删除（节省 OneDrive 空间），二者都在 `.gitignore` 里，重建用 `npm install` / `npm run build`

## 自动推送

`apps/` 目录配了 Stop hook（脚本 `.claude/scripts/apps-auto-push.sh`，vault 根级）：Claude 改完项目文件会自动遍历 `apps/*/` 的 git 仓库，对有改动的执行 add → commit → push（走 7897 代理）。
所以让我改完代码不用手动推（除非你自己已经在改同一份文件，怕冲突时喊我停）。

> hook 首次启用需在 Claude Code 里打开一次 `/hooks`（或重启会话）让配置生效；之后每回合结束自动跑。
