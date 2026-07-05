import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

/** 是否配置了 Supabase（决定同步功能是否启用） */
export const supabaseEnabled = !!(url && anonKey)

/** 全局 Supabase 客户端；未配置时为 null，调用方需先判断 supabaseEnabled */
export const supabase: SupabaseClient | null = supabaseEnabled
  ? createClient(url!, anonKey!, { auth: { persistSession: true, autoRefreshToken: true } })
  : null
