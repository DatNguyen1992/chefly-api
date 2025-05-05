"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicensesModule = void 0;
const common_1 = require("@nestjs/common");
const licenses_service_1 = require("./licenses.service");
const licenses_controller_1 = require("./licenses.controller");
const api_caller_service_1 = require("./api-caller.service");
const extract_traffic_violations_service_1 = require("./extract-traffic-violations.service");
let LicensesModule = class LicensesModule {
};
exports.LicensesModule = LicensesModule;
exports.LicensesModule = LicensesModule = __decorate([
    (0, common_1.Module)({
        providers: [
            licenses_service_1.LicenseService,
            api_caller_service_1.ApiCallerService,
            extract_traffic_violations_service_1.ExtractTrafficViolationsService,
        ],
        controllers: [licenses_controller_1.LicenseController],
    })
], LicensesModule);
//# sourceMappingURL=licenses.module.js.map