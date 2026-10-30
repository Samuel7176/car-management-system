import { Type } from 'class-transformer';
import { IsValidPriceRangeConstraint } from '../validators/is-valid-price-range.validator.js';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  Validate,
} from 'class-validator';

import {
  FuelType,
  VehicleStatus,
  VehicleType,
} from './create-vehicle.dto.js';

export enum VehicleSortBy {
  PRICE = 'price',
  RENTAL_PRICE = 'dailyRentalPrice',
  YEAR = 'year',
  MILEAGE = 'mileage',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class GetVehiclesQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  make?: string;

  @IsOptional()
  @IsEnum(VehicleStatus)
  status?: VehicleStatus;

  @IsOptional()
  @IsEnum(FuelType)
  fuelType?: FuelType;

  @IsOptional()
  @IsEnum(VehicleType)
  type?: VehicleType;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @IsOptional()
  @IsEnum(VehicleSortBy)
  sortBy?: VehicleSortBy;

  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Validate(IsValidPriceRangeConstraint, ['maxPrice'])
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  maxPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1950)
  @Max(new Date().getFullYear())
  @Validate(IsValidPriceRangeConstraint, ['maxYear'])
  minYear?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1950)
  @Max(new Date().getFullYear())
  maxYear?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Validate(IsValidPriceRangeConstraint, ['maxRentalPrice'])
  minRentalPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  maxRentalPrice?: number;
}