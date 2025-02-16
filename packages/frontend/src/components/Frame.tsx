import React from 'react'
import {Outlet} from "react-router";
import {useAuth0} from "@auth0/auth0-react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  ChevronDownIcon,
  ArrowRightStartOnRectangleIcon,
  LinkIcon,
} from '@heroicons/react/16/solid'

export const Frame: React.FC = ({
}) => {
  const { user, logout } = useAuth0()

  return (
    <div>
      <nav>
        <ul className="flex p-3">
          {user && <li className="ml-auto">
              <Menu>
                  <MenuButton className="flex gap-1 items-center bg-transparent border-none p-0">
                      <div
                        className="size-10 rounded-full !bg-cover"
                        style={{background: `url(${user.picture}) center center no-repeat`}} />
                      <ChevronDownIcon className="size-4" />
                  </MenuButton>

                  <MenuItems
                      transition
                      anchor="bottom end"
                      title={user.name}
                      className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                  >
                      <MenuItem>
                          <button className="flex w-full items-center gap-2 rounded-lg py-1.5 px-3 bg-transparent border-none data-[focus]:bg-white/10">
                              <LinkIcon className="size-4" />
                              Your shortcuts
                          </button>
                      </MenuItem>
                      <div className="my-1 h-px bg-white/5" />
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
          </li>}
        </ul>
      </nav>
      <main className="py-16">
        <Outlet />
      </main>
    </div>
  )
}
