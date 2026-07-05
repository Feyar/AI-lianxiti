<script setup lang="ts">
import { computed } from 'vue'
import type { Question } from '@/types'
import type { SessionResult } from '@/stores/quiz'
import ChoiceQuestion from './ChoiceQuestion.vue'
import FillQuestion from './FillQuestion.vue'
import ShortQuestion from './ShortQuestion.vue'

const props = defineProps<{
  question: Question
  index: number
  total: number
  existingResult?: SessionResult
}>()

const emit = defineEmits<{
  answered: [p: { userAnswer: string; correct: boolean; detail?: unknown; selfRating?: 'ok' | 'partial' | 'no' }]
  nav: [dir: 'prev' | 'next']
  finish: []
}>()

const typeLabel = { choice: '选择题', fill: '填空题', short: '简答题' } as const
const typeColor = {
  choice: 'bg-blue-100 text-blue-700',
  fill: 'bg-purple-100 text-purple-700',
  short: 'bg-emerald-100 text-emerald-700'
} as const

const answered = computed(() => !!props.existingResult)
const last = computed(() => props.index === props.total - 1)

function onAnswer(p: { userAnswer: string; correct: boolean; detail?: unknown; selfRating?: 'ok' | 'partial' | 'no' }) {
  emit('answered', p)
}
</script>

<template>
  <article class="px-4 py-4">
    <!-- 题头 -->
    <div class="flex items-center gap-2 mb-3 text-xs">
      <span class="font-mono text-slate-400">{{ question.id }}</span>
      <span class="px-2 py-0.5 rounded-full font-medium" :class="typeColor[question.type]">
        {{ typeLabel[question.type] }}
      </span>
      <span class="text-slate-400">·</span>
      <span class="text-slate-500 truncate">{{ question.category }}</span>
      <span class="ml-auto text-slate-400">{{ index + 1 }}/{{ total }}</span>
    </div>

    <!-- 题型分发 -->
    <component :is="{
      choice: ChoiceQuestion,
      fill: FillQuestion,
      short: ShortQuestion
    }[question.type]" :question="question" @submit="onAnswer" />

    <!-- 底部导航 -->
    <div class="mt-8 flex gap-2">
      <button
        v-if="index > 0"
        @click="emit('nav', 'prev')"
        class="flex-none px-4 py-2.5 rounded-xl bg-slate-200 text-slate-600 font-medium active:scale-95"
      >
        上一题
      </button>
      <button
        v-if="answered && !last"
        @click="emit('nav', 'next')"
        class="flex-1 py-2.5 rounded-xl bg-brand-600 text-white font-semibold active:scale-[0.98] transition"
      >
        下一题 →
      </button>
      <button
        v-if="answered && last"
        @click="emit('finish')"
        class="flex-1 py-2.5 rounded-xl bg-green-600 text-white font-semibold active:scale-[0.98] transition"
      >
        🎉 查看结果
      </button>
      <p v-if="!answered" class="flex-1 text-center text-xs text-slate-400 self-center">
        答完本题解锁下一题
      </p>
    </div>
  </article>
</template>
