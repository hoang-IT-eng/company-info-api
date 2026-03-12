import { HttpService } from '@nestjs/axios'
import { BadGatewayException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { firstValueFrom } from 'rxjs'
import { CompanySearchDto } from './dto/company-search.dto'

type CacheEntry = {
  expiresAt: number
  value: unknown
}

@Injectable()
export class CompanyService {
  private readonly cache = new Map<string, CacheEntry>()
  private readonly ttlMs = 5 * 60 * 1000
  private readonly baseUrl: string

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.getOrThrow<string>('externalApi.baseUrl')
  }

  private getCache(key: string) {
    const entry = this.cache.get(key)
    if (!entry) {
      return undefined
    }
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key)
      return undefined
    }
    return entry.value
  }

  private setCache(key: string, value: unknown) {
    this.cache.set(key, { value, expiresAt: Date.now() + this.ttlMs })
  }

  private async fetch<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    const cacheKey = params ? `${url}?${JSON.stringify(params)}` : url
    const cached = this.getCache(cacheKey)
    if (cached !== undefined) {
      return cached as T
    }

    try {
      const response = await firstValueFrom(this.httpService.get<T>(url, { params }))
      this.setCache(cacheKey, response.data)
      return response.data
    } catch {
      throw new BadGatewayException(
        'External API error: unable to retrieve company data.',
      )
    }
  }

  searchCompanies(query: CompanySearchDto) {
    return this.fetch(`${this.baseUrl}/company`, { ...query })
  }

  getCompanyByMst(mst: string) {
    return this.fetch(`${this.baseUrl}/company/${mst}`)
  }
}
