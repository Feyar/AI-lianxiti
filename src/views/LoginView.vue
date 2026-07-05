<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const email = ref('')
const password = ref('')
const isSignUp = ref(false)

async function submit() {
  if (!email.value || !password.value) return
  const ok = isSignUp.value
    ? await auth.signUp(email.value, password.value)
    : await auth.signIn(email.value, password.value)
  if (ok) router.push('/')
}
</script>

<template>
  <div class="px-6 pt-16">
    <div class="text-center mb-8">
      <div class="text-5xl mb-3">☁️</div>
      <h1 class="text-xl font-bold">{{ isSignUp ? '注册同步账号' : '登录同步账号' }}</h1>
      <p class="text-xs text-slate-500 mt-2 px-4">三端用同一个账号登录，答题记录与错题本自动同步</p>
    </div>

    <form @submit.prevent="submit" class="space-y-3">
      <input
        v-model="email"
        type="email"
        placeholder="邮箱"
        required
        autocomplete="email"
        class="w-full p-3 rounded-xl border-2 border-slate-200 bg-white outline-none focus:border-brand-500"
      />
      <input
        v-model="password"
        type="password"
        placeholder="密码（至少 6 位）"
        required
        minlength="6"
        :autocomplete="isSignUp ? 'new-password' : 'current-password'"
        class="w-full p-3 rounded-xl border-2 border-slate-200 bg-white outline-none focus:border-brand-500"
      />
      <p v-if="auth.error" class="text-sm text-red-500 px-1">{{ auth.error }}</p>
      <button
        type="submit"
        :disabled="auth.loading"
        class="w-full py-3 rounded-xl bg-brand-600 text-white font-semibold disabled:opacity-50 active:scale-[0.98]"
      >
        {{ auth.loading ? '处理中...' : (isSignUp ? '注册并登录' : '登录') }}
      </button>
    </form>

    <button @click="isSignUp = !isSignUp" class="w-full mt-4 text-sm text-brand-600">
      {{ isSignUp ? '已有账号？去登录' : '没账号？去注册' }}
    </button>
  </div>
</template>
