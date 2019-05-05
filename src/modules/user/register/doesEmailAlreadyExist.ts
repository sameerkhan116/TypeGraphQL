import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { User } from '../../../entity/User';

@ValidatorConstraint({ async: true })
export class DoesEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
    validate(email: string): boolean {
        const user = User.findOne({ where: { email } });
        return user === null;
    }
}

export function DoesEmailAlreadyExist(options?: ValidationOptions): (object: Object, propertyName: string) => void{
    return function(object: Object, propertyName: string): void {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options,
            constraints: [],
            validator: DoesEmailAlreadyExistConstraint
        })
    }
}