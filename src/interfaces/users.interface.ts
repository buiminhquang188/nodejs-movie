export interface User {
  id: number;
  name?: string;
  email: string;
  password: string;
  roleID?: string;
  createdBy?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
