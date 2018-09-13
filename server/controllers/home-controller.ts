import { Request, Response } from 'express';
import {User} from '../models/user.model';

let pkg = require(__dirname + '/../../package.json');


export let index = (req: Request, res: Response) => {
  let user = new User();
  console.log(user);
  //user.save();

  res.json({
    message: 'Welcome to API sekeleton.',
    version: pkg.version,
  });
}