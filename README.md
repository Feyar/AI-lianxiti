# 面试刷题宝（PWA）

关联 Obsidian 题库 `面试复习每日练习.md` 的三端刷题应用。浏览器打开即用，"添加到主屏幕"后像原生 App 一样离线使用（手机 / 桌面 / 平板）。

## ✨ 功能

- **今日练习**：自动从题库随机抽 15 题（选择 6 + 填空 5 + 简答 4），复刻 md 里的"每日练习"逻辑
- **自动判分**：选择题秒判；填空题标准化匹配（去标点/大小写）+ 自评覆盖；简答题对照参考答案自评
- **错题本**：做错自动入库，艾宾浩斯间隔重复（1/2/4/7/15/30 天），到期提醒重刷
- **统计**：累计答题、正确率、按知识点正确率（薄弱点从弱到强排序）、最近 7 天题量
- **按 Day / 知识点浏览**：定向刷某个知识点
- **三端 + 离线**：PWA，安装到主屏幕，断网也能刷
- **数据本地**：所有记录存 IndexedDB，不上云，不会丢

## 🧠 数据来源

题库 = 单一数据源：`02_Wiki【结构化知识库】/工作实践/面试复习/14天面试复习打卡/面试复习每日练习.md`

每天 Claudian 更新 md 后，跑一条命令把"题库"段解析成结构化 JSON：

```bash
npm run parse     # 解析 md → src/data/questions.json
```

解析器识别三种题型：
- 选择题：`A./B./C./D.` 选项 + `→ X`；只有 `→ X（解释）`没列选项的，标记 `incomplete`，App 内降级为"想答案→对照解析"模式
- 填空题：`___` 占位 + `→ 答案1 / 答案2`
- 简答题：题干 + `> 参考答案`

## 🚀 开发

```bash
cd apps/quiz-app
npm install        # 首次
npm run dev        # 启动开发服务器（手机同局域网可访问，看终端输出的局域网 URL）
```

## 📦 构建与部署

```bash
npm run build      # 产出 dist/（静态站点）
npm run preview    # 本地预览构建产物
```

**部署到 Vercel（推荐，免费 + 自动 HTTPS + CDN）：**
1. 仓库根目录的 `apps/quiz-app` 导入 Vercel
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. 每次推送自动部署

或者 Cloudflare Pages / GitHub Pages（任意静态托管均可）。

## 📱 安装到设备（PWA）

部署后用浏览器打开：
- **Chrome/Edge（Android/桌面）**：地址栏右侧安装图标，或菜单 → "安装应用"
- **iOS Safari**：分享 → "添加到主屏幕"
- 安装后断网也能用（Service Worker 缓存了全部题库与资源）

## 🔄 日常更新流程

```
Claudian 更新 面试复习每日练习.md（新增当天知识点题目）
        ↓
npm run parse          # md → questions.json
        ↓
npm run build          # 重新构建
        ↓
部署（推送到 Vercel 自动触发，或本地 preview）
```

> 💡 进阶：在仓库里加 GitHub Action，md 改动时自动跑 parse + build + 部署，实现"改 md → 站点自动更新"。

## 🎨 图标

`public/icon.svg` 是源图标。生成 PWA 所需 PNG：

```bash
npm i -D sharp       # 一次性
npm run icons        # 生成 pwa-192/512.png + apple-touch-icon.png
```

> Obsidian 用户建议：在「设置 → 文件与链接 → 排除的文件」里把 `apps/quiz-app` 排除，避免 node_modules 干扰索引。

## 🛠️ 技术栈

Vue 3 + Vite + TypeScript + Tailwind CSS + Pinia + Dexie(IndexedDB) + vite-plugin-pwa
