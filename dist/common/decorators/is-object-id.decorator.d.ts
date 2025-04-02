import { ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare class IsObjectIdConstraint implements ValidatorConstraintInterface {
    validate(value: any): boolean;
    defaultMessage(): string;
}
export declare function IsObjectId(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
