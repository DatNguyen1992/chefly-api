import { OBJECT_ID_PATTERN } from '@common/constants';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsObjectIdConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    if (Array.isArray(value)) {
      return value.every(
        (v) => typeof v === 'string' && OBJECT_ID_PATTERN.test(v),
      );
    }
    return typeof value === 'string' && OBJECT_ID_PATTERN.test(value);
  }

  defaultMessage() {
    return 'Value must be a valid ObjectId';
  }
}

export function IsObjectId(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsObjectIdConstraint,
    });
  };
}
