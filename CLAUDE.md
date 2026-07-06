# quiz-app 项目记忆

> 本文件是 Claude 在本项目工作时**必读**的项目级记忆。修改本项目代码时遵守这里的约定。
> 建库/改库规则见知识库 `02_Wiki/开发工具/Supabase 项目初始化规范.md`。

## 项目概况

- **是什么**：面试复习题库 PWA，每天打卡后从题库随机抽题练习，错题进错题本按艾宾浩斯复习
- **技术栈**：Vue 3 + Vite + TypeScript + Pinia + Vue Router + Tailwind CSS + vite-plugin-pwa
- **存储架构**：本地 Dexie (IndexedDB) 为主，Supabase 做可选云同步（多设备一致）
- **部署**：Vercel
- **仓库**：https://github.com/Feyar/AI-lianxiti

## 当前状态（2026-07-06）

- **部署**：已上线 Vercel，连 GitHub 自动部署（push 即重建，1-2 分钟）
- **Supabase**：5 张表已建（profiles / projects / app_settings / attempts / wrong_items），RLS 已修通（曾因坏 SQL 踩坑，见下）
- **三端同步**：已通；`auth.ts` 的 signIn/signUp 后自动 `triggerSync()`，无需手动点按钮
- **PWA 更新**：`SettingsView.vue` 有"检查更新 · 清缓存刷新"按钮，解决移动端 SW 缓存卡旧版
- **应用名**：首页 H1 和页脚已改"个人刷题宝"；manifest / `<title>` / README 仍是"面试刷题宝"，待统一（见"待办"）
- **功能扩展**（2026-07-06）：新增模拟面试、考前冲刺、闪卡速记、知识地图、薄弱点分析+推荐练习
  - `attempts.mode` 支持全部模式：`today/random/wrong/browse/day/category/interview/cram/recommended/flashcard`
  - 新文件：`src/utils/analytics.ts`（掌握度计算）、`src/views/FlashcardsView.vue`、`src/views/KnowledgeMapView.vue`

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
| `src/utils/analytics.ts` | 知识点掌握度计算 + 薄弱点分析 + 推荐题目 |
| `src/utils/supabase.ts` | Supabase 客户端（env 控制 `supabaseEnabled`） |
| `src/stores/quiz.ts` | 题库 + 会话管理（支持全部 mode） |
| `src/stores/progress.ts` | 答题 + 错题本 + 统计 + 分析 |
| `src/views/FlashcardsView.vue` | 闪卡速记（独立页面，不走 PracticeView） |
| `src/views/KnowledgeMapView.vue` | 知识地图（Day/Category 掌握度可视化） |
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

## 常见坑（今天踩过的，别再踩）

- **Vercel 环境变量必须 `VITE_` 前缀**：Supabase Connect 弹窗默认给 `NEXT_PUBLIC_*`（Next.js 用的），Vite 项目读不到 → 部署后"我的"页显示"未配置"。正确名：`VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`；加完必须 **redeploy**（Vite 构建时内联，不重建不生效）。
- **RLS 403 "new row violates row-level security policy"**：表开了 RLS 但没建 INSERT 策略 = 全拦。曾因跑了 `docs/SUPABASE_SYNC.md` 里格式损坏的 SQL 踩过（建表语句报错、`enable row level security` 却跑成功了）。修复见知识库 `Supabase 项目初始化规范` 的"调试速查"。**只认 `supabase/schema.sql`，别跑别处的内联 SQL。**
- **移动端 PWA 卡旧版**：SW 缓存旧资源，部署后手机看不到新内容。设置页"检查更新"按钮可清。但新版本第一次到达手机前，得手动清一次缓存（删 PWA 图标重装最稳）。
- **bash 工具 CWD 漂移**：用 `cd` 后 CWD 会变，后续相对路径易错（曾因此把文件写进嵌套目录）。操作项目仓库**统一用 `git -C "<绝对路径>"`**；node 等二进制要用 Windows 盘符路径 `B:/...` 不是 `/b/...`。

## 待办与不一致

- [ ] **统一改名为"个人刷题宝"**：`index.html` 的 `<title>`、`vite.config.ts` 的 `manifest.name`、`README.md` 还写着"面试刷题宝"
- [ ] **验证三端数据合并**：电脑 / 手机都"退出→重登"触发自动同步，确认 `select count(*) from attempts` 数据汇合
- [ ] **激活自动推送 hook**：在 Claude Code 里打开一次 `/hooks`（或重启会话），以后改完代码自动推（当前 hook 已写进 `.claude/settings.json` 但本会话未确认激活）

## 数据更新两种方式（重要区分）

本项目有两条独立的数据通道，别混淆：

| 通道 | 改什么 | 怎么生效 | 谁触发 |
|------|--------|---------|--------|
| **题库更新**（题目本身） | `source/questions-source.md` | push → Vercel 自动重新构建（`vercel.json` 的 buildCommand 含 `npm run parse`）→ 所有设备刷新 app 就看到新题 | Claude 改 markdown + push |
| **答题数据同步**（attempts / wrong_items） | 用户答题产生的数据 | Supabase 同步（push/pull），跟部署无关 | app 启动 / 答完题 / 点"立即同步" / **登录后自动** |

> ⚠️ 加新题 ≠ 同步数据。加题改 markdown + 推送即可（不用动 Supabase）；答题记录走 Supabase（不用重新部署）。

## 自动推送

`04_AI_Apps【个人AI应用】/` 目录配了 Stop hook（脚本 `.claude/scripts/apps-auto-push.sh`，vault 根级）：Claude 改完项目文件会自动遍历 `04_AI_Apps【个人AI应用】/*/` 的 git 仓库，对有改动的执行 add → commit → push（走 7897 代理）。
所以让我改完代码不用手动推（除非你自己已经在改同一份文件，怕冲突时喊我停）。

> hook 首次启用需在 Claude Code 里打开一次 `/hooks`（或重启会话）让配置生效；之后每回合结束自动跑。
