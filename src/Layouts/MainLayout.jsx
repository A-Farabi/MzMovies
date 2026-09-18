import React from 'react'
import { Outlet } from 'react-router'

function MainLayout() {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  )
}

export default MainLayout
