import { HttpService } from '@nestjs/axios'
import { BadGatewayException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class LocationService {
  private readonly baseUrl: string

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.getOrThrow<string>('externalApi.baseUrl')
  }

  private async fetch<T>(url: string): Promise<T> {
    try {
      const response = await firstValueFrom(this.httpService.get<T>(url))
      return response.data
    } catch {
      throw new BadGatewayException(
        'External API error: unable to retrieve location data.',
      )
    }
  }

  getCities() {
    return this.fetch(`${this.baseUrl}/city`)
  }

  getCityById(id: number) {
    return this.fetch(`${this.baseUrl}/city/${id}`)
  }

  getDistrictsByCityId(id: number) {
    return this.fetch(`${this.baseUrl}/city/${id}/district`)
  }

  getWardsByDistrictId(id: number) {
    return this.fetch(`${this.baseUrl}/district/${id}/ward`)
  }
}
