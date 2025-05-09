import { v4 as uuid } from "uuid";
import { Entity, Column, PrimaryGeneratedColumn,  } from "typeorm";

@Entity({
    name: 'users'
})
export class User {
    @PrimaryGeneratedColumn()
    id: string = uuid()
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column({default:false})
    isAdmin: boolean;
    @Column()
    createAt: string;
}