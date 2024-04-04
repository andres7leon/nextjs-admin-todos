import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CiBookmarkCheck, CiLogout } from 'react-icons/ci'
import { SidebarItem } from './SidebarItem'
import { IoCalendar, IoCalendarOutline, IoCheckboxOutline, IoFootball, IoListOutline, IoPersonAddOutline, IoStopCircleSharp } from 'react-icons/io5'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { LogoutButton } from './LogoutButton'

const menuItem = [
  {
    icon: <IoCalendarOutline />,
    path: '/dashboard',
    title: 'Dashboard'
  },
  {
    icon: <IoCheckboxOutline />,
    path: '/dashboard/rest-todos',
    title: 'Rest TDOS'
  },
  {
    icon: <IoListOutline />,
    path: '/dashboard/server-todos',
    title: 'server actions'
  },
  {
    icon: <IoStopCircleSharp />,
    path: '/dashboard/cookies',
    title: 'Data of cookies'
  },
  {
    icon: <IoFootball />,
    path: '/dashboard/products',
    title: 'Products'
  },
  {
    icon: <IoPersonAddOutline />,
    path: '/dashboard/profile',
    title: 'Profile'
  },
]


export const Sidebar = async () => {

  const session: any = await getServerSession(authOptions);

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
    <div>
      <div className="-mx-6 px-6 py-4">
        {/* TODO: Next/Link hacia dashboard */}
        <Link href="#" title="home">
          {/* Next/Image */}
          <Image src={"https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"} width={30} height={30} className="w-32" alt="tailus logo"/>
        </Link>
      </div>

      <div className="mt-8 text-center">
        {/* Next/Image */}
        <Image src={session?.user?.image || "https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"} width={130} height={130} alt="" className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"/>
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{session?.user?.name || 'No Name'}</h5>
          <span className="hidden text-gray-400 lg:block">{session?.user?.roles ?? ['client']}</span>
      </div>

      <ul className="space-y-2 tracking-wide mt-8">
        
        {
          menuItem.map( item => (
            <SidebarItem key={item.path} {...item}/>
          ))
        }
        
      </ul>
    </div>

    <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton />
    </div>
  </aside>
  )
}
