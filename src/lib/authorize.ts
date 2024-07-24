import { IUser, UserRoles } from './../models/User.model'

/**
 * check if user has a role allowed in a given roles array
 * @param user user to be checked
 * @param roles allowed roles
 * @returns
 */
export const isAllowed = (user: IUser | null | undefined, roles: UserRoles[]) => {
  if (!user) return false
  else return roles.includes(user.role)
}

export const isManager = (user: IUser | null | undefined) => {
  if (!user) return false
  else return user.role === UserRoles.MANAGER
}

export const isAdmin = (user: IUser | null | undefined) => {
  if (!user) return false
  else return user.role === UserRoles.ADMIN
}

export const managerHasCompany = (user: IUser | null) => {
  if (!user || !isManager(user)) return false
  return user.Company?.Manager?.id === user.id
}
