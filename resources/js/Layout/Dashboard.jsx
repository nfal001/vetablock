//import React
import React from 'react';

//import Link, usePage
import { Head, Link, usePage } from '@inertiajs/react';
import Header from '../Components/Header';
import { HiHome, HiArchive, HiFolder, HiChevronDown, HiOutlineLogout, HiUsers } from 'react-icons/hi';

function Dashboard({ childern,title = 'Dashboard - VetaBlock' }) {
    const { auth } = usePage().props;    
  return (
   <>
    <Head>
        <title>{title}</title>
    </Head>
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
    {/* Aside Desktop */}
    <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
    <div className="py-4 text-gray-500 dark:text-gray-400">
  <a
    className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
    href="#"
  >
    VetaBlock
  </a>
  <ul className="mt-6">
    <li className="relative px-6 py-3">
      <Link
        className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
        href="/dashboard"
      >
        <HiHome className='std-icon' />
        <span className="ml-4">Dashboard</span>
      </Link>
    </li>
  </ul>
  <ul>
    <li className="relative px-6 py-3">
      <Link
        className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
        href="/cluster"
      >
        <HiArchive className='std-icon'/>
        <span className="ml-4">My Cluster</span>
      </Link>
    </li>
    <li className="relative px-6 py-3">
      {auth.user.role === 'admin'? (
              <Link
              className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              aria-haspopup="true" href='/admin'
            >
              <span className="inline-flex items-center">
                <HiUsers className='h-5 w-5' />
                <span className="ml-4">Manage</span>
              </span>
            </Link>):null
      }
    </li>
  </ul>
  <div className="px-6 my-6">
    <Link href="/logout" method='POST' as='button' className="flex flex-row-reverse items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple gap-2">
      <span><HiOutlineLogout className='std-icon'/></span> Logout  
    </Link>
  </div>
</div>
    </aside>
      {/* Main Content, inside has navbar dll */}
      <div className="flex flex-col flex-1">
            <Header/>
            <main className="h-full pb-16 overflow-y-auto">
            <div className="container xl:max-w-[1280px] px-6 mx-auto grid">
              { childern }
            </div>
            </main>
      </div>
    </div>
   </>
  )
}
export default Dashboard