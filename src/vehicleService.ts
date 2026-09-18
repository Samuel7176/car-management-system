import { vehicles } from "./vehicles.js";
import { Car, VehicleStatus } from "./types.js";

export function findVehicleById(id: number): Car | undefined {
  return vehicles.find((car) => car.id === id);
}

export function addVehicle(car: Car): void {
  vehicles.push(car);
}

export function getAvailableVehicles(): Car[] {
  return vehicles.filter(
    (car) => car.status === VehicleStatus.AVAILABLE
  );
}
export function searchVehicles(searchTerm: string): Car[] {
  const term = searchTerm.toLowerCase();

  return vehicles.filter((car) =>
    car.make.toLowerCase().includes(term) ||
    car.model.toLowerCase().includes(term)
  );
}
export function updateVehicleStatus(
  id: number,
  status: VehicleStatus
): boolean {
  const vehicle = findVehicleById(id);

  if (!vehicle) {
    return false;
  }

  vehicle.status = status;
  return true;
}