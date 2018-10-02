import { Column, Entity, JoinColumn,  ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "categories"})
export class Category {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @Column()
    public description: string;

    @Column()
    public order: number;

    @ManyToOne( (type) => Category)
    @JoinColumn()
    public parent: Category;
}
