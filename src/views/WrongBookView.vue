<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'
import { useProgressStore } from '@/stores/progress'
import { formatRemain, timeUntilReview } from '@/utils/srs'
import type { WrongItem } from '@/types'

const router = useRouter()
const quiz = useQuizStore()
const progress = useProgressStore()

const wrongs = ref<WrongItem[]>([])
const loading = ref(true)

async function refresh() {
  loading.value = true
  wrongs.value = await progress.getAllWrong()
  loading.value = false
}
onMounted(refresh)

const dueCount = ref(0)
onMounted(async () => {
  dueCount.value = (await progress.getDueWrong()).length
})

function practiceDue() {
  router.push({ name: 'practice', params: { mode: 'wrong' } })
}

async function remove(qid: string) {
  if (!confirm('从错题本移除这道题？（下次做错会重新加入）')) return
  await progress.forgetWrong(qid)
  await refresh()
}

function reviewOne(qid: string) {
  router.push({ name: 'practice', params: { mode: 'browse' }, query: { ids: qid } })
}
</script>

<template>
  <div class="px-4 pt-6">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">错题本</h1>
      <button
        v-if="dueCount > 0"
        @click="practiceDue"
        class="px-3 py-1.5 rounded-full bg-red-500 text-white text-xs font-bold active:scale-95"
      >
        重刷到期 {{ dueCount }}
      </button>
    </div>

    <div v-if="loading" class="text-center text-slate-400 py-10">加载中...</div>

    <div v-else-if="wrongs.length === 0" class="text-center py-20">
      <div class="text-5xl mb-3">🎯</div>
      <p class="text-slate-500">错题本是空的</p>
      <p class="text-xs text-slate-400 mt-1">做错的题会自动归集到这里</p>
    </div>

    <div v-else class="space-y-2.5">
      <div
        v-for="w in wrongs"
        :key="w.questionId"
        class="rounded-xl bg-white border border-slate-200 p-3.5"
      >
        <div class="flex items-start justify-between gap-2 mb-1">
          <button @click="reviewOne(w.questionId)" class="text-left flex-1 min-w-0">
            <div class="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span class="font-mono">{{ w.questionId }}</span>
              <span class="px-1.5 py-0.5 bg-slate-100 rounded">{{ w.category }}</span>
              <span class="text-red-500 font-bold">×{{ w.wrongCount }}</span>
            </div>
            <p class="text-sm text-slate-700 line-clamp-2">{{ quiz.getQuestionById(w.questionId)?.stem }}</p>
          </button>
          <button @click="remove(w.questionId)" class="flex-none text-slate-300 text-xs px-2 py-1">移除</button>
        </div>
        <div class="text-xs mt-1" :class="timeUntilReview(w.nextReviewAt) <= 0 ? 'text-red-500 font-medium' : 'text-slate-400'">
          {{ timeUntilReview(w.nextReviewAt) <= 0 ? '🔴 该复习了' : '🕒 ' + formatRemain(timeUntilReview(w.nextReviewAt)) }}
        </div>
      </div>
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
