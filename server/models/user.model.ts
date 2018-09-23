import { Entity, PrimaryColumn, Column, BeforeInsert, Generated } from "typeorm";
import {IsEmail, IsNotEmpty, MaxLength, MinLength, Length} from 'class-validator';
import {Md5} from "md5-typescript";
import { IsEmailAlreadyExist } from "../utils/isemail-alreadyexist-constraint";

@Entity({name: 'users'})
export default class User  {

    @PrimaryColumn()
    @IsNotEmpty()
    @IsEmail()
    @IsEmailAlreadyExist({
        message: "Email $value already exists. Choose another email.",
        
    })
    public email: string;

    @Column({type:'varchar'})
    @IsNotEmpty()
    public firstName: string;

    @Column({type:'varchar'})
    @IsNotEmpty()
    public lastName: string;

    @Column({type:'varchar'})
    public userType: string = 'USER';

    @Column({type: 'varchar', name: 'passwd'})
    @IsNotEmpty()
    @Length(8)
    public password: string;


    @Column({type:'varchar'})
    @Generated("uuid")
    public guid:string;

    @BeforeInsert()
    public getSaltPassword(){
        this.password = Md5.init(this.password);
    }

    public toString():string{
        return `{email : ${this.email}, 
            firstName: ${this.firstName}, 
            lastName: ${this.lastName}, 
            type: ${this.userType}}`
    }
}