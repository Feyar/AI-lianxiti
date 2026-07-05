<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { questionDB } from '@/utils/quiz-loader'
import { useProgressStore } from '@/stores/progress'
import { useAuthStore } from '@/stores/auth'
import { supabaseEnabled } from '@/utils/supabase'
import { syncAll } from '@/utils/sync'
import { clearAllData } from '@/utils/db'

const router = useRouter()
const progress = useProgressStore()
const auth = useAuthStore()

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const deferredPrompt = ref<BeforeInstallPromptEvent | null>(null)
const isStandalone = ref(false)
const stats = ref<Awaited<ReturnType<typeof progress.getStats>> | null>(null)
const syncing = ref(false)
const syncMsg = ref('')

onMounted(async () => {
  isStandalone.value =
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt.value = e as BeforeInstallPromptEvent
  })
  stats.value = await progress.getStats()
})

async function install() {
  if (!deferredPrompt.value) return
  await deferredPrompt.value.prompt()
  await deferredPrompt.value.userChoice
  deferredPrompt.value = null
}

async function doSync() {
  if (!auth.isLoggedIn) {
    router.push('/login')
    return
  }
  syncing.value = true
  syncMsg.value = ''
  const ok = await syncAll()
  syncing.value = false
  syncMsg.value = ok
    ? '✅ 同步成功 · ' + new Date().toLocaleTimeString('zh-CN')
    : '❌ 同步失败，请检查网络'
  if (ok) stats.value = await progress.getStats()
}

async function clearData() {
  if (!confirm('确定清空所有答题记录和错题本？题库不受影响（重新解析 md 即可）。')) return
  await clearAllData()
  stats.value = await progress.getStats()
  alert('已清空所有本地记录')
}

async function signOut() {
  await auth.signOut()
}
</script>

<template>
  <div class="px-4 pt-6">
    <h1 class="text-2xl font-bold mb-4">我的</h1>

    <!-- 同步状态 -->
    <section class="rounded-2xl bg-white border border-slate-200 p-4 mb-3">
      <div class="flex items-center justify-between mb-2">
        <h2 class="text-sm font-semibold text-slate-600">☁️ 三端同步</h2>
        <span v-if="!supabaseEnabled" class="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">未配置</span>
        <span v-else-if="!auth.isLoggedIn" class="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-600">未登录</span>
        <span v-else class="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-600">已同步</span>
      </div>

      <template v-if="!supabaseEnabled">
        <p class="text-xs text-slate-500 leading-relaxed">
          同步功能已内置但未配置。要在三端同步答题记录，需在 Supabase 注册（免费）并配置 keys —— 详见
          <code class="qi-code">docs/SUPABASE_SYNC.md</code>
        </p>
      </template>

      <template v-else-if="!auth.isLoggedIn">
        <p class="text-xs text-slate-500 mb-3">登录后，答题记录与错题本在手机/Mac/Windows 间自动同步</p>
        <button @click="router.push('/login')" class="w-full py-2.5 rounded-xl bg-brand-600 text-white font-medium active:scale-95">
          登录 / 注册
        </button>
      </template>

      <template v-else>
        <p class="text-xs text-slate-500 mb-1">当前账号</p>
        <p class="text-sm font-medium text-slate-800 mb-3">{{ auth.user?.email }}</p>
        <button @click="doSync" :disabled="syncing" class="w-full py-2.5 rounded-xl bg-brand-50 text-brand-700 font-medium active:scale-95 disabled:opacity-50">
          {{ syncing ? '同步中...' : '🔄 立即同步' }}
        </button>
        <p v-if="syncMsg" class="text-xs text-slate-500 mt-2 text-center">{{ syncMsg }}</p>
        <button @click="signOut" class="w-full mt-2 py-1.5 text-xs text-slate-400">退出登录</button>
      </template>
    </section>

    <!-- 题库信息 -->
    <section class="rounded-2xl bg-white border border-slate-200 p-4 mb-3">
      <h2 class="text-sm font-semibold text-slate-600 mb-2">📚 题库信息</h2>
      <dl class="text-sm space-y-1.5">
        <div class="flex justify-between"><dt class="text-slate-500">题目总数</dt><dd class="font-medium">{{ questionDB.total }} 题</dd></div>
        <div class="flex justify-between"><dt class="text-slate-500">题型分布</dt><dd class="font-medium">选 {{ questionDB.byType.choice }} · 填 {{ questionDB.byType.fill }} · 简 {{ questionDB.byType.short }}</dd></div>
        <div class="flex justify-between"><dt class="text-slate-500">数据更新</dt><dd class="font-medium text-xs">{{ new Date(questionDB.generatedAt).toLocaleString('zh-CN') }}</dd></div>
        <div class="flex justify-between"><dt class="text-slate-500">数据来源</dt><dd class="font-medium text-xs truncate ml-2" style="max-width: 12rem;">面试复习每日练习.md</dd></div>
      </dl>
    </section>

    <!-- PWA 安装 -->
    <section class="rounded-2xl bg-white border border-slate-200 p-4 mb-3">
      <h2 class="text-sm font-semibold text-slate-600 mb-2">📱 安装到设备</h2>
      <p v-if="isStandalone" class="text-sm text-green-600">✅ 已作为 App 运行</p>
      <template v-else>
        <p class="text-xs text-slate-500 mb-3">装到手机/桌面主屏幕，像原生 App 一样离线使用：</p>
        <button
          v-if="deferredPrompt"
          @click="install"
          class="w-full py-2.5 rounded-xl bg-brand-600 text-white font-medium active:scale-95"
        >安装到主屏幕</button>
        <p v-else class="text-xs text-slate-400 leading-relaxed">
          · Chrome/Edge：菜单 → "安装应用"<br />
          · iOS Safari：分享 → "添加到主屏幕"
        </p>
      </template>
    </section>

    <!-- 数据 -->
    <section v-if="stats" class="rounded-2xl bg-white border border-slate-200 p-4 mb-3">
      <h2 class="text-sm font-semibold text-slate-600 mb-2">💾 本地数据</h2>
      <dl class="text-sm space-y-1.5">
        <div class="flex justify-between"><dt class="text-slate-500">答题记录</dt><dd class="font-medium">{{ stats.total }} 条</dd></div>
        <div class="flex justify-between"><dt class="text-slate-500">错题本</dt><dd class="font-medium">{{ stats.unresolvedWrong }} 题</dd></div>
      </dl>
      <button @click="clearData" class="w-full mt-3 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-medium active:scale-95">
        清空本地记录与错题本
      </button>
    </section>

    <p class="text-center text-xs text-slate-400 mt-6">
      面试刷题宝 · 题库随部署同步，记录随账号同步
    </p>
  </div>
</template>
