import {
  AvatarIcon,
  CalendarIcon,
  ChatBubbleIcon,
  Component1Icon,
  GearIcon,
  ReaderIcon,
  TokensIcon,
} from '@radix-ui/react-icons'
import { Link, useLocation } from 'react-router-dom'

import { cn } from 'src/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { ForwardRefExoticComponent, RefAttributes } from 'react'
import { IconProps } from '@radix-ui/react-icons/dist/types'
import { UserRoles } from 'src/models/User.model'

type SubNavLink = {
  name: string
  href: string
  access: UserRoles[]
}

type NavLink = {
  name: string
  href: string
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
  sub?: SubNavLink[]
}

const LINKS: NavLink[] = [
  {
    name: 'Home',
    href: '/',
    icon: TokensIcon,
  },
  {
    name: 'Companies',
    href: '/companies',
    icon: Component1Icon,
    sub: [{ name: 'Update', href: '/update', access: [UserRoles.ADMIN, UserRoles.MANAGER] }],
  },
  {
    name: 'Calendar',
    href: '/calendar',
    icon: CalendarIcon,
  },
  {
    name: 'Trainer',
    href: '/trainer',
    icon: ReaderIcon,
  },
  {
    name: 'Chat',
    href: '/chat',
    icon: ChatBubbleIcon,
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: AvatarIcon,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: GearIcon,
  },
]

const NavLinks = () => {
  const location = useLocation()

  return (
    <div>
      {LINKS.map((link) => {
        const Icon = link.icon

        return (
          <div key={link.href} className="flex h-[40px] w-full justify-center lg:justify-start lg:px-2">
            <Link
              to={link.href}
              className={cn(
                'flex items-center space-x-2 rounded-md px-1 py-2  text-white transition-all duration-200 hover:text-green_03  lg:justify-start lg:px-3 lg:py-2.5',
                location.pathname === link.href && 'text-green_04',
              )}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Icon className="h-6 w-6 lg:h-5 lg:w-5" />
                  </TooltipTrigger>
                  <TooltipContent className="border border-green_04 bg-black shadow-greened lg:hidden">
                    <p className="bg-black text-sm text-green_03 lg:block">{link.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <p className="hidden text-[15px] font-semibold lg:block ">{link.name}</p>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default NavLinks
