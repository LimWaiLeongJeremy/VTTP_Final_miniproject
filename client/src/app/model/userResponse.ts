import { Roles } from "./roles";

export interface UserResponse {
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: Roles[],

  }
  