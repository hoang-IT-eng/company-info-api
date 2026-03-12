import { Controller, Get } from '@nestjs/common'
import { IndustryService } from './industry.service'
import { extractDataAndTotal, successResponse } from '../common/utils/response.util'

@Controller('industry')
export class IndustryController {
  constructor(private readonly industryService: IndustryService) {}

  @Get()
  async getIndustries() {
    const result = await this.industryService.getIndustries()
    const { data, total } = extractDataAndTotal(result)
    return successResponse(data, total)
  }
}
