import {getRepository } from "typeorm";
import User from "../models/user.model";

export class UserDao {

    public async save(user: User): Promise<User> {
        const userRepositry = getRepository(User);
        return await userRepositry.save(user);
    }

    public  async findOne(userEmail: string): Promise<User> {
        const userRepositry = getRepository(User);
        return await userRepositry.findOne({email: userEmail});
    }

    public async comparePassword(password: string): Promise<boolean> {
        const userRepositry = getRepository(User);
        const count = await userRepositry.createQueryBuilder("user")
        .where("user.password = md5(:pwd)", {pwd: password})
        .getCount();
        return count > 0;
    }

}
