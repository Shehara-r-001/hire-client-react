import { lazy } from 'react'

const Company = lazy(() => import('./company').then((module) => ({ default: module.Company }))) // bcz Company uses named exports

export default Company
