import { Injectable } from "@nestjs/common";
import { User } from "./users.interface";

@Injectable()
export class UserRepository {

    private users: User[] = [
        {
            id: 1,
            name: "Name 1",
            email: "email1@gmail",
            password: "1234"
        },
        {
            id: 2,
            name: "Name 2",
            email: "email2@gmail",
            password: "1234"

        },
        {
            id: 3,
            name: "Name 3",
            email: "email3@gmail",
            password: "1234"
        },
    ];
    async getUsers(){
        return this.users
    }

    async getById(id: number) {
        return this.users.find((user)=>user.id === id)
    }

    async getByName(name: string) {
        return this.users.find((user)=>user.name === name)
    }

    async createUser(user: Omit<User, 'id'>){
        const id = this.users.length + 1;
        this.users = [... this.users , { id, ...user }];
        return { id, ...user}; 
    }
}
