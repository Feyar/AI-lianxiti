# 部署指南（Vercel 推荐 / GitHub Pages 备选）

部署后拿到公网地址，三端（手机/平板/Mac/Windows）打开同一个 URL → "添加到主屏幕" → 像原生 App 一样离线用。

---

## 🚀 方案 A：Vercel（推荐）

最简单，自动 HTTPS + 全球 CDN，push 即自动重建。

### 第 1 步：把项目推到 GitHub

**推荐：单独建一个仓库**（不暴露 vault 其他内容）

```bash
cd apps/quiz-app
git init
git add .
git commit -m "init: 面试刷题宝"
# 在 GitHub 上新建一个空仓库（比如 interview-quiz），然后：
git remote add origin https://github.com/<你的用户名>/interview-quiz.git
git push -u origin main
```

> 注意：`.gitignore` 已排除 `node_modules/` 和 `dist/`，但**包含** `source/questions-source.md`（题库）——这正是部署后能拿到题库的关键。

### 第 2 步：连 Vercel

1. 打开 https://vercel.com → 用 GitHub 登录
2. 「Add New Project」→ 选刚才的仓库
3. 配置（vercel.json 已写好，一般会自动识别）：
   - **Framework Preset**: Vite
   - **Build Command**: `npm run parse && npm run build`
   - **Output Directory**: `dist`
   - 如果是单独仓库 → Root Directory 留空；如果 push 了整个 vault → Root 设 `apps/quiz-app`
4. 「Deploy」→ 等 1-2 分钟 → 拿到 `https://interview-quiz-xxx.vercel.app`

### 第 3 步：三端安装

用任意设备打开那个 URL：
- **Android / Windows / macOS Chrome·Edge**：地址栏右侧安装图标 → 安装
- **iOS / iPadOS Safari**：分享 → 添加到主屏幕
- **macOS Safari 17+**：文件 → 添加到程序坞

### 之后的工作流（题库自动更新）

```
Claudian 更新 vault md（新增当天知识点题目）
       ↓
你在本地：npm run update     （sync 复制 md + parse 解析）
       ↓
git add . && git commit -m "题库更新" && git push
       ↓
Vercel 自动重建部署（约 1 分钟）
       ↓
三端 App 打开 → PWA 自动检测新版 → 拉到新题库 ✅
```

> 💡 想更省事：可以让 Claudian 直接改 `apps/quiz-app/source/questions-source.md`，省掉 `npm run update`，commit 就完事。

---

## 🛠 方案 B：GitHub Pages（完全免费，备选）

如果你不想注册 Vercel，用我写好的 GitHub Action：

1. 同样把项目推到 GitHub（见方案 A 第 1 步）
2. 仓库「Settings → Pages → Build and deployment → Source」选 **GitHub Actions**
3. push 到 main 时 `.github/workflows/deploy.yml` 自动跑 parse + build + 部署
4. 拿到 `https://<用户名>.github.io/<仓库名>/`

> 路由已改成 hash 模式（`#/...`），所以子路径部署不会 404。

---

## 常见问题

**Q：Vercel 部署后手机打不开？**
A：确认用 HTTPS 地址（Vercel 默认就是），PWA 必须 HTTPS 才能装到主屏幕。

**Q：装到主屏幕后图标不显示？**
A：图标已生成（`pwa-192.png` / `pwa-512.png`），首次安装可能要清浏览器缓存重试。

**Q：怎么知道题库是不是最新的？**
A：App「我的」页有"数据更新时间"，对照一下 md 的修改时间。

**Q：换设备后答题记录会同步吗？**
A：**目前不会**（本地存）。需要全同步见 `docs/SUPABASE_SYNC.md`。
