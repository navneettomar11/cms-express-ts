// tslint:disable-next-line:max-line-length
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserDao } from "../dao/user.dao";

const userDao: UserDao = new UserDao();
@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {

    public validate(email: string, args: ValidationArguments) {
        return  userDao.findOne(email).then( (user) => {
            if (user) {
                return false;
            }
            return true;
        });
    }
}

export const IsEmailAlreadyExist = (validationOptions?: ValidationOptions) => {
    return (obj: object, propName: string) => {
        registerDecorator({
            constraints: [],
            options: validationOptions,
            propertyName: propName,
            target: obj.constructor,
            validator: IsEmailAlreadyExistConstraint,
        });
    };
};

