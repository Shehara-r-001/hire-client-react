import { IUser } from './User.model'
import { IVacancy } from './Vacancies.model'

export enum CompanyStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  SUSPENDED = 'suspended',
  DELETED = 'deleted',
}

export interface IImage {
  previewUrl?: string
  originalUrl: string
  name: string
}

export interface ICompany {
  id: string
  name: string
  email: string
  phone: string
  field: string
  managerId?: string
  status: CompanyStatus
  Manager?: IUser
  Employees?: IUser[]
  description01: string
  description02?: string
  coverImage?: IImage
  image?: IImage
  createdAt: Date
  updatedAt?: Date
  Vacancies: IVacancy[]
}
