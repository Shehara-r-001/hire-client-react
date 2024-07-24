import React from 'react'
import { createBrowserRouter, createHashRouter, RouteObject } from 'react-router-dom'

import ErrorPage from './components/error-page'
import { getDefaultLayout, getNoneLayout } from './components/layouts'
import HomePage from './pages/Home'
import SignIn from './pages/auth/SignIn'
import { PATH_AUTH, PATH_COMPANY, PATH_ERROR, PATH_ROOT } from './lib/paths'
import Companies from './pages/Companies/Companies'
import Company from './pages/Companies/CompanyPage'
import CreateCompany from './pages/Companies/CreateCompany'
import RoleGuard from './guards/role.guard'
import { UserRoles } from './models/User.model'

export const routerObjects: RouteObject[] = [
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: PATH_AUTH.signin,
    Component: SignIn,
  },
  {
    path: PATH_ROOT.companies,
    Component: Companies,
  },
  {
    path: `${PATH_ROOT.companies}/:id`,
    Component: Company,
  },
  {
    path: `${PATH_COMPANY.create}`,
    // Component: CreateCompany,
    Component: () => (
      <RoleGuard allowedRoles={[UserRoles.ADMIN, UserRoles.MANAGER]}>
        <CreateCompany />
      </RoleGuard>
    ),
  },
  {
    path: PATH_ERROR.notFound,
    Component: ErrorPage,
  },
  {
    path: PATH_ERROR.unauthorized,
    Component: ErrorPage,
  },
]

export function createRouter(): ReturnType<typeof createHashRouter> {
  const routeWrappers = routerObjects.map((router) => {
    // @ts-ignore TODO: better type support
    const getLayout = router.Component === SignIn ? getNoneLayout : router.Component?.getLayout || getDefaultLayout
    const Component = router.Component!
    const page = getLayout(<Component />)
    return {
      ...router,
      element: page,
      Component: null,
      ErrorBoundary: ErrorPage,
    }
  })
  return createBrowserRouter(routeWrappers)
  // return createHashRouter(routeWrappers)
}
