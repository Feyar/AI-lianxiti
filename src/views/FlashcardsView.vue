<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { allQuestions } from '@/utils/quiz-loader'
import { useProgressStore } from '@/stores/progress'
import type { Question } from '@/types'

const router = useRouter()
const progress = useProgressStore()

const questions = ref<Question[]>([])
const index = ref(0)
const flipped = ref(false)
const rated = ref(false)
const done = ref(0)
const total = ref(0)

onMounted(() => {
  questions.value = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 30)
  total.value = questions.value.length
})

const current = computed(() => questions.value[index.value])
const progressPct = computed(() => total.value ? Math.round((done.value / total.value) * 100) : 0)

function flip() {
  flipped.value = true
}

async function rate(rating: 'ok' | 'partial' | 'no') {
  if (!current.value || rated.value) return
  rated.value = true
  done.value++

  await progress.recordAttempt({
    questionId: current.value.id,
    day: current.value.day,
    category: current.value.category,
    type: current.value.type,
    userAnswer: rating,
    correct: rating === 'ok',
    selfRating: rating,
    at: Date.now(),
    mode: 'flashcard'
  })

  setTimeout(() => {
    if (index.value < questions.value.length - 1) {
      index.value++
      flipped.value = false
      rated.value = false
    }
  }, 300)
}

function getAnswerText(q: Question): string {
  if (q.type === 'choice') {
    const option = q.options?.find(o => o.key === q.answer)
    if (option) return `${q.answer}. ${option.text}`
    // incomplete choice: no options, show answer letter + explanation
    return q.answer ? `${q.answer}. ${q.explanation || ''}` : q.explanation || ''
  }
  if (q.type === 'short') return q.answer || ''
  if (q.type === 'fill') return q.blanks?.join('、') || ''
  return ''
}

function finish() {
  router.push('/')
}

function goPrev() {
  if (index.value > 0) {
    index.value--
    flipped.value = false
    rated.value = false
  }
}

function exit() {
  if (done.value < total.value && !confirm('还有未翻的卡片，确定退出吗？')) return
  router.push('/')
}
</script>

<template>
  <div v-if="current" class="min-h-full flex flex-col">
    <!-- Header -->
    <header class="sticky top-0 bg-white/95 backdrop-blur border-b border-slate-200 px-4 py-2.5 z-10"
      style="padding-top: calc(0.625rem + var(--safe-top));">
      <div class="flex items-center gap-3">
        <button @click="exit" class="text-slate-400 text-2xl leading-none w-6 -mt-0.5">×</button>
        <div class="flex-1">
          <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span class="font-medium text-slate-700">闪卡速记</span>
            <span>{{ done }}/{{ total }}</span>
          </div>
          <div class="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div class="h-full bg-brand-500 transition-all duration-300" :style="{ width: progressPct + '%' }" />
          </div>
        </div>
      </div>
    </header>

    <!-- Card -->
    <div class="flex-1 flex flex-col items-center justify-center px-4 py-6">
      <div
        @click="!rated && flip()"
        class="w-full max-w-md aspect-[3/4] rounded-2xl shadow-lg cursor-pointer transition-all duration-300 overflow-hidden"
        :class="flipped ? 'bg-white' : 'bg-gradient-to-br from-brand-500 to-purple-600'"
      >
        <!-- Front -->
        <div v-if="!flipped" class="h-full flex flex-col items-center justify-center p-6 text-white text-center">
          <div class="text-xs opacity-70 mb-2">{{ current.id }} · {{ current.category }}</div>
          <div class="text-[10px] px-2 py-0.5 rounded-full bg-white/20 mb-4">
            {{ current.type === 'choice' ? '选择题' : current.type === 'fill' ? '填空题' : '简答题' }}
          </div>
          <p class="text-lg leading-relaxed" v-html="current.stem"></p>
          <p class="text-xs opacity-60 mt-6">点击翻面</p>
        </div>

        <!-- Back -->
        <div v-else class="h-full flex flex-col p-6">
          <div class="text-xs text-slate-400 mb-2">{{ current.id }} · {{ current.category }}</div>

          <!-- Question (repeated on back for context) -->
          <div class="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 mb-3 self-start">
            题目
          </div>
          <p class="text-sm text-slate-700 leading-relaxed mb-3" v-html="current.stem"></p>

          <!-- Answer -->
          <div class="text-[10px] px-2 py-0.5 rounded-full bg-brand-100 text-brand-700 mb-2 self-start">
            答案
          </div>
          <div class="flex-1 overflow-y-auto">
            <p class="text-base text-slate-800 leading-relaxed mb-3">{{ getAnswerText(current) }}</p>
            <p v-if="current.explanation && current.type !== 'choice'" class="text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-xl p-3">
              {{ current.explanation }}
            </p>
          </div>

          <!-- Rating buttons -->
          <div v-if="!rated" class="mt-4 space-y-2">
            <div class="grid grid-cols-3 gap-2">
              <button @click.stop="rate('no')" class="py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 font-semibold text-sm active:scale-95 transition">
                不会
              </button>
              <button @click.stop="rate('partial')" class="py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 font-semibold text-sm active:scale-95 transition">
                模糊
              </button>
              <button @click.stop="rate('ok')" class="py-3 rounded-xl bg-green-50 border border-green-200 text-green-600 font-semibold text-sm active:scale-95 transition">
                记住了
              </button>
            </div>
            <button v-if="index > 0" @click.stop="goPrev" class="w-full py-2 rounded-xl bg-slate-100 text-slate-500 text-xs active:scale-95 transition">
              ← 上一张
            </button>
          </div>
          <div v-else class="mt-4 text-center text-xs text-slate-400">已记录，下一张...</div>
        </div>
      </div>
    </div>

    <!-- Done -->
    <div v-if="done >= total" class="fixed inset-0 bg-black/40 flex items-center justify-center z-20 p-4">
      <div class="bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-xl">
        <div class="text-5xl mb-2">🃏</div>
        <h2 class="text-xl font-bold">闪卡完成！</h2>
        <p class="text-sm text-slate-500 mt-1">已完成 {{ done }} 张卡片</p>
        <div class="grid grid-cols-2 gap-3 mt-4">
          <button @click="finish" class="py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-sm active:scale-95 transition">
            查看结果
          </button>
          <button @click="exit" class="py-2.5 rounded-xl bg-slate-200 text-slate-600 font-semibold text-sm active:scale-95 transition">
            回首页
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="px-4 py-20 text-center text-slate-400">
    <p>加载中...</p>
  </div>
</template>
