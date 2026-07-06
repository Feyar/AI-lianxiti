<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'
import { useProgressStore } from '@/stores/progress'
import type { CategoryMastery } from '@/utils/analytics'

const router = useRouter()
const quiz = useQuizStore()
const progress = useProgressStore()

const mastery = ref<CategoryMastery[]>([])
const loading = ref(true)

onMounted(async () => {
  const analytics = await progress.getAnalytics()
  mastery.value = analytics.categoryMastery
  loading.value = false
})

const dayNodes = computed(() =>
  quiz.byDay.map(([day, qs]) => {
    const cats = new Set(qs.map((q) => q.category))
    const catMastery = mastery.value.filter((c) => cats.has(c.name))
    const avgScore = catMastery.length > 0
      ? catMastery.reduce((s, c) => s + c.score, 0) / catMastery.length
      : 0
    return { day, count: qs.length, categories: [...cats], avgScore }
  })
)

const categoryNodes = computed(() =>
  mastery.value.map((c) => ({
    name: c.name,
    total: c.total,
    practiced: c.practiced,
    accuracy: c.accuracy,
    wrongCount: c.wrongCount,
    score: c.score
  }))
)

function scoreColor(score: number): string {
  if (score >= 70) return 'bg-green-500'
  if (score >= 40) return 'bg-amber-500'
  if (score > 0) return 'bg-red-500'
  return 'bg-slate-300'
}

function scoreTextColor(score: number): string {
  if (score >= 70) return 'text-green-700'
  if (score >= 40) return 'text-amber-700'
  if (score > 0) return 'text-red-700'
  return 'text-slate-500'
}

function scoreBorder(score: number): string {
  if (score >= 70) return 'border-green-300'
  if (score >= 40) return 'border-amber-300'
  if (score > 0) return 'border-red-300'
  return 'border-slate-200'
}

function practiceCat(cat: string) {
  router.push({ name: 'practice', params: { mode: 'category' }, query: { cat } })
}

function practiceDay(day: number) {
  router.push({ name: 'practice', params: { mode: 'day' }, query: { day } })
}
</script>

<template>
  <div class="px-4 pt-6 pb-4">
    <h1 class="text-2xl font-bold mb-1">知识地图</h1>
    <p class="text-xs text-slate-500 mb-4">颜色越绿掌握越好，越红越薄弱</p>

    <div class="flex gap-3 mb-4 text-[10px]">
      <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-slate-300"></span>未练</span>
      <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-red-500"></span>薄弱</span>
      <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>练习不足</span>
      <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-green-500"></span>掌握较好</span>
    </div>

    <div v-if="loading" class="text-center text-slate-400 py-10">加载中...</div>

    <template v-else>
      <!-- Day 总览 -->
      <section class="mb-5">
        <h2 class="text-sm font-semibold text-slate-600 mb-2">Day 进度</h2>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="d in dayNodes"
            :key="d.day"
            @click="practiceDay(d.day)"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium active:scale-95 transition border"
            :class="scoreBorder(d.avgScore)"
          >
            <span class="w-2 h-2 rounded-full" :class="scoreColor(d.avgScore)"></span>
            <span>D{{ d.day }}</span>
            <span class="text-slate-400">{{ d.count }}</span>
          </button>
        </div>
      </section>

      <!-- 知识点详情 -->
      <section>
        <h2 class="text-sm font-semibold text-slate-600 mb-2">知识点掌握度</h2>
        <div class="space-y-2">
          <button
            v-for="c in categoryNodes"
            :key="c.name"
            @click="practiceCat(c.name)"
            class="w-full text-left rounded-xl border p-3.5 active:scale-[0.98] transition"
            :class="scoreBorder(c.score)"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full flex-none" :class="scoreColor(c.score)"></span>
                <span class="font-medium text-sm text-slate-800">{{ c.name }}</span>
              </div>
              <span class="text-sm font-bold" :class="scoreTextColor(c.score)">{{ Math.round(c.score) }}分</span>
            </div>
            <div class="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1.5">
              <div
                class="h-full rounded-full transition-all"
                :class="scoreColor(c.score)"
                :style="{ width: c.score + '%' }"
              />
            </div>
            <div class="flex gap-3 text-[10px] text-slate-400">
              <span>共 {{ c.total }} 题</span>
              <span>已练 {{ c.practiced }}</span>
              <span>正确率 {{ (c.accuracy * 100).toFixed(0) }}%</span>
              <span v-if="c.wrongCount > 0" class="text-red-500">{{ c.wrongCount }} 错</span>
            </div>
          </button>
        </div>
      </section>
    </template>
  </div>
</template>
