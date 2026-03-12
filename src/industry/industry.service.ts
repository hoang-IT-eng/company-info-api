import { HttpService } from '@nestjs/axios'
import { BadGatewayException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class IndustryService {
  private readonly baseUrl: string

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.getOrThrow<string>('externalApi.baseUrl')
  }

  async getIndustries() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/industry`),
      )
      return response.data
    } catch {
      throw new BadGatewayException(
        'External API error: unable to retrieve industry data.',
      )
    }
  }
}
