import {Sequelize} from 'sequelize-typescript';

console.log("Dir Name ", __dirname);
export const sequelize =  new Sequelize({
    database: 'cms_express_ts',
    dialect: 'mysql',
    username: 'root',
    password: '123456',
    storage: ':memory:',
    modelPaths: [__dirname + '/models']
});