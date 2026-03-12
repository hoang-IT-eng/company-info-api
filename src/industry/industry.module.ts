import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { IndustryController } from './industry.controller'
import { IndustryService } from './industry.service'

@Module({
  imports: [HttpModule],
  controllers: [IndustryController],
  providers: [IndustryService],
})
export class IndustryModule {}
