<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Question } from '@/types'
import { renderInline } from '@/utils/text'

const props = defineProps<{ question: Question }>()
const emit = defineEmits<{
  submit: [p: { userAnswer: string; correct: boolean; selfRating?: 'ok' | 'partial' | 'no' }]
}>()

const userInput = ref('')
const revealed = ref(false)
const rated = ref<'ok' | 'partial' | 'no' | null>(null)

watch(
  () => props.question.id,
  () => {
    userInput.value = ''
    revealed.value = false
    rated.value = null
  },
  { immediate: true }
)

function selfRate(r: 'ok' | 'partial' | 'no') {
  rated.value = r
  if (!revealed.value) revealed.value = true
  emit('submit', { userAnswer: userInput.value || `(自评:${r})`, correct: r === 'ok', selfRating: r })
}
</script>

<template>
  <div>
    <p class="text-[17px] leading-relaxed font-medium" v-html="renderInline(question.stem)" />

    <p class="text-xs text-slate-400 mt-3 mb-1">写下关键词（不用完整话术）</p>
    <textarea
      v-model="userInput"
      rows="4"
      placeholder="你的答案..."
      class="w-full p-3 rounded-xl border-2 border-slate-200 bg-white outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 text-sm leading-relaxed resize-none"
    />

    <button
      v-if="!revealed"
      @click="revealed = true"
      class="w-full mt-3 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-medium active:scale-[0.98] transition"
    >
      查看参考答案
    </button>

    <div v-if="revealed" class="mt-3 rounded-xl bg-slate-50 border border-slate-200 p-3.5 animate-fade-in">
      <p class="text-xs text-slate-500 mb-1.5 font-medium">参考答案</p>
      <p class="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{{ question.answer }}</p>
    </div>

    <div v-if="revealed" class="mt-4">
      <p class="text-xs text-slate-500 mb-2">对照后自评：</p>
      <div class="flex gap-2">
        <button
          v-for="r in (['ok','partial','no'] as const)"
          :key="r"
          @click="selfRate(r)"
          class="flex-1 py-2.5 rounded-xl font-medium active:scale-95 transition"
          :class="{
            'bg-green-500 text-white': r === 'ok' && rated === 'ok',
            'bg-amber-500 text-white': r === 'partial' && rated === 'partial',
            'bg-red-500 text-white': r === 'no' && rated === 'no',
            'bg-green-100 text-green-700': r === 'ok' && rated !== 'ok',
            'bg-amber-100 text-amber-700': r === 'partial' && rated !== 'partial',
            'bg-red-100 text-red-700': r === 'no' && rated !== 'no'
          }"
        >
          {{ r === 'ok' ? '✅ 全对' : r === 'partial' ? '⚠️ 部分' : '❌ 不会' }}
        </button>
      </div>
    </div>
  </div>
</template>
