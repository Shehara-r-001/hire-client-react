import React, { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

import usePathAsTitle from 'src/hooks/usePathTitle'
import { SubHeader } from './sub-header'
import Avatar from './avatar'
import HeaderActions from './header-actions'
import { useAppSelector } from 'src/redux/hooks'

interface IProps {
  leftNode?: ReactNode
}
export function Header(props: IProps) {
  const location = useLocation()
  const title = usePathAsTitle(location.pathname)
  const user = useAppSelector((state) => state.userReducer.user)

  return (
    <div className="fixed left-[280px] top-0 hidden h-[140px] w-full items-center justify-between border bg-white bg-opacity-70 px-4 py-2 shadow-md lg:inline lg:px-12">
      {/* <div className="flex items-center gap-4"><LanguageSelector /></div> */}
      <div className="flex h-full w-[calc(100vw-330px)]">
        <div className="w-full">
          <div className="mb-7">
            <h1 className="text-2xl font-bold text-black">{title !== '' ? title : 'Home'}</h1>
            <p className="text-sm">Breadcrumbs</p>
          </div>
          <SubHeader />
        </div>
        <div className="flex w-[25vw] flex-col items-end space-y-8 px-4">
          {user && <Avatar user={user} />}
          <HeaderActions user={user} sort={true} filter={true} />
        </div>
      </div>
    </div>
  )
}
