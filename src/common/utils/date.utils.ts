import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

// const DEFAULT_TIMEZONE = 'Asia/Ho_Chi_Minh';
export enum DateFormat {
  ISO = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]',
  STANDARD = 'YYYY-MM-DD HH:mm:ss',
}
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

const addYears = (date: Date, year: number): Date => {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + year);
  return result;
};

const parseDate = (dateString: string): Date => {
  const date = dayjs.utc(dateString);

  if (!date.isValid()) {
    throw new Error('Invalid date provided.');
  }

  return date.toDate();
};

const getStartEndOfDay = (dateString: string) => {
  const date = dayjs.utc(dateString);

  if (!date.isValid()) {
    throw new Error('Invalid date provided.');
  }

  return {
    startDate: date.startOf('day').toISOString(),
    endDate: date.endOf('day').toISOString(),
  };
};

const getStartOfDay = (dateString: string) => {
  const date = dayjs.utc(dateString);

  if (!date.isValid()) {
    throw new Error('Invalid date provided.');
  }

  return {
    startDate: date.startOf('day').toISOString(),
  };
};

const getEndOfDay = (dateString: string) => {
  const date = dayjs.utc(dateString);

  if (!date.isValid()) {
    throw new Error('Invalid date provided.');
  }

  return {
    endDate: date.endOf('day').toISOString(),
  };
};

const getCurrentDate = (): Date => {
  return dayjs.utc().toDate();
};

const getCurrentDateString = (format = DateFormat.STANDARD): string => {
  return dayjs.utc().format(format);
};
export function isSameDay(date1: Date, date2: Date) {
  return dayjs(date1).isSame(dayjs(date2), 'day');
}

export function getTimeString(date: Date) {
  return dayjs(date).format('HH:mm');
}

const getDateBeforeDays = (days: number): Date => {
  const now = getCurrentDate();
  return dayjs(now).subtract(days, 'day').toDate();
};

export {
  addDays,
  addMonths,
  addYears,
  parseDate,
  getStartEndOfDay,
  getStartOfDay,
  getEndOfDay,
  getCurrentDate,
  getCurrentDateString,
  getDateBeforeDays,
};
