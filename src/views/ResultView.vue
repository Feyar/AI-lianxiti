<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'

const router = useRouter()
const quiz = useQuizStore()

onMounted(() => {
  if (!quiz.session) router.replace('/')
})

const correctCount = computed(() => quiz.session?.results.filter((r) => r.correct).length ?? 0)
const answeredCount = computed(() => quiz.session?.results.length ?? 0)
const totalCount = computed(() => quiz.session?.questions.length ?? 0)
const accuracy = computed(() => (answeredCount.value ? Math.round((correctCount.value / answeredCount.value) * 100) : 0))

const wrongList = computed(() => {
  if (!quiz.session) return []
  return quiz.session.questions
    .map((q) => ({ q, r: quiz.resultOf(q.id) }))
    .filter((x) => x.r && !x.r.correct)
})

const emoji = computed(() => {
  if (answeredCount.value === 0) return '📝'
  if (accuracy.value >= 80) return '🎉'
  if (accuracy.value >= 60) return '💪'
  return '📚'
})
const encourage = computed(() => {
  if (answeredCount.value === 0) return '本次没有作答记录'
  if (accuracy.value >= 80) return '掌握得很扎实！'
  if (accuracy.value >= 60) return '不错，错题记得复盘'
  return '薄弱点已加入错题本，继续加油'
})

function review(id: string) {
  // 进入浏览模式回看单题
  router.push({ name: 'practice', params: { mode: 'browse' }, query: { ids: id } })
}
function again() {
  if (!quiz.session) return router.push('/')
  const mode = quiz.session.mode
  quiz.endSession()
  router.replace(`/practice/${mode}`)
}
function home() {
  router.push('/')
}
</script>

<template>
  <div v-if="quiz.session" class="px-4 pt-8">
    <div class="text-center">
      <div class="text-6xl mb-2">{{ emoji }}</div>
      <h1 class="text-2xl font-bold">{{ correctCount }} / {{ answeredCount }}</h1>
      <p class="text-sm text-slate-500 mt-1">{{ quiz.session.title }} · 正确率 {{ accuracy }}%</p>
      <p class="text-xs text-slate-400 mt-2">{{ encourage }}</p>
    </div>

    <!-- 错题回顾 -->
    <div v-if="wrongList.length > 0" class="mt-6">
      <h2 class="text-sm font-semibold text-slate-600 mb-2">错题（{{ wrongList.length }}）· 已自动加入错题本</h2>
      <div class="space-y-2">
        <button
          v-for="{ q } in wrongList"
          :key="q.id"
          @click="review(q.id)"
          class="w-full text-left rounded-xl bg-white border border-slate-200 p-3 active:scale-[0.98] transition"
        >
          <div class="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span class="font-mono">{{ q.id }}</span>
            <span class="px-1.5 py-0.5 bg-slate-100 rounded">{{ q.category }}</span>
          </div>
          <p class="text-sm text-slate-700 line-clamp-2">{{ q.stem }}</p>
        </button>
      </div>
    </div>

    <div class="mt-8 grid grid-cols-2 gap-3">
      <button @click="again" class="py-3 rounded-xl bg-brand-600 text-white font-semibold active:scale-[0.98] transition">
        再来一组
      </button>
      <button @click="home" class="py-3 rounded-xl bg-slate-200 text-slate-600 font-semibold active:scale-[0.98] transition">
        回首页
      </button>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
