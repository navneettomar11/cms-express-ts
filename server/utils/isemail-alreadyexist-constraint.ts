import { ValidatorConstraintInterface, ValidationArguments, ValidationOptions, registerDecorator, ValidatorConstraint } from "class-validator";
import { UserDao } from "../dao/user.dao";

const userDao:UserDao = new UserDao();
@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface{

    validate(email: string, args: ValidationArguments) {
        return  userDao.findOne(email).then( user => {
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
