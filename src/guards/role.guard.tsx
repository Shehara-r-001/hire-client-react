import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { UserRoles } from 'src/models/User.model'
import { PATH_AUTH, PATH_ERROR } from 'src/lib/paths'
import useAuth from 'src/hooks/auth/useAuth'

interface RoleGuardProps {
  allowedRoles: UserRoles[]
  children: ReactNode
}

const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
  // const user = useAppSelector((state: RootState) => state.userReducer.user)
  // const isAuthenticated = useAppSelector((state: RootState) => state.userReducer.isAuthenticated)

  const { user, isLoading } = useAuth()

  if (isLoading) return <div>Loading...</div>

  if (!user) return <Navigate to={PATH_AUTH.signin} replace />

  // if (!user || !isAuthenticated) {
  //   return <Navigate to={PATH_AUTH.signin} replace />
  // }

  if (!allowedRoles.includes(user?.role as UserRoles)) {
    return <Navigate to={PATH_ERROR.unauthorized} replace />
  }

  // return <Outlet />
  return children
}

export default RoleGuard
