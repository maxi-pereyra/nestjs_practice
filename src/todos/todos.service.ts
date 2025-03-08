import { Inject, Injectable } from "@nestjs/common";
import { TodosRepository } from "./todos.repository";
import { Repository } from "typeorm";
import { Todo } from "./todo.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TodosService {
    constructor(
        private todosRepository: TodosRepository, 
        @Inject('ACCESS_TOKEN') private accessToken: string,
        @InjectRepository(Todo)
        private todosDbRepository: Repository<Todo>
    ){}
   // getTodos(){
   //     return this.accessToken === "Esta es mi clave secreta "
   //     ? this.todosRepository.getTodo() 
   //     :"no tiene ecceso a esta informacion"
   // }
   getTodos() {
    return this.todosDbRepository.find({
        relations: ['files'],
    });
   }

   findById(id: number) {
     return this.todosDbRepository.findOne({ where: {id} , relations: ['files'],})
   }

   create(todo: Omit<Todo, 'id'>) {
    return this.todosDbRepository.save(todo)
   }
}