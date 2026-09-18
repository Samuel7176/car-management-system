export enum VehicleStatus {
  AVAILABLE = "available",
  RENTED = "rented",
  SOLD = "sold",
  MAINTENANCE = "maintenance"
}

export enum FuelType {
  PETROL = "petrol",
  DIESEL = "diesel",
  ELECTRIC = "electric",
  HYBRID = "hybrid"
}

export enum Transmission {
  MANUAL = "manual",
  AUTOMATIC = "automatic"
}

export enum VehicleType {
  CAR = "car",
  MOTORCYCLE = "motorcycle"
}

export type Car = {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  status: VehicleStatus;
  registrationNumber: string;
  mileage: number;
  fuelType: FuelType;
  transmission: Transmission;
  dailyRentalPrice: number;
  type: VehicleType;
};