import { User, UserRole } from "./types.js";

export const users: User[] = [
  {
    id: 1,
    name: "System Administrator",
    email: "admin@example.com",
    password: "temporary-password",
    role: UserRole.ADMIN
  },
  {
    id: 2,
    name: "System Staff",
    email: "staff@example.com",
    password: "temporary-password",
    role: UserRole.STAFF
  },
  {
    id: 3,
    name: "Test Customer",
    email: "customer@example.com",
    password: "temporary-password",
    role: UserRole.CUSTOMER
  }
];