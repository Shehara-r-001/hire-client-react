import { PlusIcon, Settings2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { managerHasCompany } from 'src/lib/authorize'
import { PATH_COMPANY } from 'src/lib/paths'

import { IUser, UserRoles } from 'src/models/User.model'

type HeaderAction = {
  action: string
  Icon: typeof PlusIcon | null
  roles: UserRoles[]
  href: string | null
  access?: boolean
  //  todo:  filters and sorts
}

const defaultAction: HeaderAction = {
  action: '',
  Icon: null,
  roles: [],
  href: null,
}

const useHeaderActions = (route: string, user: IUser | null): HeaderAction[] => {
  const [headerActions, setHeaderActions] = useState<HeaderAction[]>([defaultAction])

  useEffect(() => {
    switch (route) {
      case '/companies':
        setHeaderActions([
          {
            action: 'Create Company',
            Icon: PlusIcon,
            roles: [UserRoles.ADMIN, UserRoles.MANAGER],
            href: PATH_COMPANY.create,
            access: true,
          },
          {
            action: 'Update Company',
            Icon: Settings2,
            roles: [UserRoles.ADMIN, UserRoles.MANAGER],
            href: PATH_COMPANY.update,
            access: managerHasCompany(user), // todo: maybe create an endpoint to find this?
          },
        ])
        break
      case '/calendar':
        setHeaderActions([{ action: 'Add Event', Icon: PlusIcon, roles: [], href: null }])
        break
      default:
        setHeaderActions([defaultAction])
    }
  }, [route])

  return headerActions
}

export default useHeaderActions
