<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'

const router = useRouter()
const quiz = useQuizStore()
const tab = ref<'day' | 'category'>('day')

const dayList = computed(() =>
  quiz.byDay.map(([day, qs]) => ({ day, count: qs.length, title: qs[0]?.category ?? '' }))
)

const categoryList = computed(() => {
  const m = new Map<string, number>()
  const t = new Map<string, number>()
  for (const q of quiz.questions) {
    m.set(q.category, (m.get(q.category) || 0) + 1)
    if (q.type === 'choice') t.set(q.category, (t.get(q.category) || 0) + 1)
  }
  return [...m.entries()].map(([name, count]) => ({ name, count }))
})

function go(mode: 'day' | 'category', query: Record<string, string | number>) {
  router.push({ name: 'practice', params: { mode }, query })
}
</script>

<template>
  <div class="px-4 pt-6">
    <h1 class="text-2xl font-bold mb-4">浏览题库</h1>

    <div class="flex bg-slate-200 rounded-xl p-1 mb-4">
      <button
        @click="tab = 'day'"
        class="flex-1 py-1.5 rounded-lg text-sm font-medium transition"
        :class="tab === 'day' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500'"
      >按 Day</button>
      <button
        @click="tab = 'category'"
        class="flex-1 py-1.5 rounded-lg text-sm font-medium transition"
        :class="tab === 'category' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500'"
      >按知识点</button>
    </div>

    <div v-if="tab === 'day'" class="space-y-2">
      <button
        v-for="d in dayList"
        :key="d.day"
        @click="go('day', { day: d.day })"
        class="w-full text-left rounded-xl bg-white border border-slate-200 p-3.5 active:scale-[0.98] transition flex items-center"
      >
        <span class="flex-none w-12 h-12 rounded-xl bg-brand-100 text-brand-600 font-bold flex items-center justify-center">D{{ d.day }}</span>
        <div class="ml-3 flex-1 min-w-0">
          <p class="font-medium text-sm text-slate-800 truncate">{{ d.title }}</p>
          <p class="text-xs text-slate-400">{{ d.count }} 题</p>
        </div>
        <span class="text-slate-300">›</span>
      </button>
    </div>

    <div v-else class="space-y-2">
      <button
        v-for="c in categoryList"
        :key="c.name"
        @click="go('category', { cat: c.name })"
        class="w-full text-left rounded-xl bg-white border border-slate-200 p-3.5 active:scale-[0.98] transition flex items-center justify-between"
      >
        <span class="font-medium text-sm text-slate-800">{{ c.name }}</span>
        <span class="text-xs text-slate-400">{{ c.count }} 题 ›</span>
      </button>
    </div>
  </div>
</template>
