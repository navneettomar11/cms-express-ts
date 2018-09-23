import { ValidatorConstraintInterface, ValidationArguments, ValidationOptions, registerDecorator, ValidatorConstraint } from "class-validator";
import { UserDao } from "../dao/user.dao";

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface{

    validate(email: string, args: ValidationArguments) {
        return  UserDao.findOne(email).then( user => {
            if (user) return false;
            return true;
        });
    }
}

export const IsEmailAlreadyExist = (validationOptions?: ValidationOptions)=>{
    return (object: Object, propertyName: string)=>{
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailAlreadyExistConstraint
        });
    }
}