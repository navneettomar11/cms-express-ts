import { createConnection, getConnectionOptions } from "typeorm";
import User from "./models/user.model";
import { Category } from "./models/category.model";
   
export const initializeFunction = async () =>{
    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
    const cmsEntities = [User, Category];
    return await createConnection({ ...connectionOptions,entities: cmsEntities, name: "default" });
}


