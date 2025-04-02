import { ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare class IsFormatPinCodeConstraint implements ValidatorConstraintInterface {
    validate(value: any): boolean;
    defaultMessage(): string;
}
export declare function IsFormatPinCode(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
