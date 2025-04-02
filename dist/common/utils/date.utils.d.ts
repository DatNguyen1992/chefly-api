export declare enum DateFormat {
    ISO = "YYYY-MM-DDTHH:mm:ss.SSS[Z]",
    STANDARD = "YYYY-MM-DD HH:mm:ss"
}
declare const addDays: (date: Date, days: number) => Date;
declare const addMonths: (date: Date, months: number) => Date;
declare const addYears: (date: Date, year: number) => Date;
declare const parseDate: (dateString: string) => Date;
declare const getStartEndOfDay: (dateString: string) => {
    startDate: string;
    endDate: string;
};
declare const getStartOfDay: (dateString: string) => {
    startDate: string;
};
declare const getEndOfDay: (dateString: string) => {
    endDate: string;
};
declare const getCurrentDate: () => Date;
declare const getCurrentDateString: (format?: DateFormat) => string;
export declare function isSameDay(date1: Date, date2: Date): boolean;
export declare function getTimeString(date: Date): string;
declare const getDateBeforeDays: (days: number) => Date;
export { addDays, addMonths, addYears, parseDate, getStartEndOfDay, getStartOfDay, getEndOfDay, getCurrentDate, getCurrentDateString, getDateBeforeDays, };
