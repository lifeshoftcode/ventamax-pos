// utils/date/toTimestamp.js
import { Timestamp } from "firebase/firestore";

/**
 * Acepta millis, Date, dayjs o Timestamp y lo devuelve como Timestamp.
 */
export const toTimestamp = (d) => {
    if (d instanceof Timestamp) return d;
    if (typeof d === "number") return Timestamp.fromMillis(d);
    if (d && typeof d.valueOf === "function") return Timestamp.fromMillis(d.valueOf());
    throw new Error("Formato de fecha no soportado: " + d);
};

export const toMillis = ts => ts?.toMillis?.() ?? null;