import { Entity, PrimaryColumn, Column, BeforeInsert } from "typeorm";
import {Md5} from "md5-typescript";

@Entity({name: 'users'})
export default class User  {

    @PrimaryColumn()
    public email: string;

    @Column({type:'varchar'})
    public firstName: string;

    @Column({type:'varchar'})
    public lastName: string;

    @Column({type:'varchar'})
    public userType: string;

    @Column({type: 'varchar', name: 'passwd'})
    public password: string;

    constructor(email:string, firstName: string, lastName: string, userType: string = 'USER'){
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userType = userType;
    }

    @BeforeInsert()
    public getSaltPassword(){
        this.password = Md5.init(this.password);
    }
}