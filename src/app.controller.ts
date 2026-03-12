import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { successResponse } from './common/utils/response.util'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return successResponse(this.appService.getHello())
  }

  @Get('health')
  getHealth() {
    return successResponse({ status: 'ok' })
  }
}
