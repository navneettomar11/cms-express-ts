import * as express from "express";
import { Request, Response } from "express";
import { UserDao } from "../dao/user.dao";
import { Exception } from "../exceptions";
import User from "../models/user.model";
import { UserService } from "../services/user-service";

const userService: UserService = new UserService(new UserDao());

export let register = (req: Request, res: Response) => {
    const user  = new User();
    user.email = req.body.email;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.password = req.body.password;
    userService.register(user).then( (dbUser) => {
        res.status(200).json(user);
    }, (error: Exception) => {
        res.status(400).json(error);
    });
};
