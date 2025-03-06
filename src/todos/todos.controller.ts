import { Controller, Get } from "@nestjs/common";
import { TodosService } from "./todos.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadedFile } from "@nestjs/common";
import { Post , UseInterceptors } from "@nestjs/common";

@Controller('todos')
export class TodosController {
    constructor(private readonly TodosService: TodosService){

    }

    @Get()
    getTodos() {
        return this.TodosService.getTodos();
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File){
        return file;
    }
}