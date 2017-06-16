import React from 'react'
import { NavItem, NavLink } from 'reactstrap'
import { compose, withState, withHandlers }from 'recompose'

import AccountModal from './AccountModal'

export default function NavbarUserItem ({...otherProps}) {
  return <NavItem {...otherProps}>
    <LoginItem/>
  </NavItem>
}

const LoginItem = compose(
  withState('isModalOpen', 'setModalOpen', false),
  withHandlers({
    toggleModal: ({setModalOpen}) => () => setModalOpen(x => !x)
  }),
)(function LoginItem ({isModalOpen, toggleModal}) {
  return <NavLink onClick={toggleModal}>
    登录
    <AccountModal isOpen={isModalOpen} toggle={toggleModal}/>
  </NavLink>
})