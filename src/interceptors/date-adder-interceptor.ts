/*podemos modificar y controlar el flujo de las solicitudes HTTP para agregar funcionalidades como el registro,
 la transformación de datos y la gestión de errores. */

 import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { ExecException } from "child_process";
import { Observable } from "rxjs";

 @Injectable()
 export class DateAdderInterceptor implements NestInterceptor{
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>>{
        const now = new Date();
        console.log(now);
        const format = now.toLocaleDateString('es-AR' , {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
        const request = context.switchToHttp().getRequest();
        request.now = format;
        return next.handle()
    }
 }