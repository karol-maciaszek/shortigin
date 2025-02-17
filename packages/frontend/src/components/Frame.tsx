import React from 'react'
import { Outlet, useNavigate } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/16/solid'
import { useLocation } from 'react-router-dom'
import Logo from './Logo'

export const Frame = () => {
  const { user, logout } = useAuth0()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div>
      <nav>
        <ul className="flex gap-3 p-3 items-center">
          {location.pathname !== '/' && (
            <li className="pl-2">
              <Logo size="sm" />
            </li>
          )}
          <li className="ml-auto">
            <button className="bg-transparent border-none p-0" onClick={() => navigate('/')}>
              Add
            </button>
            <span className="text-neoncyan ml-3">|</span>
          </li>
          <li>
            <button
              className="bg-transparent border-none p-0"
              onClick={() => navigate('/app/shortcuts')}
            >
              Manage
            </button>
            <span className="text-neoncyan ml-3">|</span>
          </li>
          <li>
            <button
              className="bg-transparent border-none p-0"
              onClick={() => navigate('/app/visits')}
            >
              Visits
            </button>
            <span className="text-neoncyan ml-3">|</span>
          </li>
          {user && (
            <li>
              <Menu>
                <MenuButton className="flex gap-1 items-center bg-transparent border-none p-0">
                  <div
                    className="size-10 rounded-full !bg-cover"
                    style={{ background: `url(${user.picture}) center center no-repeat` }}
                  />
                  <ChevronDownIcon className="size-4 text-neoncyan" />
                </MenuButton>

                <MenuItems
                  transition
                  anchor="bottom end"
                  title={user.name}
                  className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                  <MenuItem>
                    <button
                      className="flex w-full items-center gap-2 rounded-lg py-1.5 px-3 bg-transparent border-none data-[focus]:bg-white/10"
                      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                    >
                      <ArrowRightStartOnRectangleIcon className="size-4" />
                      Logout
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </li>
          )}
        </ul>
      </nav>
      <main className="px-6 py-4">
        <Outlet />
      </main>
    </div>
  )
}
