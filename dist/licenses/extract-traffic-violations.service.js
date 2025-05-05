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
var ExtractTrafficViolationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractTrafficViolationsService = void 0;
const common_1 = require("@nestjs/common");
const cheerio = __importStar(require("cheerio"));
let ExtractTrafficViolationsService = ExtractTrafficViolationsService_1 = class ExtractTrafficViolationsService {
    constructor() {
        this.logger = new common_1.Logger(ExtractTrafficViolationsService_1.name);
    }
    extractTrafficViolations(html) {
        if (!html || typeof html !== 'string') {
            this.logger.error('Invalid or empty HTML provided');
            throw new common_1.HttpException('Invalid HTML content', common_1.HttpStatus.BAD_REQUEST);
        }
        const $ = cheerio.load(html);
        const violations = [];
        let currentViolation = {};
        let resolutionPlaces = [];
        const formGroups = $('.form-group');
        if (formGroups.length === 0) {
            this.logger.warn('No violation records found in HTML');
            return [];
        }
        formGroups.each((index, element) => {
            const $element = $(element);
            const isRecordBoundary = $element.next().is('hr') || $element.prev().is('hr');
            if (isRecordBoundary && Object.keys(currentViolation).length > 0) {
                currentViolation.resolutionPlaces = resolutionPlaces;
                violations.push(currentViolation);
                currentViolation = {};
                resolutionPlaces = [];
            }
            const label = $element.find('label span').text().trim();
            const value = $element.find('.col-md-9').text().trim();
            if (label && value) {
                switch (label) {
                    case 'Biển kiểm soát:':
                        currentViolation.licensePlate = value;
                        break;
                    case 'Màu biển:':
                        currentViolation.plateColor = value;
                        break;
                    case 'Loại phương tiện:':
                        currentViolation.vehicleType = value;
                        break;
                    case 'Thời gian vi phạm:':
                        currentViolation.violationTime = value;
                        break;
                    case 'Địa điểm vi phạm:':
                        currentViolation.violationLocation = value;
                        break;
                    case 'Hành vi vi phạm:':
                        currentViolation.violationBehavior = value;
                        break;
                    case 'Trạng thái:':
                        currentViolation.status = value;
                        break;
                    case 'Đơn vị phát hiện vi phạm:':
                        currentViolation.detectionUnit = value;
                        break;
                    default:
                        this.logger.warn(`Unknown label encountered: ${label}`);
                        break;
                }
            }
            const text = $element.text().trim();
            if (/^[1-2]\./.test(text)) {
                resolutionPlaces.push({ name: text });
            }
            else if (text.startsWith('Địa chỉ:')) {
                if (resolutionPlaces.length > 0) {
                    resolutionPlaces[resolutionPlaces.length - 1].address = text
                        .replace('Địa chỉ:', '')
                        .trim();
                }
                else {
                    this.logger.warn('Address found without preceding resolution place');
                }
            }
        });
        if (Object.keys(currentViolation).length > 0) {
            currentViolation.resolutionPlaces = resolutionPlaces;
            violations.push(currentViolation);
        }
        if (violations.length === 0) {
            this.logger.warn('No valid violation records extracted');
        }
        else {
            this.logger.log(`Extracted ${violations.length} violation records`);
        }
        return violations;
    }
};
exports.ExtractTrafficViolationsService = ExtractTrafficViolationsService;
exports.ExtractTrafficViolationsService = ExtractTrafficViolationsService = ExtractTrafficViolationsService_1 = __decorate([
    (0, common_1.Injectable)()
], ExtractTrafficViolationsService);
//# sourceMappingURL=extract-traffic-violations.service.js.map