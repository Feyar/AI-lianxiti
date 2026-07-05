// 把 vault 里最新的题库 md 同步到项目 source/ 目录
// 本地工作流：我更新 md 后，跑 npm run sync && npm run parse
// CI/部署环境不需要此脚本（source/ 已 commit 进仓库）
import { copyFileSync, mkdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const VAULT_ROOT = resolve(__dirname, '../../..')
const SRC = resolve(
  VAULT_ROOT,
  '02_Wiki【结构化知识库】/工作实践/面试复习/14天面试复习打卡/面试复习每日练习.md'
)
const DST_DIR = resolve(__dirname, '../source')
const DST = resolve(DST_DIR, 'questions-source.md')

if (!existsSync(SRC)) {
  console.error('❌ 找不到 vault 题库 md:', SRC)
  console.error('   如果你不在 vault 环境里（如 CI），可跳过此步，直接 npm run parse')
  process.exit(1)
}
mkdirSync(DST_DIR, { recursive: true })
copyFileSync(SRC, DST)
console.log('✅ 已同步题库到 source/questions-source.md')
console.log('   接下来跑: npm run parse')
