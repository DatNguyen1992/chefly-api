"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsFormatPinCodeConstraint = void 0;
exports.IsFormatPinCode = IsFormatPinCode;
const constants_1 = require("../constants");
const class_validator_1 = require("class-validator");
let IsFormatPinCodeConstraint = class IsFormatPinCodeConstraint {
    validate(value) {
        if (Array.isArray(value)) {
            return value.every((v) => typeof v === 'string' && constants_1.PIN_CODE_PATTERN.test(v));
        }
        return typeof value === 'string' && constants_1.PIN_CODE_PATTERN.test(value);
    }
    defaultMessage() {
        return 'Value must be a 4-digit numeric PIN code';
    }
};
exports.IsFormatPinCodeConstraint = IsFormatPinCodeConstraint;
exports.IsFormatPinCodeConstraint = IsFormatPinCodeConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: false })
], IsFormatPinCodeConstraint);
function IsFormatPinCode(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsFormatPinCodeConstraint,
        });
    };
}
//# sourceMappingURL=is-pin-code-format.decorator.js.map