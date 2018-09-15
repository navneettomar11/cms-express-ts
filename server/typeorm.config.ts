import { createConnection } from "typeorm";
import User from "./models/user.model";

   
let initializeFunction = async () =>{
    const connection = await createConnection({
        name: "default",
        type: "mysql",
        host: "localhost",
        username: "cms_express_ts",
        password: "cms_express_ts",
        database: "cms_express_ts",
        port: 3306,
        entities: [User]
    });
    return connection;
}

export const connection = initializeFunction();

