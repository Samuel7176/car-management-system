import { users } from "./users.js";
import { User, UserRole } from "./types.js";

export function findUserById(id: number): User | undefined {
  return users.find((user) => user.id === id);
}

export function findUserByEmail(email: string): User | undefined {
  return users.find((user) => user.email === email);
}

export function getUsersByRole(role: UserRole): User[] {
  return users.filter((user) => user.role === role);
}

export function addUser(user: User): void {
  users.push(user);
}