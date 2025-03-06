import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Headers, 
    HttpCode, 
    Param, 
    ParseUUIDPipe, 
    Post, Put, Query, Req, Res, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Request, Response } from "express";
//import { User } from "./users.interface";
import { AuthGuard } from "src/guards/auth.guards";
import { DateAdderInterceptor } from "src/interceptors/date-adder-interceptor";
import { UsersDbService } from "./usersDB.service";
//import { User as UserEntity } from "./users.entity";
import { CreateUserDto } from "./dtos/CreateUser.dto";

@Controller("users")
//@UseGuards(AuthGuard)
export class UserController {
    constructor(
        private readonly UsersService: UsersService,
        private readonly usersDbservice: UsersDbService
    ) {}

    @Get()
    getUsers(@Query('name') name?:string){

        if(name){
            console.log(name)
            return this.UsersService.getUserByName(name)
        }
        return this.UsersService.getUsers();
    }

     @Get('profile')
    getUsersProfile(@Headers('token') token?: string){
        if(token !== '1234'){
            return "Sin acceso"
        }
        return "perfil usuario"
    }

    
    @Get('profile/images')
    @UseGuards(AuthGuard) //lo puedo usar para todos a la altura de la class
    getUsersProfileImages(){
        return "Esto trae el imagenes del perfil del usuario";
    }

    @HttpCode(418)
    @Get('cofee')
    getCofee(){
        return "Nose hacer cafee , soy una tetera";
    }

    @Get('message')
    getMessage(@Res() response: Response){
        response.status(201).send("Este es un mensage")
    }

    @Get('request')
    getRequest(@Req() request: Request){
        console.log(request)
        return "Esta ruta loguea el request"
    }

    @Get(':id')
    getUserById(@Param('id' , ParseUUIDPipe) id:string){
        //return this.UsersService.getUserById(Number(id))
        return this.usersDbservice.getUserById(id)
    }
    @Post()
    @UseInterceptors(DateAdderInterceptor)
    createUser(
        @Body() user: CreateUserDto, 
        @Req() request: Request & {now: string}){
        console.log('dentro del endpoint', request.now)
        //return this.UsersService.createUser(user)
        return this.usersDbservice.saveUser({...user,createAt: request.now})
    }

    @Put()
    updateUser(){
        return "Esto actualiza un usuario"
    }

    @Delete()
    deleteUser(){
        return "Esto elimina un usuario"
    }
   
}