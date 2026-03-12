import { Type } from 'class-transformer'
import { IsInt, IsOptional, IsString, Min } from 'class-validator'

export class CompanySearchDto {
  @IsOptional()
  @IsString()
  k?: string

  @IsOptional()
  @IsString()
  l?: string

  @IsOptional()
  @IsString()
  i?: string

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  p?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  r?: number
}
