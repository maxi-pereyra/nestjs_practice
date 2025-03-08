import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable, throwError } from "rxjs"; // >>>>>VER OBSERBABLES


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService){}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization'].split('')[1] ?? '';
        if(!token){
            throw new UnauthorizedException(' bearer token not found');
        }
        try{
            const secret = process.env.JWT_SECRET
            const payload =  this.jwtService.verify(token,{secret});
            payload.iat = new Date(payload.iat*1000);
            payload.exp = new Date(payload.exp*1000);
            request.user =payload;
            return true;
        }catch(err){    
            throw new UnauthorizedException('invalid token')
        }
        //return token == '1234'
    }

}