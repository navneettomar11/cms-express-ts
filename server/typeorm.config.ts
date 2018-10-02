import { createConnection, getConnectionOptions } from "typeorm";
import { Category } from "./models/category.model";
import User from "./models/user.model";

export const initializeFunction = async () => {
    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
    const cmsEntities = [Category, User];
    return await createConnection({ ...connectionOptions, entities: cmsEntities, name: "default" });
};
