import React from 'react'
import { Order_By, useGetShortcutsSubscription } from '../generated/urql.user'
import { Outlet, useNavigate } from 'react-router'
import { getResultUrl } from '../lib/url'

export const ShortcutsPage = () => {
  const [{ data: getShortcutsData }] = useGetShortcutsSubscription({
    variables: { orderBy: { id: Order_By.Desc } },
  })
  const navigate = useNavigate()

  return (
    <div className="h-[calc(100vh-6rem)] flex justify-center">
      <div className="w-full grid grid-cols-4 gap-6">
        <ul className="overflow-y-auto">
          {getShortcutsData?.shortcuts.map((shortcut) => (
            <li key={shortcut.id} className="border-b border-b-neoncyan">
              <button
                onClick={() => navigate(`/app/shortcuts/${shortcut.id}`)}
                className="w-full bg-transparent border-none p-3 text-left hover:bg-deepblue/40 transition-colors"
              >
                <div>
                  <p className="text-xs text-coolgray">{getResultUrl(shortcut.slug || '')}</p>
                  <p className="break-all">{shortcut.url}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
        <div className="col-span-3 border-l border-l-neoncyan pl-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
