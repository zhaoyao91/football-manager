import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { compose, withState, withHandlers, setPropTypes } from 'recompose'
import { withMethod, defineMethod } from 'react-method'
import { prop, trim } from 'lodash/fp'
import isEmail from 'validator/lib/isEmail'
import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'
import PropTypes from 'prop-types'

import withAlert from '../../hocs/with_alert'

export default function AccountModal ({isOpen, toggle}) {
  return <Modal isOpen={isOpen} toggle={toggle}>
    <AccountModalView toggle={toggle}/>
  </Modal>
}

const AccountModalView = compose(
  withState('view', 'setView', 'login'),
  withHandlers({
    goSignup: ({setView}) => () => setView('signup'),
    goLogin: ({setView}) => () => setView('login'),
    goForgotPassword: ({setView}) => () => setView('forgotPassword'),
  }),
)(function AccountModalView ({view, toggle, goSignup, goLogin, goForgotPassword}) {
    if (view === 'login') {
      return <LoginModalView toggle={toggle} goSignup={goSignup} goForgotPassword={goForgotPassword}/>
    }
    else if (view === 'signup') {
      return <SignupModalView toggle={toggle} goLogin={goLogin} goForgotPassword={goForgotPassword}/>
    }
    else if (view === 'forgotPassword') {
      return <ForgotPasswordModalView toggle={toggle} goLogin={goLogin} goSignup={goSignup}/>
    }
  }
)

const LoginModalView = compose(
  setPropTypes({
    toggle: PropTypes.func,
    goLogin: PropTypes.func,
    goSignup: PropTypes.func,
  }),
  withState('email', 'setEmail', ''),
  withState('password', 'setPassword', ''),
  withAlert('alert'),
  withHandlers({
    submit: ({alert, email, password, toggle}) => () => {
      email = trim(email)
      password = trim(password)

      if (!isEmail(email)) return alert.error('请输入正确的邮箱')
      if (!password) return alert.error('密码不能为空')

      Meteor.loginWithPassword(email, password, (err) => {
        if (err) {
          console.error(err)
          if (err.reason === 'Incorrect password') alert.error('密码错误')
          else if (err.reason === 'User not found') alert.error('该用户尚未注册 ')
          else alert.error('登录失败')
        }
        else {
          alert.success('登录成功')
          toggle()
        }
      })
    }
  }),
  withHandlers({
    onEmailChange: ({setEmail}) => e => setEmail(e.target.value),
    onPasswordChange: ({setPassword}) => e => setPassword(e.target.value),
    onSubmit: ({submit}) => e => {
      e.preventDefault()
      submit()
    }
  }),
)(function LoginModalView ({toggle, submit, onSubmit, email, onEmailChange, password, onPasswordChange, goSignup, goForgotPassword}) {
  return <div>
    <ModalHeader toggle={toggle}>登录</ModalHeader>
    <ModalBody>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label>邮箱</Label>
          <Input value={email} onChange={onEmailChange}/>
        </FormGroup>
        <FormGroup>
          <Label>密码</Label>
          <Input type="password" value={password} onChange={onPasswordChange}/>
        </FormGroup>
        <Button className="hidden-xs-up">登录</Button>
      </Form>
    </ModalBody>
    <ModalFooter>
      <div className="d-flex justify-content-between w-100">
        <div>
          <Button className="mr-2" onClick={goSignup}>去注册</Button>
          <Button onClick={goForgotPassword}>重置密码</Button>
        </div>
        <Button color="primary" onClick={submit}>登录</Button>
      </div>
    </ModalFooter>
  </div>
})

const SignupModalView = compose(
  setPropTypes({
    toggle: PropTypes.func,
    goLogin: PropTypes.func,
    goForgotPassword: PropTypes.func,
  }),
  withState('email', 'setEmail', ''),
  withState('password', 'setPassword', ''),
  withAlert('alert'),
  withHandlers({
    submit: ({toggle, alert, email, password}) => () => {
      email = trim(email)
      password = trim(password)

      if (!isEmail(email)) return alert.error('请输入正确的邮箱')
      if (!password) return alert.error('密码不能为空')

      Accounts.createUser({email, password}, (err) => {
        if (err) {
          console.error(err)
          if (err.reason === 'Email already exists.') alert.error('该用户已经注册')
          else alert.error('注册失败')
        }
        else {
          alert.success('注册成功')
          toggle()
        }
      })
    }
  }),
  withHandlers({
    onEmailChange: ({setEmail}) => e => setEmail(e.target.value),
    onPasswordChange: ({setPassword}) => e => setPassword(e.target.value),
    onSubmit: ({submit}) => e => {
      e.preventDefault()
      submit()
    }
  }),
)(function SignupModalView ({toggle, submit, onSubmit, email, onEmailChange, password, onPasswordChange, goLogin, goForgotPassword}) {
  return <div>
    <ModalHeader toggle={toggle}>注册</ModalHeader>
    <ModalBody>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label>邮箱</Label>
          <Input value={email} onChange={onEmailChange}/>
        </FormGroup>
        <FormGroup>
          <Label>密码</Label>
          <Input type="password" value={password} onChange={onPasswordChange}/>
        </FormGroup>
        <Button className="hidden-xs-up">注册</Button>
      </Form>
    </ModalBody>
    <ModalFooter>
      <div className="d-flex justify-content-between w-100">
        <div>
          <Button className="mr-2" onClick={goLogin}>去登录</Button>
          <Button onClick={goForgotPassword}>重置密码</Button>
        </div>
        <Button color="primary" onClick={submit}>注册</Button>
      </div>
    </ModalFooter>
  </div>
})

const ForgotPasswordModalView = compose(
  setPropTypes({
    toggle: PropTypes.func,
    goLogin: PropTypes.func,
    goSignup: PropTypes.func,
  }),
  withState('email', 'setEmail', ''),
  withAlert('alert'),
  withHandlers({
    submit: ({toggle, alert, email}) => () => {
      email = trim(email)

      if (!isEmail(email)) return alert.error('请输入正确的邮箱')

      Accounts.forgotPassword({email}, (err) => {
        if (err) {
          console.error(err)
          if (err.reason === 'User not found') alert.error('该用户尚未注册')
          else alert.error('操作失败')
        }
        else {
          alert.success('重置密码链接已发送至您的邮箱，请注意查收')
          toggle()
        }
      })
    }
  }),
  withHandlers({
    onEmailChange: ({setEmail}) => e => setEmail(e.target.value),
    onSubmit: ({submit}) => e => {
      e.preventDefault()
      submit()
    }
  }),
)(function ForgotPasswordModalView ({toggle, submit, onSubmit, email, onEmailChange, goLogin, goSignup}) {
  return <div>
    <ModalHeader toggle={toggle}>重置密码</ModalHeader>
    <ModalBody>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label>邮箱</Label>
          <Input value={email} onChange={onEmailChange}/>
        </FormGroup>
        <Button className="hidden-xs-up">重置密码</Button>
      </Form>
    </ModalBody>
    <ModalFooter>
      <div className="d-flex justify-content-between w-100">
        <div>
          <Button className="mr-2" onClick={goLogin}>去登录</Button>
          <Button onClick={goSignup}>去注册</Button>
        </div>
        <Button color="primary" onClick={submit}>重置密码</Button>
      </div>
    </ModalFooter>
  </div>
})
