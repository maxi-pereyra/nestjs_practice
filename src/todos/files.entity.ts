import {
    Column , 
    Entity , 
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
    } from 'typeorm';
import { Todo } from './todo.entity';

@Entity({name: ' files' })
export class File {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string;

    @Column()
    mimeType: string;

    @Column({type: 'longblob'})
    data: Buffer;


    @ManyToOne(() => Todo, (todo) => todo.files ) 
    @JoinColumn({name: 'todo_id'})
    todo: Todo | null;
}