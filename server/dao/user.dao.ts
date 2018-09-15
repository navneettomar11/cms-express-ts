import User from "../models/user.model";
import { getConnection, getRepository } from "typeorm";

export class UserDao {
    
    public static async save(user: User): Promise<User>{
        let userRepositry = getRepository(User);
        return await userRepositry.save(user);
    }

    public static async findOne(userEmail:string):Promise<User>{
        let userRepositry = getRepository(User);
        return await userRepositry.findOne({email: userEmail})
    }

    public static async comparePassword(password:string):Promise<Boolean>{
        let userRepositry = getRepository(User,'default');
        let count = await userRepositry.createQueryBuilder('user')
        .where('user.password = md5(:pwd)',{pwd: password})
        .getCount();
        return count > 0
    }

}