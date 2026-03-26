import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { IndustryController } from './industry.controller'
import { IndustryService } from './industry.service'
import { externalHttpsAgent } from '../common/http/external-api-agent'

@Module({
  imports: [
    HttpModule.register({
      httpsAgent: externalHttpsAgent,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    }),
  ],
  controllers: [IndustryController],
  providers: [IndustryService],
})
export class IndustryModule {}
