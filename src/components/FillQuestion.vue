<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Question } from '@/types'
import { gradeFill, type FillDetail } from '@/utils/grade'
import { renderInline } from '@/utils/text'

const props = defineProps<{ question: Question }>()
const emit = defineEmits<{
  submit: [p: { userAnswer: string; correct: boolean; detail?: FillDetail[]; selfRating?: 'ok' | 'partial' | 'no' }]
}>()

const parts = computed(() => props.question.stem.split(/_{3,}/))
const inputs = ref<string[]>([])
const submitted = ref(false)
const detail = ref<FillDetail[]>([])
const selfOverride = ref<'ok' | 'partial' | 'no' | null>(null)

watch(
  () => props.question.id,
  () => {
    inputs.value = (props.question.blanks ?? []).map(() => '')
    submitted.value = false
    detail.value = []
    selfOverride.value = null
  },
  { immediate: true }
)

const autoCorrect = computed(() => detail.value.length > 0 && detail.value.every((d) => d.ok))
const finalCorrect = computed(() => (selfOverride.value ? selfOverride.value === 'ok' : autoCorrect.value))

function submit() {
  if (submitted.value) return
  const r = gradeFill(inputs.value, props.question)
  detail.value = r.detail
  submitted.value = true
  emit('submit', { userAnswer: JSON.stringify(inputs.value), correct: r.correct, detail: r.detail })
}

function selfRate(r: 'ok' | 'partial' | 'no') {
  selfOverride.value = r
  emit('submit', {
    userAnswer: JSON.stringify(inputs.value),
    correct: r === 'ok',
    detail: detail.value,
    selfRating: r
  })
}

function inputClass(i: number) {
  if (!submitted.value) return 'border-slate-300 bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-200'
  const ok = detail.value[i]?.ok
  return ok
    ? 'border-green-500 bg-green-50 text-green-700'
    : 'border-red-500 bg-red-50 text-red-700'
}
</script>

<template>
  <div>
    <!-- 题干：按 ___ 拆分，中间插输入框 -->
    <p class="text-[17px] leading-loose font-medium flex flex-wrap items-center gap-x-1 gap-y-2">
      <template v-for="(part, i) in parts" :key="i">
        <span v-html="renderInline(part)" />
        <input
          v-if="i < parts.length - 1"
          v-model="inputs[i]"
          :disabled="submitted"
          @keyup.enter="submit"
          :placeholder="`空${i + 1}`"
          class="inline-block min-w-[4rem] max-w-[10rem] flex-1 px-2 py-0.5 rounded-lg border-2 text-center font-mono outline-none transition"
          :class="inputClass(i)"
        />
      </template>
    </p>

    <button
      v-if="!submitted"
      @click="submit"
      class="w-full mt-5 py-3 rounded-xl bg-brand-600 text-white font-semibold active:scale-[0.98] transition"
    >
      提交判分
    </button>

    <!-- 提交后对照 -->
    <div v-if="submitted" class="mt-4 space-y-2">
      <div
        v-for="(d, i) in detail"
        :key="i"
        class="rounded-lg p-3 text-sm flex items-center gap-2"
        :class="d.ok ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'"
      >
        <span>{{ d.ok ? '✅' : '❌' }} 空{{ i + 1 }}</span>
        <span class="text-slate-500">你：</span>
        <span class="font-mono">{{ d.got || '（空）' }}</span>
        <span class="text-slate-400">→</span>
        <span class="text-slate-500">标：</span>
        <span class="font-mono font-bold">{{ d.expect }}</span>
      </div>

      <p class="text-xs text-slate-400 mt-3 mb-2">自动判分偏严，宽松点可自评覆盖：</p>
      <div class="flex gap-2">
        <button @click="selfRate('ok')" class="flex-1 py-1.5 rounded-lg bg-green-100 text-green-700 text-sm font-medium active:scale-95">✅ 我对了</button>
        <button @click="selfRate('partial')" class="flex-1 py-1.5 rounded-lg bg-amber-100 text-amber-700 text-sm font-medium active:scale-95">⚠️ 部分对</button>
        <button @click="selfRate('no')" class="flex-1 py-1.5 rounded-lg bg-red-100 text-red-700 text-sm font-medium active:scale-95">❌ 不会</button>
      </div>
    </div>
  </div>
</template>
