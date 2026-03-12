import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import helmet from 'helmet'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)

  const frontendUrl = configService.get<string>('frontendUrl')

  app.enableCors({
    origin: frontendUrl,
    credentials: true,
  })

  app.setGlobalPrefix('api')
  app.use(helmet())
  app.useGlobalFilters(new HttpExceptionFilter())

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  )

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Company Info API')
    .setDescription('API docs for thongtindoanhnghiep.co proxy')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('docs', app, document)

  const port = configService.getOrThrow<number>('port')

  await app.listen(port)
}
bootstrap()
