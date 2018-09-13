import {Table, Column, Model, PrimaryKey, CreatedAt, UpdatedAt} from 'sequelize-typescript';

export enum USERTYPE{
    ADMIN = "ADMIN"
}

@Table
export class User extends Model<User> {

    @PrimaryKey
    @Column
    email: string;

    @Column
    firstName: string;

    @Column
    lastName: string;

    @Column
    type: USERTYPE;
}