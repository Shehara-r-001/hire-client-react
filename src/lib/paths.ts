const path = (root: string, sublink: string): string => `${root}${sublink}`

const ROOT_DASHBOARD = '/'

export const PATH_AUTH = {
  signin: '/signin',
  register: '/signup',
}

export const PATH_ROOT = {
  home: ROOT_DASHBOARD,
  companies: '/companies',
  calendar: '/calendar',
  trainer: '/trainer',
  chat: '/chat',
  profile: '/profile',
  settings: '/settings',
}

export const PATH_DASHBOARD = {
  dashboard: ROOT_DASHBOARD,
}

export const PATH_COMPANY = {
  create: `${PATH_ROOT.companies}/create`,
  update: `${PATH_ROOT.companies}/update`,
}

export const PATH_ERROR = {
  notFound: 'not-found',
  unauthorized: 'unauthorized',
}
