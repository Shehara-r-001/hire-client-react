import { ICompany } from './Company.model'
import { IUser } from './User.model'

export enum VacancyStatus {
  OPEN = 'open',
  CLOSED = 'closed',
  REMOVED = 'removed',
}

export enum JobLevel {
  INTERN = 'intern',
  ENTRY_LEVEL = 'entry',
  MID_SENIOR = 'mid_senior',
  SENIOR = 'senior',
}

export enum JobType {
  PART_TIME = 'part_time',
  FULL_TIME = 'full_time',
  CONTRACT = 'contract',
}

export interface IVacancy {
  id: string
  title: string
  subTitle?: string
  description: string
  requrements: string
  other: string
  level: JobLevel
  type: JobType
  field: string
  status: VacancyStatus
  openFrom: Date
  openTo: Date
  companyId: string
  Company: ICompany
  createdByID?: string
  CreatedBy?: IUser
}
