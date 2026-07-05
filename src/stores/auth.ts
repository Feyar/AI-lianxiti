import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase, supabaseEnabled } from '@/utils/supabase'
import type { User } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref('')

  const isLoggedIn = computed(() => !!user.value)

  /** App 启动时恢复会话 */
  async function init() {
    if (!supabase || !supabaseEnabled) return
    const { data } = await supabase.auth.getSession()
    user.value = data.session?.user ?? null
    supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user ?? null
    })
  }

  async function signIn(email: string, password: string): Promise<boolean> {
    if (!supabase) return false
    loading.value = true
    error.value = ''
    const { data, error: e } = await supabase.auth.signInWithPassword({ email, password })
    if (e) error.value = e.message
    else user.value = data.user
    loading.value = false
    return !e
  }

  async function signUp(email: string, password: string): Promise<boolean> {
    if (!supabase) return false
    loading.value = true
    error.value = ''
    const { data, error: e } = await supabase.auth.signUp({ email, password })
    if (e) error.value = e.message
    else if (data.user) user.value = data.user
    loading.value = false
    return !e
  }

  async function signOut() {
    if (!supabase) return
    await supabase.auth.signOut()
    user.value = null
  }

  return { user, loading, error, isLoggedIn, supabaseEnabled, init, signIn, signUp, signOut }
})
