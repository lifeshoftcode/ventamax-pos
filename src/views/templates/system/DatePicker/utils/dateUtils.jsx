import { DateTime } from 'luxon';

/**
 * Genera un array con todos los días del mes
 * @param {DateTime} date - Fecha Luxon para extraer el mes y año
 * @returns {Array} - Array con objetos de días
 */
export const getMonthDays = (date) => {
  const year = date.year;
  const month = date.month;
  const daysInMonth = date.daysInMonth;
  
  const days = [];
  for (let day = 1; day <= daysInMonth; day++) {
    days.push({
      day,
      date: DateTime.local(year, month, day),
      isCurrentMonth: true
    });
  }
  
  return days;
};

/**
 * Obtiene los días del mes anterior que aparecen en la semana inicial del calendario
 * @param {DateTime} date - Fecha Luxon del mes actual
 * @returns {Array} - Array con los días previos necesarios
 */
export const getPreviousMonthDays = (date) => {
  const firstDayOfMonth = date.startOf('month');
  const dayOfWeek = firstDayOfMonth.weekday % 7; // 0 = domingo, 1 = lunes, etc.
  
  if (dayOfWeek === 1) return []; // Si el mes empieza en lunes, no necesitamos días del mes anterior
  
  const prevMonth = date.minus({ months: 1 });
  const daysInPrevMonth = prevMonth.daysInMonth;
  
  const days = [];
  const daysToAdd = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Ajuste para empezar semana en lunes
  
  for (let i = daysInPrevMonth - daysToAdd + 1; i <= daysInPrevMonth; i++) {
    days.push({
      day: i,
      date: DateTime.local(prevMonth.year, prevMonth.month, i),
      isCurrentMonth: false
    });
  }
  
  return days;
};

/**
 * Obtiene los días del mes siguiente que aparecen en la última semana del calendario
 * @param {DateTime} date - Fecha Luxon del mes actual
 * @param {Number} totalDaysShown - Total de días ya mostrados en el calendario
 * @returns {Array} - Array con los días siguientes necesarios
 */
export const getNextMonthDays = (date, totalDaysShown) => {
  const daysNeeded = 42 - totalDaysShown; // 6 semanas * 7 días = 42 días totales en el calendario
  const nextMonth = date.plus({ months: 1 });
  
  const days = [];
  for (let i = 1; i <= daysNeeded; i++) {
    days.push({
      day: i,
      date: DateTime.local(nextMonth.year, nextMonth.month, i),
      isCurrentMonth: false
    });
  }
  
  return days;
};

/**
 * Formatea una fecha usando Luxon
 * @param {DateTime|Date|string|number} date - Fecha a formatear
 * @param {string} format - Formato de salida
 * @returns {string} - Fecha formateada
 */
export const formatDate = (date, format = 'dd/MM/yyyy') => {
  if (!date) return '';
  
  let luxonDate;
  if (typeof date === 'string') {
    luxonDate = DateTime.fromISO(date);
  } else if (date instanceof Date) {
    luxonDate = DateTime.fromJSDate(date);
  } else if (typeof date === 'number') {
    luxonDate = DateTime.fromMillis(date);
  } else if (DateTime.isDateTime(date)) {
    luxonDate = date;
  } else {
    return '';
  }
  
  return luxonDate.isValid ? luxonDate.toFormat(format) : '';
};

/**
 * Convierte una fecha a objeto DateTime de Luxon
 * @param {DateTime|Date|string|number} date - Fecha a convertir
 * @returns {DateTime} - Objeto DateTime de Luxon
 */
export const toDateTime = (date) => {
  if (!date) return null;
  
  if (DateTime.isDateTime(date)) return date;
  if (typeof date === 'string') return DateTime.fromISO(date);
  if (date instanceof Date) return DateTime.fromJSDate(date);
  if (typeof date === 'number') return DateTime.fromMillis(date);
  
  return null;
};

/**
 * Verifica si dos fechas son el mismo día
 * @param {DateTime} date1 - Primera fecha
 * @param {DateTime} date2 - Segunda fecha
 * @returns {boolean} - true si son el mismo día
 */
export const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false;
  
  const d1 = toDateTime(date1);
  const d2 = toDateTime(date2);
  
  return d1.hasSame(d2, 'day');
};
