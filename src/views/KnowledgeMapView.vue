<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'
import { useProgressStore } from '@/stores/progress'
import type { Question } from '@/types'
import type { CategoryMastery } from '@/utils/analytics'

interface KnowledgeNodeDef {
  id: string
  name: string
  parentId?: string
  aliases: string[]
}

interface KnowledgeNode extends KnowledgeNodeDef {
  children: KnowledgeNode[]
  ownQuestions: Question[]
  questions: Question[]
  total: number
  practiced: number
  wrongCount: number
  accuracy: number
  coverage: number
  score: number
  level: number
}

const router = useRouter()
const quiz = useQuizStore()
const progress = useProgressStore()

const mastery = ref<CategoryMastery[]>([])
const loading = ref(true)

const knowledgeDefs: KnowledgeNodeDef[] = [
  { id: 'root', name: '面试知识体系', aliases: [] },
  { id: 'java', parentId: 'root', name: 'Java 后端', aliases: ['java', 'jdk', 'jvm', 'spring', 'mysql', 'redis', '并发', '集合'] },
  { id: 'ai', parentId: 'root', name: 'AI 应用', aliases: ['ai', 'llm', 'rag', 'agent', 'prompt', '向量', '模型'] },

  { id: 'java.base', parentId: 'java', name: 'Java 基础', aliases: ['java基础', '基础语法', 'object', 'equals', 'hashcode', 'string', '包装类', '泛型', '反射', '注解', '异常'] },
  { id: 'java.collections', parentId: 'java', name: '集合框架', aliases: ['集合', 'hashmap', 'concurrenthashmap', 'arraylist', 'linkedlist', 'hashset', 'map', 'list', 'set', '红黑树', '扩容', '负载因子'] },
  { id: 'java.concurrent', parentId: 'java', name: '并发编程', aliases: ['并发', '线程', '线程池', 'aqs', 'cas', '锁', 'volatile', 'synchronized', 'reentrantlock', 'countdownlatch', 'semaphore', 'future', 'threadlocal'] },
  { id: 'java.jvm', parentId: 'java', name: 'JVM', aliases: ['jvm', 'gc', '垃圾回收', '内存模型', '类加载', '堆', '栈', '方法区', 'g1', 'cms', 'oom'] },
  { id: 'java.spring', parentId: 'java', name: 'Spring 体系', aliases: ['spring', 'springboot', 'spring mvc', 'springcloud', 'ioc', 'aop', 'bean', '事务', '自动配置', 'starter', 'mapper'] },
  { id: 'java.mysql', parentId: 'java', name: 'MySQL / 数据库', aliases: ['mysql', '数据库', 'sql', '索引', '事务', '隔离级别', 'mvcc', 'innodb', '锁', '覆盖索引', 'b+树', '慢查询'] },
  { id: 'java.redis', parentId: 'java', name: 'Redis / 缓存', aliases: ['redis', '缓存', '分布式锁', '过期', '淘汰', '雪崩', '击穿', '穿透', 'zset', 'bitmap', 'lua'] },
  { id: 'java.distributed', parentId: 'java', name: '分布式与系统设计', aliases: ['分布式', '微服务', '消息队列', 'mq', 'kafka', 'rocketmq', '幂等', '限流', '熔断', '一致性', 'cap', 'raft', '注册中心'] },
  { id: 'java.network', parentId: 'java', name: '网络与操作系统', aliases: ['网络', 'tcp', 'http', 'https', 'io', 'nio', '操作系统', '进程', '内存', 'epoll'] },
  { id: 'java.project', parentId: 'java', name: '项目与场景题', aliases: ['项目', '场景', 'mes', 'wms', 'rcs', 'agv', '系统设计', '排查', '优化', '上线'] },

  { id: 'ai.llm', parentId: 'ai', name: 'LLM 基础', aliases: ['llm', '大模型', 'token', '上下文', 'embedding', '微调', '蒸馏', '幻觉'] },
  { id: 'ai.prompt', parentId: 'ai', name: 'Prompt 工程', aliases: ['prompt', '提示词', 'few-shot', 'cot', 'system prompt', '结构化输出'] },
  { id: 'ai.rag', parentId: 'ai', name: 'RAG / 知识库', aliases: ['rag', '检索增强', '知识库', '向量数据库', '召回', '重排', 'chunk', 'rerank'] },
  { id: 'ai.agent', parentId: 'ai', name: 'Agent / 工具调用', aliases: ['agent', 'tool use', '工具调用', '函数调用', 'workflow', '工作流', 'mcp'] },
  { id: 'ai.app', parentId: 'ai', name: 'AI 应用工程', aliases: ['ai应用', '应用工程', 'prompt caching', '流式', '评测', '安全', '成本', '延迟'] },

  { id: 'uncategorized', parentId: 'root', name: '未归类题目', aliases: [] }
]

