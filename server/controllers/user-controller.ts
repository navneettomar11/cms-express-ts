import { Request, Response } from 'express';
import User from '../models/user.model';
import { validate, ValidationError } from 'class-validator';
import { UserDao } from '../dao/user.dao';
import { ValidationException, SQLException, Exception } from '../utils/expection';
import { sendMailFromTemplate, TemplateParameter } from '../mailtemplates/sendmail';
import { UserService } from '../services/user-service';

const userService: UserService = new UserService();

export let register = (req: Request, res: Response) =>{
    let user  = new User();
    user.email = req.body.email;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.password = req.body.password
    userService.register(user).then( (user)=>{
        res.status(200).json(user);
    }, (error:Exception)=>{
        res.status(400).json(error);
    });
}


