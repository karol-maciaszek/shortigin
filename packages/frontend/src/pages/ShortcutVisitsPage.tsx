import React from "react";
import {
  useGetShortcutVisitsSubscription,
} from "../generated/urql.user";
import {getResultUrl} from "../lib/url";
import {useNavigate, useParams} from "react-router";
import {ThreeDots} from "react-loader-spinner";

export const ShortcutVisitsPage = () => {
  const params = useParams<{ id?: string }>()
  const parsedId = params.id && parseInt(params.id)
  const [{ data: getShortcutVisitsData, fetching: getShortcutVisitsFetching }] = useGetShortcutVisitsSubscription({
    variables: parsedId
      ? { where: { id: { _eq: parsedId } } }
      : {}
  })
  const navigate = useNavigate()

  if (getShortcutVisitsFetching) {
    return <div className="w-screen h-[calc(100vh-6rem)] flex items-center justify-center">
      <ThreeDots height={8} color="#00E0FF"/>
    </div>
  }

  return <div>
    {parsedId && <p className="mt-3 mb-6 flex items-center gap-1">
        <button className="no-underline" onClick={() => navigate(`/app/shortcuts/${parsedId}`)}>&lt; Back</button>
    </p>}

    <div className="h-[calc(100vh-6rem)] w-full flex justify-center overflow-y-auto">
    <table className="table-auto h-fit w-full">
      <thead>
      <tr>
        <th className="p-3 pl-6 text-left border-b border-b-neoncyan text-coolgray">Date</th>
        <th className="p-3 pl-6 text-left border-b border-b-neoncyan text-coolgray">IP</th>
        <th className="p-3 pl-6 text-left border-b border-b-neoncyan text-coolgray">URL</th>
        </tr>
      </thead>
      <tbody>
      {getShortcutVisitsData?.shortcut_visits.map((shortcutVisit) => (
        <tr>
          <td className="p-3 pl-6 border-b border-b-neoncyan">{new Date(shortcutVisit.createdAt).toLocaleString()}</td>
          <td className="p-3 pl-6 border-b border-b-neoncyan">{shortcutVisit.ip}</td>
          <td className="p-3 pl-6 border-b border-b-neoncyan">
            <p className="text-xs text-coolgray">{getResultUrl(shortcutVisit.shortcut.slug)}</p>
            <p className="break-all">{shortcutVisit.shortcut.url}</p>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  </div>
  </div>
}
