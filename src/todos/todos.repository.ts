import { Injectable } from "@nestjs/common";

@Injectable()
export class TodosRepository {
    private todos = [
        {
            id: 1,
            title: "todo 1",
            description: "description 1",
            isCompleted: false
        },
        {
            id: 2,
            title: "todo 2",
            description: "description 2",
            isCompleted: false
        }
    ];
    async getTodo(){
        return this.todos
    }
}
