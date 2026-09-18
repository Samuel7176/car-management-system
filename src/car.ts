import {
  Car,
  VehicleStatus,
  FuelType,
  Transmission,
  VehicleType
} from "./types.js";

export function getCar(): Car {
  return {
    id: 1,
    make: "Toyota",
    model: "Corolla",
    year: 2022,
    price: 1500000,
    status: VehicleStatus.AVAILABLE,
    registrationNumber: "KDA 123A",
    mileage: 45000,
    fuelType: FuelType.PETROL,
    transmission: Transmission.AUTOMATIC,
    dailyRentalPrice: 5000,
    type: VehicleType.CAR
  };
}