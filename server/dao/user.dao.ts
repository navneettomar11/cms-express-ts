import User from "../models/user.model";
import {getRepository } from "typeorm";

export class UserDao {
    
    public async save(user: User): Promise<User>{
        let userRepositry = getRepository(User);
        return await userRepositry.save(user);
    }

    public  async findOne(userEmail:string):Promise<User>{
        let userRepositry = getRepository(User);
        return await userRepositry.findOne({email: userEmail})
    }

    public async comparePassword(password:string):Promise<Boolean>{
        let userRepositry = getRepository(User);
        let count = await userRepositry.createQueryBuilder('user')
        .where('user.password = md5(:pwd)',{pwd: password})
        .getCount();
        return count > 0
    }

}
