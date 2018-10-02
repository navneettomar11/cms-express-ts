import {assert, expect} from 'chai';
import { Connection } from 'typeorm';
import { initializeFunction } from '../../server/typeorm.config';
import {UserService} from '../../server/services/user-service';
import { UserDao } from '../../server/dao/user.dao';
import User from '../../server/models/user.model';
import { Exception } from '../../server/utils/expection';

describe('User Service',()=>{
    let connection:Connection;
    let userDao:UserDao;
    let userService:UserService;

    before(async ()=>{
        connection = await initializeFunction();
        userDao = new UserDao();
        userService = new UserService(userDao);
    });

    it('Register with null user', async ()=>{
        expect(await userService.register(null)).instanceof(Exception);
    });

    it('Register with user validation exception', async ()=>{
        let user = new User();
        let validationExceptionList = await userService.register(user)
        expect(validationExceptionList).instanceof(Array);
        expect(validationExceptionList).length.gt(0);
    });

    it('Register with vaild user', async ()=>{
        let user = new User();
        user.email = 'abc@xyz.com';
        user.firstName='John';
        user.lastName ='Doe';
        user.password='12345678';
        user.userType='USER';
        let dbUserGuid = await userService.register(user);
        expect(dbUserGuid).to.be.not.null;
    });

    it('Register with existiing email', async ()=>{
        let user = new User();
        user.email = 'abc@xyz.com';
        user.firstName='John';
        user.lastName ='Doe';
        user.password='12345678';
        user.userType='USER';
        let dbUser = await userDao.save(user);
        let isAlreadyEmailException = await userService.register(user);
        expect(isAlreadyEmailException).to.be.not.null;
    });
})