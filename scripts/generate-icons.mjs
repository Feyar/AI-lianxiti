// 从 public/icon.svg 生成 PWA 所需的 PNG 图标
// 用法: node scripts/generate-icons.mjs  (需先: npm i -D sharp)
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SVG = resolve(__dirname, '../public/icon.svg')

async function main() {
  let sharp
  try {
    sharp = (await import('sharp')).default
  } catch {
    console.error('⚠️  未安装 sharp。先运行:  npm --prefix apps/quiz-app i -D sharp')
    console.error('   （SVG 图标已可用于现代浏览器，PNG 仅为兼容旧设备/启动屏）')
    process.exit(1)
  }
  const svgBuffer = readFileSync(SVG)
  const targets = [
    [192, 'pwa-192.png'],
    [512, 'pwa-512.png'],
    [180, 'apple-touch-icon.png'],
    [32, 'favicon-32.png']
  ]
  for (const [size, name] of targets) {
    const out = resolve(__dirname, `../public/${name}`)
    await sharp(svgBuffer).resize(size, size).png().toFile(out)
    console.log(`✅ ${name} (${size}×${size})`)
  }
}
main()
