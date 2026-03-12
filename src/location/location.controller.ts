import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { LocationService } from './location.service'
import { extractDataAndTotal, successResponse } from '../common/utils/response.util'

@Controller()
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('city')
  async getCities() {
    const result = await this.locationService.getCities()
    const { data, total } = extractDataAndTotal(result)
    return successResponse(data, total)
  }

  @Get('city/:id')
  async getCityById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.locationService.getCityById(id)
    return successResponse(result)
  }

  @Get('city/:id/district')
  async getDistrictsByCity(@Param('id', ParseIntPipe) id: number) {
    const result = await this.locationService.getDistrictsByCityId(id)
    const { data, total } = extractDataAndTotal(result)
    return successResponse(data, total)
  }

  @Get('district/:id/ward')
  async getWardsByDistrict(@Param('id', ParseIntPipe) id: number) {
    const result = await this.locationService.getWardsByDistrictId(id)
    const { data, total } = extractDataAndTotal(result)
    return successResponse(data, total)
  }
}
