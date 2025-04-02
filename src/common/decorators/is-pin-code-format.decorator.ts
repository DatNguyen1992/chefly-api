import { PIN_CODE_PATTERN } from '@common/constants';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsFormatPinCodeConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    if (Array.isArray(value)) {
      return value.every(
        (v) => typeof v === 'string' && PIN_CODE_PATTERN.test(v),
      );
    }
    return typeof value === 'string' && PIN_CODE_PATTERN.test(value);
  }

  defaultMessage() {
    return 'Value must be a 4-digit numeric PIN code';
  }
}

export function IsFormatPinCode(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsFormatPinCodeConstraint,
    });
  };
}
