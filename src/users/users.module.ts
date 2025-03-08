import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserController } from "./users.controller";
import { LoggerMiddleware } from "src/middlewares/logger.middleware";
import { UserRepository } from "./users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { UsersDbService } from "./usersDB.service";
import { CloudinaryService } from "./cloudinary.service";
import { CloudinaryConfig } from "src/config/cloudinary";

//const mockUserService = {
//getUsers: () => 'Esto es un servicio mock de usuarios '
//}

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [
        //{
        //    provide: UsersService,
        //    useValue: mockUserService
        //},
        UsersService,
        UsersDbService,
        UserRepository,
        CloudinaryService,
        CloudinaryConfig,
        {
            provide:'API_USERS',
            useFactory: async () => {
                const apiUsers = await fetch('https://jsonplaceholder.typicode.com/users',
                ).then((response) => response.json());
                return apiUsers.map((user) => { 
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                })
            }
        }
    ],
    controllers: [UserController]
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes("users")
    }
}