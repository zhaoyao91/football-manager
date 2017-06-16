import React from 'react'
import { NavItem, NavLink } from 'reactstrap'

export default function NavbarUserItem ({...otherProps}) {
  return <NavItem {...otherProps}>
    <NavLink>登录</NavLink>
  </NavItem>
}