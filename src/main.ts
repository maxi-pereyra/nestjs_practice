import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware, loggerGlobal } from './middlewares/logger.middleware';
import { AuthGuard } from './guards/auth.guards';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.use(LoggerMiddleware)
  //app.useGlobalGuards(new AuthGuard())//no la clase en si sino una intancia e la clase
  //sapp.useGlobalInterceptors(new myInterceptor)
  app.useGlobalPipes(new ValidationPipe())
 
  app.use(loggerGlobal)
 
  const swaggerConfig = new DocumentBuilder()
                              .setTitle('Demo nest')
                              .setDescription('estoes una api construida con nest')
                              .setVersion('1.0')
                              .build()
                            
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
