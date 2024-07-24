import { IUser, UserRoles } from 'src/models/User.model'
import { Button } from './ui/button'
import { PlusIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import useHeaderActions from 'src/hooks/useHeaderActions'
import { isAllowed } from 'src/lib/authorize'

type HeaderActionsProps = {
  user: IUser | null
  sort: boolean
  filter: boolean
}

const HeaderActions = ({ user, sort, filter }: HeaderActionsProps) => {
  const { pathname } = useLocation()
  const headerActions = useHeaderActions(pathname, user)

  return (
    <div className="flex space-x-2">
      {headerActions.map((headerAction, i) => {
        return (
          <div key={i} className="flex">
            {headerAction.action && headerAction.access && isAllowed(user, [UserRoles.ADMIN, UserRoles.MANAGER]) && (
              <Button className="text-md flex w-[200px] space-x-3 bg-green_01 font-semibold">
                <Link to={headerAction.href as string} className="flex w-[200px]">
                  <span>
                    <PlusIcon color="#fff" size={20} />
                  </span>
                  <p>{headerAction.action}</p>
                </Link>
              </Button>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default HeaderActions
