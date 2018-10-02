import { validate, ValidationError } from "class-validator";
import { UserDao } from "../dao/user.dao";
import {Exception, SQLException, ValidationException} from "../expection";
import { ITemplateParameter, sendMailFromTemplate } from "../mailtemplates/sendmail";
import User from "../models/user.model";


export class UserService {
    constructor(private userDao: UserDao) {}

    public async validateUser(user: User): Promise<ValidationException[]> {
        const validationErrors: ValidationError[] = await validate(user);
        if (validationErrors.length > 0) {
            return validationErrors.map((validationError) => {
                // tslint:disable-next-line:max-line-length
                const validationMessage = Object.keys(validationError.constraints).map( (key) => validationError.constraints[key]);
                return new ValidationException(validationError.property, validationMessage.join("|"));
            });
        }
    }

    public async register(user: User): Promise<string | Exception |Exception[]> {
        if (user === undefined || user === null) {
            return new Exception("Invalid user");
        }
        const validationErrors: ValidationException[] = await this.validateUser(user);
        if (validationErrors && validationErrors.length > 0) {
            return validationErrors;
        }
        return new Promise<string | Exception|  Exception[]>((resolve, reject) => {
           this.userDao.save(user).then((dbUser) => {
            const templateParameters: ITemplateParameter[] = [];
            templateParameters.push({name: "registration-validation-uuid", value: dbUser.guid});
            // tslint:disable-next-line:max-line-length
            sendMailFromTemplate("registration-validation", templateParameters, {to: dbUser.email, from: "register@ncms.com"})
            .then((success) => resolve(user.guid), (error) => {
                reject(new Exception("Failed to send active mail"));
            });
           }).catch((error) => {
            reject(new SQLException("Failed to save user in db"));
           });
        });
    }

    public getUser(email: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.userDao.findOne(email).then((user) => {
                resolve(user);
            }, (error) => {
                reject(new Exception("Email not found."));
            });
        });
    }

    public forgotPassword(email: string) {
        throw new Error("Not implemented");
    }
}
