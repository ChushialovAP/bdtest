import { User } from '../node_modules/@prisma/client';

export interface RegistrationStatus {
  success: boolean;
  message: string;
  data?: User;
}
export interface RegistrationSeederStatus {
  success: boolean;
  message: string;
  data?: User[];
}

export interface JwtPayload {
  id: number;
  email: string;
}
