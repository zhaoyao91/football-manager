import React from 'react'
import { NavItem, NavLink, DropdownItem, UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap'
import { setPropTypes, withProps, compose, withState, withHandlers }from 'recompose'
import { withRouter, Link } from'react-router-dom'
import PropTypes from 'prop-types'
import { prop } from 'lodash/fp'
import classnames from 'classnames'
import { Meteor } from 'meteor/meteor'

import withCurrentUser from '../../hocs/with_current_user'
import AccountModal from './AccountModal'
import withStyles from '../../hocs/with_styles'
import withUserProfile from '../../hocs/with_user_profile'
import UserAvatar from '../views/UserAvatar'

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
  withUserProfile('profile', ({user}) => user._id),
  withRouter,
  withHandlers({
    logout: () => () => Meteor.logout(),
  }),
  withStyles('styles', {
    dropdownMenu: {
      minWidth: 0,
      marginTop: '1rem',
      position: 'absolute !important',
    }
  }),
)
(function LoggedInUserItem ({styles, logout, user, profile, position}) {
  return <UncontrolledDropdown className={classnames('p-0', {'ml-2': position === 'right'})}>
    <DropdownToggle tag="div">
      <UserAvatar size={40} avatar={profile.avatar} name={profile.name} email={prop('emails.0.address', user)}/>
    </DropdownToggle>
    <DropdownMenu right={position === 'right'} {...styles.dropdownMenu}>
      <DropdownItem tag={Link} to="/me">个人中心</DropdownItem>
      <DropdownItem divider/>
      <DropdownItem onClick={logout} className="text-danger">退出登录</DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
})
