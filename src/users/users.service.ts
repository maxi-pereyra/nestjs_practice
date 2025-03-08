import { Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "./users.repository";
import { User } from "./users.interface";

@Injectable()
export class UsersService {
   
 
    constructor(private userRepositoty: UserRepository,
        @Inject('API_USERS') private apiUsers: User[],
    ) {}
    async getUsers(){
        const dbUsers = await this.userRepositoty.getUsers();
        const users = [... dbUsers, ...this.apiUsers];
        return users;
    }

    getUserById(id: number){    
        return this.userRepositoty.getById(id)
    }

    getUserByName(name: string) {
        return this.userRepositoty.getByName(name)
    }

    createUser(user: Omit<User, 'id'>): Promise<User> {
        return this.userRepositoty.createUser(user)
    }

}