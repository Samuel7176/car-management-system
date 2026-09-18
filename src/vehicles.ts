import {
  Car,
  VehicleStatus,
  FuelType,
  Transmission,
  VehicleType
} from "./types.js";

export const vehicles: Car[] = [
  {
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
  },
  {
    id: 2,
    make: "Honda",
    model: "Civic",
    year: 2021,
    price: 1800000,
    status: VehicleStatus.RENTED,
    registrationNumber: "KDB 456B",
    mileage: 52000,
    fuelType: FuelType.PETROL,
    transmission: Transmission.AUTOMATIC,
    dailyRentalPrice: 5500,
    type: VehicleType.CAR
  },
  {
    id: 3,
    make: "Mazda",
    model: "CX-5",
    year: 2023,
    price: 2800000,
    status: VehicleStatus.MAINTENANCE,
    registrationNumber: "KDC 789C",
    mileage: 30000,
    fuelType: FuelType.DIESEL,
    transmission: Transmission.AUTOMATIC,
    dailyRentalPrice: 7000,
    type: VehicleType.CAR
  },
  {
    id: 4,
    make: "Yamaha",
    model: "FZ",
    year: 2022,
    price: 450000,
    status: VehicleStatus.AVAILABLE,
    registrationNumber: "KDE 321E",
    mileage: 18000,
    fuelType: FuelType.PETROL,
    transmission: Transmission.MANUAL,
    dailyRentalPrice: 2000,
    type: VehicleType.MOTORCYCLE
  }
];