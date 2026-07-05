<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useProgressStore } from '@/stores/progress'

const progress = useProgressStore()
const stats = ref<Awaited<ReturnType<typeof progress.getStats>> | null>(null)

onMounted(async () => {
  stats.value = await progress.getStats()
})

function refresh() {
  onMounted(() => {})
  progress.getStats().then((s) => (stats.value = s))
}

const recentMax = () => Math.max(1, ...(stats.value?.recent7.map((r) => r.total) || [1]))
</script>

<template>
  <div class="px-4 pt-6 pb-4">
    <h1 class="text-2xl font-bold mb-4">统计</h1>

    <div v-if="!stats" class="text-center text-slate-400 py-10">加载中...</div>

    <template v-else>
      <!-- 顶部数字 -->
      <div class="grid grid-cols-3 gap-3 mb-5">
        <div class="rounded-xl bg-white border border-slate-200 p-3.5 text-center">
          <p class="text-2xl font-bold text-slate-800">{{ stats.total }}</p>
          <p class="text-xs text-slate-500 mt-0.5">累计答题</p>
        </div>
        <div class="rounded-xl bg-white border border-slate-200 p-3.5 text-center">
          <p class="text-2xl font-bold text-green-600">{{ (stats.accuracy * 100).toFixed(0) }}<span class="text-sm">%</span></p>
          <p class="text-xs text-slate-500 mt-0.5">正确率</p>
        </div>
        <div class="rounded-xl bg-white border border-slate-200 p-3.5 text-center">
          <p class="text-2xl font-bold text-red-500">{{ stats.unresolvedWrong }}</p>
          <p class="text-xs text-slate-500 mt-0.5">未消灭错题</p>
        </div>
      </div>

      <!-- 最近 7 天 -->
      <section class="rounded-2xl bg-white border border-slate-200 p-4 mb-4">
        <h2 class="text-sm font-semibold text-slate-600 mb-3">最近 7 天答题量</h2>
        <div class="flex items-end justify-between gap-1.5 h-24">
          <div v-for="(r, i) in stats.recent7" :key="i" class="flex-1 flex flex-col items-center gap-1">
            <div class="w-full flex flex-col gap-0.5 justify-end" style="height: 70px;">
              <div class="w-full bg-green-400 rounded-t" :style="{ height: (r.total ? (r.correct / r.total) * 100 : 0) + '%' }"></div>
              <div class="w-full bg-red-300" :style="{ height: (r.total ? ((r.total - r.correct) / r.total) * 100 : 0) + '%' }"></div>
            </div>
            <div class="text-center">
              <div class="w-full bg-brand-200 rounded-t-sm" :style="{ height: Math.max(2, (r.total / recentMax()) * 24) + 'px' }"></div>
            </div>
            <span class="text-[10px] text-slate-400">{{ r.key }}</span>
            <span class="text-[10px] font-bold" :class="r.total ? 'text-slate-700' : 'text-slate-300'">{{ r.total }}</span>
          </div>
        </div>
      </section>

      <!-- 薄弱知识点（按正确率升序） -->
      <section class="rounded-2xl bg-white border border-slate-200 p-4 mb-4">
        <h2 class="text-sm font-semibold text-slate-600 mb-1">知识点正确率</h2>
        <p class="text-xs text-slate-400 mb-3">从弱到强，优先攻克上面的</p>
        <div v-if="stats.byCategory.length === 0" class="text-sm text-slate-400 py-4 text-center">暂无数据</div>
        <div v-else class="space-y-2.5">
          <div v-for="c in stats.byCategory" :key="c.name">
            <div class="flex items-center justify-between text-xs mb-1">
              <span class="text-slate-700 truncate flex-1">{{ c.name }}</span>
              <span class="text-slate-500 flex-none ml-2">{{ c.correct }}/{{ c.total }} · {{ (c.accuracy * 100).toFixed(0) }}%</span>
            </div>
            <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all"
                :class="c.accuracy >= 0.8 ? 'bg-green-500' : c.accuracy >= 0.6 ? 'bg-amber-500' : 'bg-red-500'"
                :style="{ width: c.accuracy * 100 + '%' }"
              />
            </div>
          </div>
        </div>
      </section>

      <button @click="refresh" class="w-full py-2 text-xs text-slate-400">↻ 刷新统计</button>
    </template>
  </div>
</template>
