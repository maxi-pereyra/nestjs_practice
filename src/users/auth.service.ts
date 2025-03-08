import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./users.entity";
import { UsersDbService } from "./usersDB.service";

@Injectable()
export class authService {
    constructor(private readonly usersService: UsersDbService){}

    async signUp( user: User ) {
        const dbUser = await this.usersService.getUserByEmail(user.email)
        if(dbUser){
            throw new BadRequestException('Email already exist');
        }
        return;
    }

    async signIn() {}
}