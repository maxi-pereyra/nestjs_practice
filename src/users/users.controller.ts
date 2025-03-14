import { 
    Body, 
    Controller, 
    Delete, 
    FileTypeValidator, 
    Get, 
    Headers, 
    HttpCode, 
    MaxFileSizeValidator, 
    Param, 
    ParseFilePipe, 
    ParseUUIDPipe, 
    Post, Put, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors, 
    UsePipes} from "@nestjs/common";
import { UsersService } from "./users.service";
import { Request, Response } from "express";
//import { User } from "./users.interface";
import { AuthGuard } from "src/guards/auth.guards";
import { DateAdderInterceptor } from "src/interceptors/date-adder-interceptor";
import { UsersDbService } from "./usersDB.service";
//import { User as UserEntity } from "./users.entity";
import { CreateUserDto } from "./dtos/CreateUser.dto";
import { CloudinaryService } from "./cloudinary.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { MinSizeValidatorPipe } from "src/pipes/min-size-validator.pipe";
import { authService } from "./auth.service";
import { UserCredentialsDto } from "./dtos/UserCredentials.dto";
import { Roles } from "src/decorators/roles.decorators";
import { Role } from "src/roles.enum";
import { RolesGuard } from "src/guards/roles.guards";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('users')
@Controller("users")
//@UseGuards(AuthGuard)
export class UserController {
    constructor(
        private readonly UsersService: UsersService,
        private readonly usersDbservice: UsersDbService,
        private readonly cloudinaryService: CloudinaryService,
        private readonly authService: authService
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
     @UseGuards(AuthGuard)
    getUsersProfile(/*@Headers('token') token?: string*/ @Req() request: Request & {user:any}){
        //if(token !== '1234'){
        //    return "Sin acceso"
        //}
        console.log(request.user)

        return "perfil usuario"
    }

    
    @Get('profile/images')
    @UseGuards(AuthGuard) //lo puedo usar para todos a la altura de la class
    getUsersProfileImages(){
        return "Esto trae el imagenes del perfil del usuario";
    }

    @Post('profile/images')
    @UseInterceptors(FileInterceptor('image'))
    @UsePipes(MinSizeValidatorPipe)
    postUserImage(@UploadedFile(
        new ParseFilePipe({
            validators:[
                new MaxFileSizeValidator({
                    maxSize: 100000,
                    message: 'el archivo debe ser menor a 100k',
                }),
                new FileTypeValidator({
                    fileType: /(jpg|jpeg|png|webp)$/
                })
            ]
        })
    ) file: Express.Multer.File){
      //  return this.cloudinaryService.uploadImage(file);
        return file;
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

    @Get('admin')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard,RolesGuard)
    getAdmin() {
        return 'ruta protegida'
    }

    @Get(':id')
    getUserById(@Param('id' , ParseUUIDPipe) id:string){
        //return this.UsersService.getUserById(Number(id))
        return this.usersDbservice.getUserById(id)
    }
    
    @Post('signup')
    @UseInterceptors(DateAdderInterceptor)
    createUser(
        @Body() user: CreateUserDto, 
        @Req() request: Request & {now: string}){
        console.log('dentro del endpoint', request.now)
        //return this.UsersService.createUser(user)
        return this.authService.signUp({...user,createAt: request.now})
    }

    @Post('signin')
    async signin(@Body() user:UserCredentialsDto){
        return this.authService.signIn( user.email, user.password)
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