import { ICompany } from './Company.model'

export interface IUser {
  id: string
  firstname: string
  lastname: string
  email: string
  password: string
  status: UserStatus
  role: UserRoles
  createdAt: Date
  updatedAt?: Date | null
  timezone: string
  profession: string
  Company?: ICompany
}

export enum UserRoles {
  ADMIN = 'admin',
  MANAGER = 'manager',
  HR = 'HR',
  GUEST = 'guest',
  USER = 'user',
}

export enum UserStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
}
