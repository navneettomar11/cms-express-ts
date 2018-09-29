import {expect} from 'chai';
import User from '../../server/models/user.model'

describe('UserModel', ()=>{
    it('user setter', ()=>{
        const email = 'abc@gmail.com';
        const user = new User();
        user.email = email;
        expect(user.email).eq(email);
    });
});