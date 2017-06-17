import React from 'react'
import { compose, withState, withHandlers }from 'recompose'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'

import NavbarUserItem from './MainNavbarUserItem'
import withStyles from '../../hocs/with_styles'

export default compose(
  withState('isOpen', 'setIsOpen', false),
  withHandlers({
    toggle: ({setIsOpen}) => () => setIsOpen(x => !x)
  }),
  withStyles('styles', {
    xsNavbarBrand: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      margin: 0
    }
  })
)(function MainNavbar ({styles, isOpen, toggle}) {
  return <Navbar toggleable inverse color="inverse">
    <NavbarBrand tag={Link} to="/" className="hidden-xs-down">足球管家</NavbarBrand>

    <div className="hidden-sm-up d-flex justify-content-between">
      <Nav navbar>
        <NavbarUserItem position="left"/>
      </Nav>
      <NavbarBrand tag={Link} to="/" {...styles.xsNavbarBrand}>足球管家</NavbarBrand>
      <NavbarToggler onClick={toggle}/>
    </div>

    <Collapse isOpen={isOpen} navbar>
      <Nav className="ml-auto text-center" navbar>
        <NavItem>
          <NavLink>活动</NavLink>
        </NavItem>
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
        <NavbarUserItem className="hidden-xs-down" position="right"/>
      </Nav>
    </Collapse>
  </Navbar>
})
