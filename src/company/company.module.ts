import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { CompanyController } from './company.controller'
import { CompanyService } from './company.service'
import { externalHttpsAgent } from '../common/http/external-api-agent'

@Module({
  imports: [HttpModule.register({ httpsAgent: externalHttpsAgent })],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
