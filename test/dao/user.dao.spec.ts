import {assert} from 'chai';
import { Connection } from 'typeorm';
import { initializeFunction } from '../../server/typeorm.config';
import User from '../../server/models/user.model';
import {UserDao} from '../../server/dao/user.dao';


let userDao:UserDao;
let connection:Connection;
const createUser = async (email:string, firstName:string ,lastName:string, password: string) =>{
    let user = new User();
    user.email = email;
    user.password = password;
    user.firstName = firstName;
    user.lastName = lastName;
    return await userDao.save(user);
}

describe('User Repository', ()=>{
    before( async ()=>{
        connection = await initializeFunction();
        userDao = new UserDao();

    });
    it("save user", async ()=>{
        let respUser:User = await createUser('foo@bar.com','John','Doe','abc');
        assert.isNotNull(respUser);
        assert.equal(respUser.email, 'foo@bar.com');
    });

    it('find user by email',async ()=>{
        let respUser:User = await userDao.findOne('foo@bar.com');
        assert.isNotNull(respUser);
        assert.equal(respUser.email, 'foo@bar.com');
    });

    it('compare password with correct pwd', async ()=>{
        let comparePwdBoolean = await userDao.comparePassword('abc');
        assert.isTrue(comparePwdBoolean);
    });

    it('compare password with wrong pwd', async ()=>{
        let comparePwdBoolean = await userDao.comparePassword('xyz');
        assert.isFalse(comparePwdBoolean);
    });

    after(()=>{
        connection.close();
    });
});