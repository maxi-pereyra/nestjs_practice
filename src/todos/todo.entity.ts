import {Entity , Column , PrimaryGeneratedColumn,OneToMany} from "typeorm";
import { File } from "./files.entity";
@Entity({
    name:'todos'
})
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column({default: false})
    isComplete: boolean;
    @OneToMany(()=> File, (file) => file.todo)
    files:File[]
}