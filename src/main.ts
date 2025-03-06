import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware, loggerGlobal } from './middlewares/logger.middleware';
import { AuthGuard } from './guards/auth.guards';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.use(LoggerMiddleware)
  //app.useGlobalGuards(new AuthGuard())//no la clase en si sino una intancia e la clase
  //sapp.useGlobalInterceptors(new myInterceptor)
  app.useGlobalPipes(new ValidationPipe())
  app.use(loggerGlobal)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
