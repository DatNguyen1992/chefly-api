"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagType = exports.LIMIT_DAYS_IN_TRASH = exports.MAX_FILES_UPLOAD = exports.MAX_SIZE_UPLOAD_IMAGE_APP = exports.ERROR_CODE = exports.LIMIT_FREE = exports.PIN_CODE_PATTERN = exports.OBJECT_ID_PATTERN = exports.RETRY_DELAY = exports.MAX_RETRIES_QUEUE = exports.FCM_UNREGISTERED_ERROR_CODE = exports.FCM_INVALID_ARGUMENT_ERROR_CODE = void 0;
exports.FCM_INVALID_ARGUMENT_ERROR_CODE = 'messaging/invalid-argument';
exports.FCM_UNREGISTERED_ERROR_CODE = 'messaging/registration-token-not-registered';
exports.MAX_RETRIES_QUEUE = 4;
exports.RETRY_DELAY = 5000;
exports.OBJECT_ID_PATTERN = /^[0-9a-fA-F]{24}$/;
exports.PIN_CODE_PATTERN = /^\d{4}$/;
exports.LIMIT_FREE = {
    FOLDER: 1,
    NOTE: 3,
    DIARY: 3,
};
exports.ERROR_CODE = {
    MUST_UPGRADE_TO_PREMIUM: 'MUST_UPGRADE_TO_PREMIUM',
    TRY_AGAIN_IN_30_MINUTES: 'TRY_AGAIN_IN_30_MINUTES',
    TOO_MANY_ATTEMPTS_TRY_LATER: 'TOO_MANY_ATTEMPTS_TRY_LATER',
    REQUEST_NEW_OTP_LATER: 'REQUEST_NEW_OTP_LATER',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
    TRY_AGAIN_IN_10_MINUTES: 'TRY_AGAIN_IN_10_MINUTES',
    BLOCK_IN_10_MINUTES: 'BLOCK_IN_10_MINUTES',
    OTP_NOT_MATCH: 'OTP_NOT_MATCH',
    INVALID_FILE_UPLOAD: 'INVALID_FILE_UPLOAD',
};
exports.MAX_SIZE_UPLOAD_IMAGE_APP = 100 * 1024 * 1024;
exports.MAX_FILES_UPLOAD = 5;
exports.LIMIT_DAYS_IN_TRASH = 30;
exports.TagType = {
    MATERIAL: 'MATERIAL',
    CUISINE: 'CUISINE',
    DIETARY: 'DIETARY',
};
//# sourceMappingURL=constants.js.map