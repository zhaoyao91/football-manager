import React from 'react'

import MainNavbar from './MainNavbar'

export default function MainLayout ({children}) {
  return <div>
    <div><MainNavbar/></div>
    <div>{children}</div>
  </div>
}