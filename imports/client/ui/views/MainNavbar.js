import React from 'react'
import { compose, withState, withHandlers }from 'recompose'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'

import NavbarUserItem from './NavbarUserItem'
import withStyles from '../../hocs/with_styles'

export default compose(
  withState('isOpen', 'setIsOpen', false),
  withHandlers({
    toggle: ({setIsOpen}) => () => setIsOpen(x => !x)
  }),
  withStyles('styles', {
    smNavbarUserItemNav: {
      position: 'absolute',
      left: '1rem',
      right: '1rem',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    }
  })
)(function MainNavbar ({styles, isOpen, toggle}) {
  return <Navbar toggleable inverse color="inverse">
    <NavbarBrand tag={Link} to="/">足球管家</NavbarBrand>
    <Nav navbar className="hidden-sm-up" {...styles.smNavbarUserItemNav}>
      <NavbarUserItem/>
    </Nav>
    <NavbarToggler right onClick={toggle}/>
    <Collapse isOpen={isOpen} navbar>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink>人员</NavLink>
        </NavItem>
        <NavItem>
          <NavLink>球队</NavLink>
        </NavItem>
        <NavItem>
          <NavLink>球场</NavLink>
        </NavItem>
        <NavItem>
          <NavLink>球赛</NavLink>
        </NavItem>
        <NavItem>
          <NavLink>活动</NavLink>
        </NavItem>
        <NavbarUserItem className="hidden-xs-down"/>
      </Nav>
    </Collapse>
  </Navbar>
})
