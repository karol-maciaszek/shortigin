import React, { useContext } from 'react'
import {Outlet} from "react-router";

export const Frame: React.FC = ({
}) => {
  return (
    <div
      className={`min-h-screen w-screen pt-16 flex flex-col`}
    >
      <Outlet />
    </div>
  )
}
