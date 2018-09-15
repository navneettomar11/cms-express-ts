import * as passport from 'passport';
import * as passportBasic from 'passport-http';
import { UserDao } from './dao/user.dao';
import User from './models/user.model';



export const initializePassport = ()=>{
    const BasicStrategy = passportBasic.BasicStrategy;

    passport.use(new BasicStrategy((email, password, done)=>{
    console.log(email, password);  
    UserDao.findOne(email).then((user:User)=>{
        if(user === undefined || user === null){
        return done(new Error(`Email ${email} not found.` ));
        }
        UserDao.comparePassword(password).then((isMatch)=>{
        if(isMatch){
                return done(undefined, user);
        }
        return done(undefined,`Invalid email or password.`);
        }).catch((error)=>{
        console.log(error);
        return done(`Invalid email or password.`);
        });
        })
    }));
}
