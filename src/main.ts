import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { RequestMethod, ValidationPipe } from '@nestjs/common'
import helmet from 'helmet'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'

const buildAllowList = (value: string | undefined) =>
  (value ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)

  const frontendUrl = configService.get<string>('frontendUrl')
  const allowList = buildAllowList(frontendUrl)

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)

      if (allowList.length === 0 || allowList.includes('*')) {
        return callback(null, true)
      }

      if (allowList.includes(origin)) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'), false)
    },
    credentials: true,
  })

  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  })
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
