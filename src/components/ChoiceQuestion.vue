<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Question } from '@/types'
import { gradeChoice } from '@/utils/grade'
import { renderInline } from '@/utils/text'

const props = defineProps<{ question: Question }>()
const emit = defineEmits<{
  submit: [p: { userAnswer: string; correct: boolean; selfRating?: 'ok' | 'partial' | 'no' }]
}>()

const selected = ref('')
const submitted = ref(false)

// 缺选项的对照模式
const revealed = ref(false)

watch(
  () => props.question.id,
  () => {
    selected.value = ''
    submitted.value = false
    revealed.value = false
  },
  { immediate: true }
)

function choose(key: string) {
  if (submitted.value) return
  selected.value = key
}

function submit() {
  if (!selected.value || submitted.value) return
  submitted.value = true
  emit('submit', { userAnswer: selected.value, correct: gradeChoice(selected.value, props.question) })
}

function selfRate(r: 'ok' | 'partial' | 'no') {
  submitted.value = true
  emit('submit', { userAnswer: selected.value || r, correct: r === 'ok', selfRating: r })
}

function optionClass(key: string) {
  if (!submitted.value) {
    return selected.value === key
      ? 'border-brand-500 bg-brand-50 text-brand-700'
      : 'border-slate-200 bg-white hover:border-brand-300'
  }
  // 已提交：正确答案绿、用户选错的红
  const isAnswer = props.question.answer === key
  if (isAnswer) return 'border-green-500 bg-green-50 text-green-700'
  if (selected.value === key) return 'border-red-500 bg-red-50 text-red-700'
  return 'border-slate-200 bg-white opacity-60'
}
</script>

<template>
  <div>
    <!-- 题干 -->
    <p class="text-[17px] leading-relaxed font-medium" v-html="renderInline(question.stem)" />

    <!-- 缺选项：对照模式 -->
    <div v-if="question.incomplete" class="mt-4">
      <div v-if="!revealed" class="rounded-xl bg-amber-50 border border-amber-200 p-4 text-center">
        <p class="text-sm text-amber-700 mb-3">题目未展开选项，先在心里想答案，再点开对照</p>
        <button
          @click="revealed = true"
          class="px-5 py-2 bg-amber-500 text-white rounded-lg font-medium active:scale-95 transition"
        >
          查看答案
        </button>
      </div>
      <div v-else class="rounded-xl bg-green-50 border border-green-200 p-4">
        <p class="text-sm text-slate-600 mb-1">参考答案</p>
        <p class="text-lg font-bold text-green-700 mb-2">{{ question.answer }}</p>
        <p v-if="question.explanation" class="text-sm text-slate-600">{{ question.explanation }}</p>
        <div class="mt-4">
          <p class="text-xs text-slate-500 mb-2">自评一下：</p>
          <div class="flex gap-2">
            <button @click="selfRate('ok')" class="flex-1 py-2 rounded-lg bg-green-500 text-white font-medium active:scale-95">✅ 全对</button>
            <button @click="selfRate('partial')" class="flex-1 py-2 rounded-lg bg-amber-500 text-white font-medium active:scale-95">⚠️ 部分</button>
            <button @click="selfRate('no')" class="flex-1 py-2 rounded-lg bg-red-500 text-white font-medium active:scale-95">❌ 不会</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 正常选择题 -->
    <div v-else class="mt-4 space-y-2.5">
      <button
        v-for="opt in question.options"
        :key="opt.key"
        @click="choose(opt.key)"
        :disabled="submitted"
        class="w-full text-left p-3.5 rounded-xl border-2 transition-all flex items-start gap-3"
        :class="optionClass(opt.key)"
      >
        <span class="flex-none w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-sm font-bold">
          {{ opt.key }}
        </span>
        <span class="pt-0.5 leading-snug" v-html="renderInline(opt.text)" />
      </button>

      <button
        v-if="!submitted"
        @click="submit"
        :disabled="!selected"
        class="w-full mt-4 py-3 rounded-xl bg-brand-600 text-white font-semibold disabled:opacity-40 active:scale-[0.98] transition"
      >
        提交判分
      </button>

      <div v-if="submitted" class="mt-4">
        <div v-if="question.explanation" class="text-sm text-slate-500 mb-2">
          💡 {{ question.explanation }}
        </div>
        <p class="text-xs text-slate-400 mb-2">判错了？可自评覆盖：</p>
        <div class="flex gap-2">
          <button @click="selfRate('ok')" class="flex-1 py-1.5 rounded-lg bg-green-100 text-green-700 text-sm font-medium active:scale-95">✅ 我对了</button>
          <button @click="selfRate('no')" class="flex-1 py-1.5 rounded-lg bg-red-100 text-red-700 text-sm font-medium active:scale-95">❌ 确实错</button>
        </div>
      </div>
    </div>
  </div>
</template>
