import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
export enum VehicleStatus {
  AVAILABLE = 'available',
  RENTED = 'rented',
  SOLD = 'sold',
  MAINTENANCE = 'maintenance',
}
export enum FuelType {
  PETROL = 'petrol',
  DIESEL = 'diesel',
  ELECTRIC = 'electric',
  HYBRID = 'hybrid',
}
export enum Transmission {
  MANUAL = 'manual',
  AUTOMATIC = 'automatic',
}

export enum VehicleType {
  CAR = 'car',
  MOTORCYCLE = 'motorcycle',
}

export class CreateVehicleDto {

  @IsString()
  @IsNotEmpty()
  make: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsInt()
  @Min(1950)
  @Max(new Date().getFullYear())
  year: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsEnum(VehicleStatus)
  @IsNotEmpty()
  status: VehicleStatus;

  @IsString()
  @IsNotEmpty()
  registrationNumber: string;

  @IsInt()
  @Min(0)
  mileage: number;

  @IsEnum(FuelType)
  @IsNotEmpty()
  fuelType: FuelType;

  @IsEnum(Transmission)
  @IsNotEmpty()
  transmission: Transmission;

  @IsEnum(VehicleType)
  @IsNotEmpty()
  type: VehicleType;

  @IsNumber()
  @Min(0)
  dailyRentalPrice: number;
}