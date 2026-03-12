import { Controller, Get, Param, Query } from '@nestjs/common'
import { CompanyService } from './company.service'
import { CompanySearchDto } from './dto/company-search.dto'
import { extractDataAndTotal, successResponse } from '../common/utils/response.util'

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async searchCompanies(@Query() query: CompanySearchDto) {
    const result = await this.companyService.searchCompanies(query)
    const { data, total } = extractDataAndTotal(result)
    return successResponse(data, total)
  }

  @Get(':mst')
  async getCompanyByMst(@Param('mst') mst: string) {
    const result = await this.companyService.getCompanyByMst(mst)
    return successResponse(result)
  }
}
