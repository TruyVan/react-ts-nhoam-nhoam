import { createClient } from "@supabase/supabase-js";
import { supabaseKey } from "../constant/SupabaseKey";
import { storageService } from "./StorageService";
const supabaseURL = supabaseKey.REACT_APP_SUPABASE_URL
const supabaseAnonKey = supabaseKey.REACT_APP_SUPABASE_ANON_KEY
const accessToken = storageService.getAccessToken() ? storageService.getAccessToken() : null
export const supabase = createClient(supabaseURL, accessToken || supabaseAnonKey, {
    auth: {
      persistSession: false,  // Ngăn việc lưu trữ tự động
    //   detectSessionInUrl: false,  // Optional: nếu bạn không muốn Supabase tự động lấy token từ URL
    },
  })