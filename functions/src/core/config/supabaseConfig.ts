import { createClient } from '@supabase/supabase-js';
import { defineSecret } from 'firebase-functions/params';

const SUPABASE_SERVICE_ROLE_KEY = defineSecret('SUPABASE_SERVICE_ROLE');
const SUPABASE_URL = defineSecret('SUPABASE_URL');

export function getSupabase() {
    return createClient(
        SUPABASE_URL.value(),
        SUPABASE_SERVICE_ROLE_KEY.value()
    );
}

export function getSupabaseUrl() {
    return SUPABASE_URL.value();
}

export function getSupabaseServiceRoleKey() {
    return SUPABASE_SERVICE_ROLE_KEY.value();
}
