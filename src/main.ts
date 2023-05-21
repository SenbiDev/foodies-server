import { NestFactory } from '@nestjs/core';
// import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  // const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const app = await NestFactory.create(AppModule);

  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  //   res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  //   next();
  // });

  app.enableCors({
    // allowedHeaders: '*',
    origin : ['https://foodies-server-eight.vercel.app'],
    // credentials: true,
    methods : ['GET','POST','PUT','DELETE'],
  });

  await app.listen(3000);
}
bootstrap();
