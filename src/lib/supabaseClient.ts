/**
 * Mary Matha Primary School — Supabase Data Access Abstraction Layer
 * Prepares the frontend architecture for cloud PostgreSQL & Supabase integration.
 * In development or when credentials are not supplied, provides seamless fallback to the local state store.
 */

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isConfigured: boolean;
}

export const getSupabaseConfig = (): SupabaseConfig => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  return {
    url,
    anonKey,
    isConfigured: Boolean(url && anonKey),
  };
};

export const isProductionSupabaseActive = (): boolean => {
  return getSupabaseConfig().isConfigured;
};

