import React from 'react'

import SideBar from '../sidebar'
import { Header } from '../header'

export const getNoneLayout = (page: React.ReactElement) => page

export const getDefaultLayout = (page: React.ReactElement) => {
  return (
    <div className="h-min-screen">
      <Header />
      <SideBar />
      <div className="fixed left-[80px] top-0 flex h-full w-full overflow-auto lg:left-[280px] lg:top-[140px]">
        {page}
      </div>
    </div>
  )
}
