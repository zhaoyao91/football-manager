import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { Link, withRouter } from 'react-router-dom'
import { compose, withProps } from 'recompose'

const navs = [
  {name: '基本信息', path: '/me/profile'},
  {name: '球员身份', path: '/me/as-player'},
  {name: '教练身份', path: '/me/as-coach'},
]

export default compose(
  withRouter,
  withProps(({match}) => ({activePath: match.path}))
)(function UserCenterNavs ({activePath}) {
  return <Nav tabs className="mt-3 mb-3">
    {
      navs.map(nav => (
        <NavItem key={nav.name}>
          <NavLink tag={Link} to={nav.path} active={activePath === nav.path}>{nav.name}</NavLink>
        </NavItem>
      ))
    }
  </Nav>
})