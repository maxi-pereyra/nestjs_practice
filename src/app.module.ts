import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Todo } from './todos/todo.entity';
import { User } from './users/users.entity';
import typeOrmConfig from './config/typeorm';
//import { APP_INTERCEPTOR } from '@nestjs/core';
//import { AuthGuard } from './guards/auth.guards';
//import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: 
  [
    ConfigModule.forRoot({
      isGlobal: true,
     //envFilePath: './.env.development'
     load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
     inject:[ConfigService],
     useFactory: async (configService: ConfigService) => {
      const typeOrmConfig = configService.get('typeorm');
      if (!typeOrmConfig) {
        throw new Error('La configuración de TypeORM no se ha cargado correctamente.');
      }
      return {
        ...typeOrmConfig,
        entities: [User, Todo], // Asegúrate de que las entidades estén incluidas aquí
      };
    },
    }),
    UserModule,TodosModule,
  ],
  controllers: [],
  providers: [
    //{
    //  provide: APP_GUARD,
    //  useClass: AuthGuard
    //}
    //{
    //  provide: APP_INTERCEPTOR,
    //  useClass: MyInteceptor
    //}
  ],
})
export class AppModule {}
