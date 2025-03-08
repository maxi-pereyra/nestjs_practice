import { Body, Controller, Get } from "@nestjs/common";
import { TodosService } from "./todos.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadedFile } from "@nestjs/common";
import { Post , UseInterceptors } from "@nestjs/common";
import { FilesService } from "./files.service";

@Controller('todos')
export class TodosController {
    constructor(private readonly TodosService: TodosService,
        private readonly filesServices: FilesService
    ){}

    @Get()
    getTodos() {
        return this.TodosService.getTodos();
    }

    @Post()
    crearTodo(@Body() todo: any){
        return this.TodosService.create(todo)
    }

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file')
    )
    async uploadFile(
        @Body('id') id: number,
        @UploadedFile() file: Express.Multer.File,
    ){
        const todo = await this.TodosService.findById(id)
        
        return this.filesServices.saveFile({
            name: file.originalname,
            mimeType: file.mimetype,
            data: file.buffer,
            todo,
        });
    }

}