onMounted(async () => {
  const analytics = await progress.getAnalytics()
  mastery.value = analytics.categoryMastery
  loading.value = false
})

const masteryByName = computed(() => new Map(mastery.value.map((c) => [c.name, c])))

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '')
}

function questionText(q: Question): string {
  return normalizeText([
    q.category,
    q.stem,
    q.answer ?? '',
    q.explanation ?? '',
    q.blanks?.join(' ') ?? ''
  ].join(' '))
}

function matchNode(q: Question): KnowledgeNodeDef {
  const text = questionText(q)
  const candidates = knowledgeDefs.filter((n) => n.parentId && n.id !== 'uncategorized')
  const matched = candidates
    .map((node) => {
      const score = node.aliases.reduce((sum, alias) => {
        const key = normalizeText(alias)
        return key && text.includes(key) ? sum + key.length : sum
      }, 0)
      return { node, score }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || b.node.id.length - a.node.id.length)[0]
  return matched?.node ?? knowledgeDefs.find((n) => n.id === 'uncategorized')!
}

function scoreOf(qs: Question[]): Pick<KnowledgeNode, 'practiced' | 'wrongCount' | 'accuracy' | 'coverage' | 'score'> {
  if (qs.length === 0) return { practiced: 0, wrongCount: 0, accuracy: 0, coverage: 0, score: 0 }

  const cats = new Set(qs.map((q) => q.category))
  const catStats = [...cats].map((cat) => masteryByName.value.get(cat)).filter(Boolean) as CategoryMastery[]
  const byId = new Set(qs.map((q) => q.id))
  const categoryPracticed = catStats.reduce((sum, c) => sum + c.practiced, 0)
  const categoryTotal = catStats.reduce((sum, c) => sum + c.total, 0)
  const practiced = categoryTotal > 0
    ? Math.min(qs.length, Math.round(categoryPracticed * qs.length / categoryTotal))
    : 0
  const wrongCount = catStats.reduce((sum, c) => sum + c.wrongCount, 0)
  const accuracy = catStats.length > 0
    ? catStats.reduce((sum, c) => sum + c.accuracy, 0) / catStats.length
    : 0
  const coverage = qs.length > 0 ? practiced / qs.length : 0
  const score = catStats.length > 0
    ? catStats.reduce((sum, c) => sum + c.score, 0) / catStats.length
    : 0

  return {
    practiced,
    wrongCount: Math.min(wrongCount, byId.size),
    accuracy,
    coverage,
    score: Math.max(0, Math.min(100, score))
  }
}

const tree = computed(() => {
  const nodeMap = new Map<string, KnowledgeNode>()
  for (const def of knowledgeDefs) {
    nodeMap.set(def.id, {
      ...def,
      children: [],
      ownQuestions: [],
      questions: [],
      total: 0,
      practiced: 0,
      wrongCount: 0,
      accuracy: 0,
      coverage: 0,
      score: 0,
      level: def.id.split('.').length - 1
    })
  }

  for (const node of nodeMap.values()) {
    if (!node.parentId) continue
    nodeMap.get(node.parentId)?.children.push(node)
  }

  for (const q of quiz.questions) {
    nodeMap.get(matchNode(q).id)?.ownQuestions.push(q)
  }

  function collect(node: KnowledgeNode): Question[] {
    const questions = [...node.ownQuestions]
    for (const child of node.children) questions.push(...collect(child))
    node.questions = questions
    node.total = questions.length
    Object.assign(node, scoreOf(questions))
    node.children.sort((a, b) => b.total - a.total || a.name.localeCompare(b.name, 'zh-CN'))
    return questions
  }

  const root = nodeMap.get('root')!
  collect(root)
  return root
})

const overview = computed(() => {
  const total = quiz.questions.length
  const mapped = tree.value.total - (tree.value.children.find((n) => n.id === 'uncategorized')?.total ?? 0)
  const practiced = mastery.value.reduce((sum, c) => sum + c.practiced, 0)
  const wrong = mastery.value.reduce((sum, c) => sum + c.wrongCount, 0)
  const weakNodes = flatNodes.value.filter((n) => n.total > 0 && (n.score < 60 || n.wrongCount > 0 || n.coverage < 0.5)).length
  return { total, mapped, practiced, wrong, weakNodes }
})

const flatNodes = computed(() => {
  const result: KnowledgeNode[] = []
  function walk(node: KnowledgeNode) {
    if (node.id !== 'root') result.push(node)
    for (const child of node.children) walk(child)
  }
  walk(tree.value)
  return result
})

const weakNodes = computed(() =>
  flatNodes.value
    .filter((n) => n.total > 0 && (n.score < 60 || n.wrongCount > 0 || n.coverage < 0.5))
    .sort((a, b) => a.score - b.score || b.wrongCount - a.wrongCount)
    .slice(0, 8)
)

function statusOf(node: KnowledgeNode): 'empty' | 'unpracticed' | 'weak' | 'low' | 'good' {
  if (node.total === 0) return 'empty'
  if (node.practiced === 0) return 'unpracticed'
  if (node.score < 40 || node.wrongCount > 2) return 'weak'
  if (node.score < 70 || node.coverage < 0.6) return 'low'
  return 'good'
}

function nodeClass(node: KnowledgeNode): string {
  const status = statusOf(node)
  if (status === 'good') return 'border-green-300 bg-green-50 text-green-800'
  if (status === 'low') return 'border-amber-300 bg-amber-50 text-amber-800'
  if (status === 'weak') return 'border-red-300 bg-red-50 text-red-800'
  if (status === 'unpracticed') return 'border-sky-300 bg-sky-50 text-sky-800'
  return 'border-slate-200 bg-slate-50 text-slate-500'
}

function dotClass(node: KnowledgeNode): string {
  const status = statusOf(node)
  if (status === 'good') return 'bg-green-500'
  if (status === 'low') return 'bg-amber-500'
  if (status === 'weak') return 'bg-red-500'
  if (status === 'unpracticed') return 'bg-sky-500'
  return 'bg-slate-300'
}

function nodeSize(node: KnowledgeNode): string {
  if (node.total >= 80) return 'min-w-[12rem]'
  if (node.total >= 30) return 'min-w-[10.5rem]'
  return 'min-w-[9rem]'
}

function scoreLabel(node: KnowledgeNode): string {
  if (node.total === 0) return '空白'
  if (node.practiced === 0) return '未练'
  return `${Math.round(node.score)}分`
}

function practiceNode(node: KnowledgeNode) {
  const ids = node.questions.map((q) => q.id)
  if (ids.length === 0) return
  router.push({ name: 'practice', params: { mode: 'browse' }, query: { ids: ids.join(',') } })
}
</script>

<template>
  <div class="px-4 pt-6 pb-6">
    <h1 class="text-2xl font-bold mb-1">知识地图</h1>
    <p class="text-xs text-slate-500 mb-4">固定知识体系 + 动态题库挂载，一眼看空白、薄弱和已掌握节点</p>

    <div class="grid grid-cols-2 gap-2 mb-4">
      <div class="rounded-2xl bg-white border border-slate-200 p-3">
        <p class="text-[10px] text-slate-400">总题量</p>
        <p class="text-xl font-bold text-slate-800">{{ overview.total }}</p>
      </div>
      <div class="rounded-2xl bg-white border border-slate-200 p-3">
        <p class="text-[10px] text-slate-400">已挂载</p>
        <p class="text-xl font-bold text-slate-800">{{ overview.mapped }}</p>
      </div>
      <div class="rounded-2xl bg-white border border-slate-200 p-3">
        <p class="text-[10px] text-slate-400">已练覆盖</p>
        <p class="text-xl font-bold text-slate-800">{{ overview.practiced }}</p>
      </div>
      <div class="rounded-2xl bg-white border border-slate-200 p-3">
        <p class="text-[10px] text-slate-400">薄弱节点</p>
        <p class="text-xl font-bold text-red-600">{{ overview.weakNodes }}</p>
      </div>
    </div>

    <div class="flex flex-wrap gap-3 mb-4 text-[10px] text-slate-500">
      <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-slate-300"></span>空白</span>
      <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-sky-500"></span>有题未练</span>
      <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-red-500"></span>薄弱</span>
      <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>练习不足</span>
      <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-green-500"></span>掌握较好</span>
    </div>

    <div v-if="loading" class="text-center text-slate-400 py-10">加载中...</div>

    <template v-else>
      <section class="mb-5">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-sm font-semibold text-slate-600">体系思维导图</h2>
          <span class="text-[10px] text-slate-400">横向滑动查看全图</span>
        </div>

        <div class="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-4">
          <div class="flex items-center gap-6 min-w-max py-2">
            <button
              @click="practiceNode(tree)"
              class="rounded-2xl border px-4 py-3 text-left shadow-sm active:scale-[0.98] transition min-w-[10rem] border-brand-200 bg-brand-50 text-brand-700"
            >
              <p class="text-sm font-bold">{{ tree.name }}</p>
              <p class="text-[10px] mt-1 text-brand-500">{{ tree.total }} 题 · {{ Math.round(tree.score) }}分</p>
            </button>

            <div class="h-px w-6 bg-slate-200"></div>

            <div class="space-y-5">
              <div v-for="domain in tree.children" :key="domain.id" class="flex items-center gap-4">
                <button
                  @click="practiceNode(domain)"
                  class="rounded-2xl border px-4 py-3 text-left shadow-sm active:scale-[0.98] transition"
                  :class="[nodeClass(domain), nodeSize(domain)]"
                >
                  <div class="flex items-center justify-between gap-3">
                    <span class="font-bold text-sm">{{ domain.name }}</span>
                    <span class="w-3 h-3 rounded-full flex-none" :class="dotClass(domain)"></span>
                  </div>
                  <p class="text-[10px] mt-1 opacity-75">{{ domain.total }} 题 · 已练 {{ domain.practiced }} · {{ scoreLabel(domain) }}</p>
                </button>

                <div v-if="domain.children.length" class="h-px w-5 bg-slate-200"></div>

                <div class="space-y-2 border-l border-slate-200 pl-4">
                  <div v-for="topic in domain.children" :key="topic.id" class="flex items-center gap-3">
                    <button
                      @click="practiceNode(topic)"
                      class="rounded-xl border px-3 py-2 text-left active:scale-[0.98] transition"
                      :class="[nodeClass(topic), nodeSize(topic)]"
                    >
                      <div class="flex items-center justify-between gap-2">
                        <span class="font-medium text-xs">{{ topic.name }}</span>
                        <span class="w-2.5 h-2.5 rounded-full flex-none" :class="dotClass(topic)"></span>
                      </div>
                      <p class="text-[10px] mt-1 opacity-75">{{ topic.total }}题 / 已练{{ topic.practiced }} / 错{{ topic.wrongCount }}</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-5">
        <h2 class="text-sm font-semibold text-slate-600 mb-2">优先复习节点</h2>
        <div class="space-y-2">
          <button
            v-for="node in weakNodes"
            :key="node.id"
            @click="practiceNode(node)"
            class="w-full text-left rounded-xl border p-3 active:scale-[0.98] transition"
            :class="nodeClass(node)"
          >
            <div class="flex items-center justify-between gap-2">
              <span class="font-medium text-sm">{{ node.name }}</span>
              <span class="text-xs font-bold">{{ scoreLabel(node) }}</span>
            </div>
            <div class="mt-2 h-1.5 bg-white/70 rounded-full overflow-hidden">
              <div class="h-full rounded-full" :class="dotClass(node)" :style="{ width: Math.max(6, node.score) + '%' }" />
            </div>
            <p class="text-[10px] mt-1.5 opacity-75">
              {{ node.total }} 题 · 已练 {{ node.practiced }} · 覆盖 {{ Math.round(node.coverage * 100) }}% · 正确率 {{ Math.round(node.accuracy * 100) }}% · 错题 {{ node.wrongCount }}
            </p>
          </button>
        </div>
      </section>

      <section>
        <h2 class="text-sm font-semibold text-slate-600 mb-2">未归类检查</h2>
        <button
          v-if="tree.children.find((n) => n.id === 'uncategorized')?.total"
          @click="practiceNode(tree.children.find((n) => n.id === 'uncategorized')!)"
          class="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-left active:scale-[0.98] transition"
        >
          <p class="text-sm font-medium text-slate-700">还有 {{ tree.children.find((n) => n.id === 'uncategorized')?.total }} 道题没有匹配到固定知识节点</p>
          <p class="text-[10px] text-slate-400 mt-1">后续可补充关键词，让新题稳定落到体系地图上</p>
        </button>
        <div v-else class="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">当前题库都已挂载到知识体系节点</div>
      </section>
    </template>
  </div>
</template>
