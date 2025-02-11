import { onSchedule } from "firebase-functions/v2/scheduler";
import axios from "axios";
import * as logger from "firebase-functions/logger";

// New helper function extracted from the original onSchedule callback
async function runKeepSupabaseAlive() {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY;
  if (!SUPABASE_URL || !SUPABASE_API_KEY) {
    logger.error("Falta definir SUPABASE_URL o SUPABASE_API_KEY");
    return;
  }
  try {
    const response = await axios.get(SUPABASE_URL, {
      headers: {
        "apikey": SUPABASE_API_KEY,
        "Authorization": `Bearer ${SUPABASE_API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    logger.info("✅ Consulta exitosa a Supabase:", response.data);
  } catch (error) {
    logger.error("❌ Error al consultar Supabase:", error);
  }
}

// Original schedule trigger (ejecuta a medianoche) actualizado para rd
export const keepSupabaseAlive = onSchedule(
  {
    schedule: "0 0 * * *",
    timeZone: "America/Santo_Domingo",
    secrets: ["SUPABASE_URL", "SUPABASE_API_KEY"],
  },
  async () => {
    // Call the helper function
    await runKeepSupabaseAlive();
  }
);

// Trigger actualizado a las 3:30pm para rd
export const keepSupabaseAlive310 = onSchedule(
  {
    schedule: "30 15 * * *",
    timeZone: "America/Santo_Domingo",
    secrets: ["SUPABASE_URL", "SUPABASE_API_KEY"],
  },
  async () => {
    // Call the helper function
    await runKeepSupabaseAlive();
  }
);

// Trigger actualizado a las 3:30pm para rd
export const keepSupabaseAlive925 = onSchedule(
  {
    schedule: "25 21 * * *",
    timeZone: "America/Santo_Domingo",
    secrets: ["SUPABASE_URL", "SUPABASE_API_KEY"],
  },
  async () => {
    // Call the helper function
    await runKeepSupabaseAlive();
  }
);

// Trigger actualizado a las 3:30pm para rd
export const keepSupabaseAlive22000 = onSchedule(
  {
    schedule: "0 22 * * *",
    timeZone: "America/Santo_Domingo",
    secrets: ["SUPABASE_URL", "SUPABASE_API_KEY"],
  },
  async () => {
    // Call the helper function
    await runKeepSupabaseAlive();
  }
);

