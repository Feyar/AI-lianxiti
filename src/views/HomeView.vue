<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'
import { useProgressStore } from '@/stores/progress'

const router = useRouter()
const quiz = useQuizStore()
const progress = useProgressStore()

const dueCount = ref(0)
const stats = ref<Awaited<ReturnType<typeof progress.getStats>> | null>(null)

onMounted(async () => {
  dueCount.value = (await progress.getDueWrong()).length
  stats.value = await progress.getStats()
})

function go(mode: string, query?: Record<string, string | number>) {
  router.push({ name: 'practice', params: { mode }, query })
}
</script>

<template>
  <div class="px-4 pt-6">
    <div class="mb-5">
      <h1 class="text-2xl font-bold">个人刷题宝</h1>
      <p class="text-sm text-slate-500 mt-1">题库 {{ quiz.questions.length }} 题 · 关联 Obsidian 每日练习</p>
    </div>

    <!-- 今日练习主卡 -->
    <button
      @click="go('today')"
      class="w-full text-left rounded-2xl p-5 bg-gradient-to-br from-brand-500 to-purple-600 text-white shadow-lg active:scale-[0.99] transition"
    >
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs opacity-80">今日练习</p>
          <p class="text-xl font-bold mt-1">15 题混合训练</p>
          <p class="text-xs opacity-80 mt-1.5">选择 6 · 填空 5 · 简答 4</p>
        </div>
        <div class="text-4xl">📝</div>
      </div>
    </button>

    <div class="grid grid-cols-2 gap-3 mt-4">
      <button @click="go('random')" class="rounded-2xl p-4 bg-white border border-slate-200 active:scale-[0.98] transition text-left">
        <div class="text-2xl mb-1">🎲</div>
        <p class="font-semibold text-sm">随机 15 题</p>
        <p class="text-xs text-slate-500">全库随机抽</p>
      </button>
      <button @click="go('wrong')" class="relative rounded-2xl p-4 bg-white border border-slate-200 active:scale-[0.98] transition text-left">
        <div class="text-2xl mb-1">📕</div>
        <p class="font-semibold text-sm">错题重刷</p>
        <p class="text-xs text-slate-500">到期 {{ dueCount }} 题</p>
        <span v-if="dueCount > 0" class="absolute top-2 right-2 min-w-5 h-5 px-1 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">{{ dueCount }}</span>
      </button>
    </div>

    <!-- 总览 -->
    <div v-if="stats" class="mt-5">
      <h2 class="text-sm font-semibold text-slate-600 mb-2">学习概览</h2>
      <div class="grid grid-cols-3 gap-3">
        <div class="rounded-xl bg-white border border-slate-200 p-3 text-center">
          <p class="text-xl font-bold text-brand-600">{{ stats.total }}</p>
          <p class="text-xs text-slate-500 mt-0.5">累计答题</p>
        </div>
        <div class="rounded-xl bg-white border border-slate-200 p-3 text-center">
          <p class="text-xl font-bold text-green-600">{{ (stats.accuracy * 100).toFixed(0) }}<span class="text-sm">%</span></p>
          <p class="text-xs text-slate-500 mt-0.5">正确率</p>
        </div>
        <div class="rounded-xl bg-white border border-slate-200 p-3 text-center">
          <p class="text-xl font-bold text-red-500">{{ stats.unresolvedWrong }}</p>
          <p class="text-xs text-slate-500 mt-0.5">未消灭错题</p>
        </div>
      </div>
    </div>

    <button
      v-if="quiz.session"
      @click="router.push(`/practice/${quiz.session.mode}`)"
      class="w-full mt-4 rounded-xl p-3 bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium active:scale-[0.98] transition flex items-center justify-between"
    >
      <span>▶ 继续上次：{{ quiz.session.title }}（{{ quiz.session.results.length }}/{{ quiz.session.questions.length }}）</span>
      <span>→</span>
    </button>

    <button
      @click="router.push('/browse')"
      class="w-full mt-3 rounded-xl p-3 bg-white border border-slate-200 text-slate-600 text-sm font-medium active:scale-[0.98] transition flex items-center justify-between"
    >
      <span>📚 按知识点 / Day 浏览</span>
      <span>→</span>
    </button>
  </div>
</template>
