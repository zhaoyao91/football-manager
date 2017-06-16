import React from 'react'
import { compose, withState, withHandlers }from 'recompose'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'

export default compose(
  withState('isOpen', 'setIsOpen', false),
  withHandlers({
    toggle: ({setIsOpen}) => () => setIsOpen(x => !x)
  })
)(function MainNavbar ({isOpen, toggle}) {
  return <Navbar toggleable inverse color="inverse">
    <NavbarToggler right onClick={toggle}/>
    <NavbarBrand tag={Link} to="/">足球管家</NavbarBrand>
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
      </Nav>
    </Collapse>
  </Navbar>
})