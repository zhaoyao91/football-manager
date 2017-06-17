import React from 'react'
import { NavItem, NavLink, DropdownItem, UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap'
import { setPropTypes, withProps, compose, withState, withHandlers }from 'recompose'
import { withRouter, Link } from'react-router-dom'
import PropTypes from 'prop-types'
import { propOr } from 'lodash/fp'
import Avatar from 'react-avatar'
import classnames from 'classnames'

import withCurrentUser from '../../hocs/with_current_user'
import AccountModal from './AccountModal'
import withStyles from '../../hocs/with_styles'

export default compose(
  withCurrentUser('currentUser')
)(function MainNavbarUserItem ({position, currentUser, ...otherProps}) {
  return <NavItem {...otherProps}>
    {
      (currentUser.loggingIn || !currentUser.user) && <LoginItem/>
    }
    {
      (!currentUser.loggingIn && currentUser.user) && <LoggedInUserItem position={position} user={currentUser.user}/>
    }
  </NavItem>
})

const LoginItem = compose(
  withState('isModalOpen', 'setModalOpen', false),
  withHandlers({
    toggleModal: ({setModalOpen}) => () => setModalOpen(x => !x)
  }),
)(function LoginItem ({isModalOpen, toggleModal}) {
  return <NavLink onClick={toggleModal} className="p-2">
    登录
    <AccountModal isOpen={isModalOpen} toggle={toggleModal}/>
  </NavLink>
})

const LoggedInUserItem = compose(
  setPropTypes({
    position: PropTypes.oneOf(['right', 'left']),
    user: PropTypes.object
  }),
  withRouter,
  withHandlers({
    logout: () => () => Meteor.logout(),
  }),
  withProps(({user}) => ({
    avatarValue: getEmailName(propOr('', 'emails.0.address', user)).slice(0, 2)
  })),
  withStyles('styles', {
    dropdownMenu: {
      minWidth: 0,
      marginTop: '1rem',
      position: 'absolute !important',
    }
  }),
)(function LoggedInUserItem ({styles, logout, avatarValue, position}) {
  return <UncontrolledDropdown className={classnames('p-0', {'ml-2': position === 'right'})}>
    <DropdownToggle tag="div">
      <Avatar name={name} round size={40} value={avatarValue} textSizeRatio={2.5}/>
    </DropdownToggle>
    <DropdownMenu right={position === 'right'} {...styles.dropdownMenu}>
      <DropdownItem tag={Link} to="/me">个人中心</DropdownItem>
      <DropdownItem divider/>
      <DropdownItem onClick={logout} className="text-danger">退出登录</DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
})

function getEmailName (email) {
  return email.substr(0, email.indexOf('@'))
}