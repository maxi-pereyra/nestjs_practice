import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Todo } from "./todo.entity";
import { File } from "./files.entity";


@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(File)
        private readonly filesRepository: Repository<File>,
    ){}

    async saveFile({
        name,
        mimeType,
        data,
        todo,
    }: {
        name: string;
        mimeType: string;
        data: Buffer;
        todo: Todo | null;
    }){
        const file = new File();
        file.name = name;
        file. mimeType = mimeType;
        file.data = data;
        file.todo = todo;

        return this.filesRepository.save(file);
    }
}