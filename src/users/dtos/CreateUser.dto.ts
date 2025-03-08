import { IsNotEmpty, IsString, IsEmail, MinLength, IsEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    password: string;

    @IsEmpty()
    isAdmin: boolean;
}