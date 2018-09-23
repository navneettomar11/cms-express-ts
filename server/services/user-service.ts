import User from "../models/user.model";
import { validate, ValidationError } from "class-validator";
import { ValidationException, Exception, ValidationListException, SQLException, UserNotFoundException } from "../utils/expection";
import { TemplateParameter, sendMailFromTemplate } from "../mailtemplates/sendmail";
import { UserDao } from "../dao/user.dao";

export class UserService {

    public register(user:User): Promise<string>{
        return new Promise((resolve, reject) => {
            validate(user).then((errors)=>{
                if(errors.length > 0){
                    let validationErrors:Array<ValidationException> = [];
                    errors.forEach((validationError: ValidationError)=>{
                        for(let key of Object.keys(validationError.constraints)){
                            validationErrors.push(new ValidationException(validationError.property, validationError.constraints[key]));
                        }
                    });
                    reject(new ValidationListException(validationErrors));
                }else{
                    UserDao.save(user).then((user)=>{
                        let templateParameters:Array<TemplateParameter> = [];
                        templateParameters.push({name:'registration-validation-uuid',value: user.guid});
                        sendMailFromTemplate('registration-validation', templateParameters,{to:user.email, from:'register@ncms.com'})
                        .then((success)=> resolve(user.guid),(error) => reject(error))
                    }).catch((error)=>{
                        reject(new SQLException('Failed to save user'));
                    });
                }
            });
        });
    }

    public getUser(email:string):Promise<User>{
        return new Promise((resolve, reject)=>{
            UserDao.findOne(email).then((user)=>{
                resolve(user);
            }, (error)=>{
                reject(new UserNotFoundException('Email not found.'))
            });
        });
    }

    public forgotPassword(email:string){

    }

    


}