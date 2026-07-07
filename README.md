# 个人刷题宝（PWA）

面向 Java 后端面试复习的三端刷题应用。题库来自本项目 `source/questions-source.md`，浏览器打开即用，"添加到主屏幕"后像原生 App 一样离线使用（手机 / 桌面 / 平板）。

## ✨ 功能

- **今日练习 / 随机练习**：从题库随机抽题，覆盖选择题、填空题、简答题
- **专项练习**：支持按 Day、知识点、错题、薄弱点推荐进行定向练习
- **模拟面试 / 考前冲刺**：按面试问答节奏组织简答题，并结合错题与薄弱点补齐练习
- **闪卡速记**：正反面卡片快速背诵，答案面展示题目和答案；非第一张时可随时返回上一张
- **自动判分**：选择题秒判；填空题标准化匹配（去标点/大小写）+ 自评覆盖；简答题对照参考答案自评
- **错题本**：做错自动入库，艾宾浩斯间隔重复（1/2/4/7/15/30 天），到期提醒重刷
- **知识地图与统计**：累计答题、正确率、按知识点掌握度、最近 7 天题量、薄弱点分析
- **三端同步**：IndexedDB 本地优先，Supabase 可选云同步，登录后自动同步答题记录和错题本
- **PWA 离线使用**：安装到主屏幕，断网也能刷题

## 🧠 数据来源

题库 = 单一数据源：`source/questions-source.md`

推送到 Vercel 时，构建流程会先执行 `npm run parse`，把 Markdown 题库解析成结构化 JSON：

```bash
npm run parse     # 解析 md → src/data/questions.json
```

解析器识别三种题型，并支持 `Day 12.5` 这类小数 Day、列表题号 ``- `[D16-01]` ``、加粗题号 `**D16-01**`：
- 选择题：`A./B./C./D.` 选项 + `→ X`；只有 `→ X（解释）`没列选项的，标记 `incomplete`，App 内降级为"想答案→对照解析"模式
- 填空题：`___` 占位 + `→ 答案1 / 答案2`
- 简答题：题干 + `> 参考答案`

## 🚀 开发

```bash
cd "04_AI_Apps【个人AI应用】/quiz-app"
npm install        # 首次
npm run dev        # 启动开发服务器（手机同局域网可访问，看终端输出的局域网 URL）
```

## 📦 构建与部署

```bash
npm run build      # 产出 dist/（静态站点）
npm run preview    # 本地预览构建产物
```

**部署到 Vercel（推荐，免费 + 自动 HTTPS + CDN）：**
1. 仓库根目录的 `04_AI_Apps【个人AI应用】/quiz-app` 导入 Vercel
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
Claudian 更新 source/questions-source.md（新增当天知识点题目）
        ↓
npm run parse          # md → questions.json
        ↓
git push               # Vercel 自动执行 parse + build 并部署
```

> 💡 进阶：在仓库里加 GitHub Action，md 改动时自动跑 parse + build + 部署，实现"改 md → 站点自动更新"。

## 🎨 图标

`public/icon.svg` 是源图标。生成 PWA 所需 PNG：

```bash
npm i -D sharp       # 一次性
npm run icons        # 生成 pwa-192/512.png + apple-touch-icon.png
```

> Obsidian 用户建议：在「设置 → 文件与链接 → 排除的文件」里把 `04_AI_Apps【个人AI应用】/quiz-app` 排除，避免 node_modules 干扰索引。

## 🛠️ 技术栈

Vue 3 + Vite + TypeScript + Tailwind CSS + Pinia + Vue Router + Dexie(IndexedDB) + Supabase + vite-plugin-pwa
