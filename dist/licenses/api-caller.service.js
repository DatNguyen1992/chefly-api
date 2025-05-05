"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var ApiCallerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiCallerService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const Tesseract = __importStar(require("tesseract.js"));
const qs = __importStar(require("qs"));
const extract_traffic_violations_service_1 = require("./extract-traffic-violations.service");
const CONFIG = {
    BASE_URL: 'https://www.csgt.vn',
    CAPTCHA_PATH: '/lib/captcha/captcha.class.php',
    FORM_ENDPOINT: '/?mod=contact&task=tracuu_post&ajax',
    RESULTS_URL: 'https://www.csgt.vn/tra-cuu-phuong-tien-vi-pham.html',
    MAX_RETRIES: 5,
    HEADERS: {
        USER_AGENT: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        ACCEPT: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        CONTENT_TYPE: 'application/x-www-form-urlencoded',
    },
};
let ApiCallerService = ApiCallerService_1 = class ApiCallerService {
    constructor() {
        this.logger = new common_1.Logger(ApiCallerService_1.name);
    }
    createAxiosInstance() {
        const instance = axios_1.default.create({
            baseURL: CONFIG.BASE_URL,
            withCredentials: true,
            timeout: 30000,
            headers: {
                'User-Agent': CONFIG.HEADERS.USER_AGENT,
                Accept: CONFIG.HEADERS.ACCEPT,
            },
        });
        instance.interceptors.response.use((response) => {
            const cookies = response.headers['set-cookie'];
            if (cookies) {
                instance.defaults.headers.common['Cookie'] = cookies.join('; ');
            }
            return response;
        });
        return instance;
    }
    async getCaptcha(instance) {
        try {
            const response = await instance.get(CONFIG.CAPTCHA_PATH, {
                responseType: 'arraybuffer',
            });
            const captchaResult = await Tesseract.recognize(Buffer.from(response.data));
            return captchaResult.data.text.trim();
        }
        catch (error) {
            this.logger.error(`Failed to process captcha: ${error.message}`);
            throw new common_1.HttpException('Failed to process captcha', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async postFormData(instance, plate, captcha) {
        const formData = qs.stringify({
            BienKS: plate,
            Xe: '1',
            captcha,
            ipClient: '9.9.9.91',
            cUrl: '1',
        });
        try {
            return await instance.post(CONFIG.FORM_ENDPOINT, formData, {
                headers: {
                    'Content-Type': CONFIG.HEADERS.CONTENT_TYPE,
                },
            });
        }
        catch (error) {
            this.logger.error(`Failed to submit form: ${error.message}`);
            throw new common_1.HttpException('Failed to submit form', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getViolationResults(instance, plate) {
        try {
            return await instance.get(`${CONFIG.RESULTS_URL}?&LoaiXe=1&BienKiemSoat=${plate}`);
        }
        catch (error) {
            this.logger.error(`Failed to fetch results: ${error.message}`);
            throw new common_1.HttpException('Failed to fetch results', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async callAPI(plate, retries = CONFIG.MAX_RETRIES) {
        if (!plate) {
            throw new common_1.HttpException('License plate is required', common_1.HttpStatus.BAD_REQUEST);
        }
        this.logger.log(`Fetching traffic violations for plate: ${plate}`);
        const instance = this.createAxiosInstance();
        try {
            const captcha = await this.getCaptcha(instance);
            const response = await this.postFormData(instance, plate, captcha);
            if (response.data === 404) {
                if (retries > 0) {
                    this.logger.warn(`Captcha verification failed. Retrying (${CONFIG.MAX_RETRIES - retries + 1}/${CONFIG.MAX_RETRIES})`);
                    return this.callAPI(plate, retries - 1);
                }
                else {
                    this.logger.error('Maximum retry attempts reached for captcha.');
                    throw new common_1.HttpException('Could not verify captcha after maximum retries', common_1.HttpStatus.BAD_REQUEST);
                }
            }
            const resultsResponse = await this.getViolationResults(instance, plate);
            const violations = new extract_traffic_violations_service_1.ExtractTrafficViolationsService().extractTrafficViolations(resultsResponse.data);
            return violations || [];
        }
        catch (error) {
            this.logger.error(`Error fetching violations for plate ${plate}: ${error.message}`);
            throw new common_1.HttpException(error.message, error instanceof common_1.HttpException
                ? error.getStatus()
                : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ApiCallerService = ApiCallerService;
exports.ApiCallerService = ApiCallerService = ApiCallerService_1 = __decorate([
    (0, common_1.Injectable)()
], ApiCallerService);
//# sourceMappingURL=api-caller.service.js.map