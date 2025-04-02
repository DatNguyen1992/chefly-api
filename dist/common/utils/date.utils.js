"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateBeforeDays = exports.getCurrentDateString = exports.getCurrentDate = exports.getEndOfDay = exports.getStartOfDay = exports.getStartEndOfDay = exports.parseDate = exports.addYears = exports.addMonths = exports.addDays = exports.DateFormat = void 0;
exports.isSameDay = isSameDay;
exports.getTimeString = getTimeString;
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
var DateFormat;
(function (DateFormat) {
    DateFormat["ISO"] = "YYYY-MM-DDTHH:mm:ss.SSS[Z]";
    DateFormat["STANDARD"] = "YYYY-MM-DD HH:mm:ss";
})(DateFormat || (exports.DateFormat = DateFormat = {}));
const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};
exports.addDays = addDays;
const addMonths = (date, months) => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
};
exports.addMonths = addMonths;
const addYears = (date, year) => {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() + year);
    return result;
};
exports.addYears = addYears;
const parseDate = (dateString) => {
    const date = dayjs_1.default.utc(dateString);
    if (!date.isValid()) {
        throw new Error('Invalid date provided.');
    }
    return date.toDate();
};
exports.parseDate = parseDate;
const getStartEndOfDay = (dateString) => {
    const date = dayjs_1.default.utc(dateString);
    if (!date.isValid()) {
        throw new Error('Invalid date provided.');
    }
    return {
        startDate: date.startOf('day').toISOString(),
        endDate: date.endOf('day').toISOString(),
    };
};
exports.getStartEndOfDay = getStartEndOfDay;
const getStartOfDay = (dateString) => {
    const date = dayjs_1.default.utc(dateString);
    if (!date.isValid()) {
        throw new Error('Invalid date provided.');
    }
    return {
        startDate: date.startOf('day').toISOString(),
    };
};
exports.getStartOfDay = getStartOfDay;
const getEndOfDay = (dateString) => {
    const date = dayjs_1.default.utc(dateString);
    if (!date.isValid()) {
        throw new Error('Invalid date provided.');
    }
    return {
        endDate: date.endOf('day').toISOString(),
    };
};
exports.getEndOfDay = getEndOfDay;
const getCurrentDate = () => {
    return dayjs_1.default.utc().toDate();
};
exports.getCurrentDate = getCurrentDate;
const getCurrentDateString = (format = DateFormat.STANDARD) => {
    return dayjs_1.default.utc().format(format);
};
exports.getCurrentDateString = getCurrentDateString;
function isSameDay(date1, date2) {
    return (0, dayjs_1.default)(date1).isSame((0, dayjs_1.default)(date2), 'day');
}
function getTimeString(date) {
    return (0, dayjs_1.default)(date).format('HH:mm');
}
const getDateBeforeDays = (days) => {
    const now = getCurrentDate();
    return (0, dayjs_1.default)(now).subtract(days, 'day').toDate();
};
exports.getDateBeforeDays = getDateBeforeDays;
//# sourceMappingURL=date.utils.js.map