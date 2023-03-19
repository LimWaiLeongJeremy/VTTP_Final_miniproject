import { UserResponse } from './userResponse';

export interface AuthResponse {
  user: UserResponse;
  jwtToken: string;
}
