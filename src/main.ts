import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Mi API')
    .setDescription('Documentación de mi API con NestJS y Swagger')
    .setVersion('1.0')
    .build();
   const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // La ruta donde se verá la documentación
   app.enableCors({
    origin:[
      '*',
      'http://localhost:5173',
      'https://bedega-pos.vercel.app/'] ,// o '*' para cualquier origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(3000);
  console.log(`Aplicación corriendo en http://localhost:3000`);
  console.log(`Swagger disponible en http://localhost:3000/api`);
}
bootstrap();
