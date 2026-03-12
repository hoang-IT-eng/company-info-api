import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { IndustryController } from './industry.controller'
import { IndustryService } from './industry.service'
import { externalHttpsAgent } from '../common/http/external-api-agent'

@Module({
  imports: [HttpModule.register({ httpsAgent: externalHttpsAgent })],
  controllers: [IndustryController],
  providers: [IndustryService],
})
export class IndustryModule {}
