import {
  findUserById,
  findUserByEmail,
  getUsersByRole
} from "./userService.js";

import { UserRole } from "./types.js";

console.log("Car Management System");

const user = findUserById(1);

if (user) {
  console.log(`User: ${user.name}`);
  console.log(`Email: ${user.email}`);
  console.log(`Role: ${user.role}`);
}

const customer = findUserByEmail("customer@example.com");

if (customer) {
  console.log(`Found customer: ${customer.name}`);
}

const customers = getUsersByRole(UserRole.CUSTOMER);

console.log(`Number of customers: ${customers.length}`);