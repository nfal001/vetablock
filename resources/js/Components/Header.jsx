import React from 'react'

import ThemeSwitch from './ThemeSwitch';
import { HiChatAlt, HiMenu, HiUserCircle } from 'react-icons/hi';

const Header = () => {
  return (
    <>
        <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
          <div
            className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300"
          >
            {/* <!-- Mobile hamburger --> */}
            <button
              className="p-1 -ml-1 mr-5 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
              aria-label="Menu"
            >
              <HiMenu className="w-6 h-6"/>
            </button>
            {/* <!-- Search input --> */}
            <div className="flex justify-center flex-1 lg:mr-32">
              <div
                className="relative w-full max-w-xl mr-6 focus-within:text-purple-500"
              >
                <p className='text-center font-bold dark:text-white'></p>
              </div>
            </div>
            <ul className="flex items-center flex-shrink-0 space-x-6">
              {/* <!-- Theme toggler --> */}
              <li className="flex">
                <ThemeSwitch/>
              </li>
              {/* <!-- Notifications menu --> */}
              <li className="relative">
                <button
                  className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
                  aria-label="Notifications"
                  aria-haspopup="true"
                >
                  <HiChatAlt className="w-6 h-6"/>
                  {/* <!-- Notification badge --> */}
                  <span
                    aria-hidden="true"
                    className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
                  ></span>
                </button>
              </li>
              {/* <!-- Profile menu --> */}
              <li className="relative">
                <button
                  className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
                  aria-label="Account"
                  aria-haspopup="true"
                >
                  <HiUserCircle className='w-8 h-8 text-slate-600 dark:text-purple-400'/>
                </button>
              </li>
            </ul>
          </div>
        </header>
    </>
  )
}

export default Header