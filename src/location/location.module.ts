import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { LocationController } from './location.controller'
import { LocationService } from './location.service'
import { externalHttpsAgent } from '../common/http/external-api-agent'

@Module({
  imports: [HttpModule.register({ httpsAgent: externalHttpsAgent })],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
