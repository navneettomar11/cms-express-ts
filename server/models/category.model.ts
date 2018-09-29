import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity({name: 'categories'})
export class Category {

    @PrimaryGeneratedColumn()
    public id:number;

    @Column()
    public name:string;

    

}
