import { Request, Response } from 'express';
import User from '../models/user.model';
import { UserDao } from '../dao/user.dao';
import { Exception } from '../utils/expection';
import { UserService } from '../services/user-service';

const userService: UserService = new UserService(new UserDao());

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


