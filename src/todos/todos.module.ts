import { Module } from "@nestjs/common";
import { TodosService } from "./todos.service";
import { TodosController } from "./todos.controller";
import { TodosRepository } from "./todos.repository";
import { Todo } from "./todo.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilesService } from "./files.service";


const ACCESS = "Esta es mi clave secreta"

@Module({
    imports: [TypeOrmModule.forFeature([Todo,File])],
    providers: [TodosService, FilesService, TodosRepository,
        {
            provide: 'ACCESS_TOKEN',
            useValue: ACCESS,
        }
    ],
    controllers: [TodosController]
})
export class TodosModule {}
