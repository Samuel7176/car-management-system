import { addVehicle, findVehicleById } from "./vehicleService.js";
import {
  VehicleStatus,
  FuelType,
  Transmission,
  VehicleType
} from "./types.js";

console.log("Car Management System");

const newVehicle = {
  id: 5,
  make: "Nissan",
  model: "X-Trail",
  year: 2023,
  price: 2500000,
  status: VehicleStatus.AVAILABLE,
  registrationNumber: "KDD 456D",
  mileage: 25000,
  fuelType: FuelType.PETROL,
  transmission: Transmission.AUTOMATIC,
  dailyRentalPrice: 6500,
  type: VehicleType.CAR
};

addVehicle(newVehicle);

const vehicle = findVehicleById(4);

if (vehicle) {
  console.log("Vehicle added successfully.");
  console.log(`Vehicle: ${vehicle.make} ${vehicle.model}`);
  console.log(`Registration: ${vehicle.registrationNumber}`);
  console.log(`Year: ${vehicle.year}`);
  console.log(`Mileage: ${vehicle.mileage} km`);
  console.log(`Fuel: ${vehicle.fuelType}`);
  console.log(`Transmission: ${vehicle.transmission}`);
  console.log(`Sale Price: KES ${vehicle.price}`);
  console.log(`Daily Rental: KES ${vehicle.dailyRentalPrice}`);
  console.log(`Type: ${vehicle.type}`);
  console.log(`Status: ${vehicle.status}`);
} else {
  console.log("Vehicle was not found.");
}