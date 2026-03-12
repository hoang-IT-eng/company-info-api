import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { CompanyController } from './company.controller'
import { CompanyService } from './company.service'

@Module({
  imports: [HttpModule],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
