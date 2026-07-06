<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuizStore, type Mode } from '@/stores/quiz'
import { useProgressStore } from '@/stores/progress'
import QuestionCard from '@/components/QuestionCard.vue'

const props = defineProps<{ mode: Mode }>()
const router = useRouter()
const route = useRoute()
const quiz = useQuizStore()
const progress = useProgressStore()

const ready = ref(false)
const errorMsg = ref('')

onMounted(async () => {
  // 已有同模式会话 → 继续
  if (quiz.session && quiz.session.mode === props.mode) {
    ready.value = true
    return
  }
  let qs
  const m = props.mode
  if (m === 'today') qs = quiz.buildToday()
  else if (m === 'random') qs = quiz.buildRandom(15)
  else if (m === 'wrong') qs = progress.wrongToQuestions(await progress.getDueWrong())
  else if (m === 'day') qs = quiz.buildByDay(Number(route.query.day))
  else if (m === 'category') qs = quiz.buildByCategory(String(route.query.cat))
  else if (m === 'browse') qs = quiz.buildByIds(String(route.query.ids || '').split(',').filter(Boolean))
  else if (m === 'interview') qs = quiz.buildInterview()
  else if (m === 'cram') {
    const wrongItems = await progress.getAllWrong()
    const wrongIds = wrongItems.map((w) => w.questionId)
    qs = quiz.buildCram(wrongIds)
  }
  else if (m === 'recommended') {
    const ids = String(route.query.ids || '').split(',').filter(Boolean)
    if (ids.length > 0) qs = quiz.buildByIds(ids)
    else {
      const analytics = await progress.getAnalytics()
      qs = quiz.buildByIds(analytics.recommendedQuestionIds)
    }
  }

  if (!qs || qs.length === 0) {
    errorMsg.value = '该模式下暂无题目'
    return
  }
  const titles: Record<string, string> = {
    today: '今日练习',
    random: '随机 15 题',
    wrong: '错题重刷',
    day: `Day ${route.query.day}`,
    category: String(route.query.cat || '分类练习'),
    browse: '浏览模式',
    interview: '模拟面试',
    cram: '考前冲刺',
    recommended: '薄弱点专练'
  }
  quiz.startSession(m, titles[m] || '练习', qs)
  ready.value = true
})

const currentQuestion = computed(() => quiz.session?.questions[quiz.session.index])
const existingResult = computed(() =>
  currentQuestion.value ? quiz.resultOf(currentQuestion.value.id) : undefined
)
const progressPct = computed(() => {
  if (!quiz.session) return 0
  return Math.round((quiz.session.results.length / quiz.session.questions.length) * 100)
})

async function onAnswered(p: { userAnswer: string; correct: boolean; detail?: unknown; selfRating?: 'ok' | 'partial' | 'no' }) {
  if (!currentQuestion.value) return
  await quiz.recordResult({ questionId: currentQuestion.value.id, ...p })
}
function onNav(dir: 'prev' | 'next') {
  dir === 'prev' ? quiz.prev() : quiz.next()
}
function onFinish() {
  router.push('/result')
}
function exit() {
  if (quiz.session && quiz.session.results.length < quiz.session.questions.length) {
    if (!confirm('练习还没做完，确定退出吗？进度会保留。')) return
  }
  router.push('/')
}
</script>

<template>
  <div v-if="errorMsg" class="px-4 py-20 text-center text-slate-500">
    <p class="text-5xl mb-3">🗂️</p>
    <p>{{ errorMsg }}</p>
    <button @click="router.push('/')" class="mt-4 px-4 py-2 bg-brand-600 text-white rounded-lg">回首页</button>
  </div>

  <div v-else-if="ready && quiz.session && currentQuestion" class="min-h-full flex flex-col">
    <header
      class="sticky top-0 bg-white/95 backdrop-blur border-b border-slate-200 px-4 py-2.5 z-10"
      style="padding-top: calc(0.625rem + var(--safe-top));"
    >
      <div class="flex items-center gap-3">
        <button @click="exit" class="text-slate-400 text-2xl leading-none w-6 -mt-0.5">×</button>
        <div class="flex-1">
          <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span class="font-medium text-slate-700">{{ quiz.session.title }}</span>
            <span>{{ quiz.session.results.length }}/{{ quiz.session.questions.length }}</span>
          </div>
          <div class="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div class="h-full bg-brand-500 transition-all duration-300" :style="{ width: progressPct + '%' }" />
          </div>
        </div>
      </div>
    </header>

    <QuestionCard
      :key="currentQuestion.id"
      :question="currentQuestion"
      :index="quiz.session.index"
      :total="quiz.session.questions.length"
      :existing-result="existingResult"
      @answered="onAnswered"
      @nav="onNav"
      @finish="onFinish"
    />
  </div>

  <div v-else class="px-4 py-20 text-center text-slate-400">
    <p>加载中...</p>
  </div>
</template>
