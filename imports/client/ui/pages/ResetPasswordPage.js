import React from 'react'
import { compose, withProps, withHandlers, withState } from 'recompose'
import { withRouter } from 'react-router-dom'
import { Container, Form, FormGroup, Input, Label, Button } from 'reactstrap'
import { Accounts } from 'meteor/accounts-base'

import MainPageLayout from '../views/MainLayout'
import withRouteParams from '../../hocs/with_route_params'
import withAlert from '../../hocs/with_alert'

export default compose(
  withRouter,
  withRouteParams('params'),
  withProps(({params}) => ({token: params.token}))
)(function ResetPasswordPage ({token}) {
  return <MainPageLayout>
    <Container className="pt-3">
      <h1>重置密码</h1>
      <ResetPasswordForm token={token}/>
    </Container>
  </MainPageLayout>
})

const ResetPasswordForm = compose(
  withRouter,
  withState('password', 'setPassword', ''),
  withAlert('alert'),
  withHandlers({
    onPasswordChange: ({setPassword}) => e => setPassword(e.target.value),
    onSubmit: ({alert, token, password, history}) => e => {
      e.preventDefault()

      if (!password) return alert.error('密码不能为空')

      Accounts.resetPassword(token, password, (err) => {
        if (err) {
          console.error(err)
          if (err.reason === 'Token expired') alert.error('链接已失效')
          else alert.error('重置密码失败')
        }
        else {
          alert.success('重置密码成功')
          history.push('/')
        }
      })
    }
  }),
)(function ResetPasswordForm ({password, onPasswordChange, onSubmit}) {
  return <Form onSubmit={onSubmit}>
    <FormGroup>
      <Label>新密码</Label>
      <Input type="password" value={password} onChange={onPasswordChange}/>
    </FormGroup>
    <div className="d-flex justify-content-end">
      <Button color="primary">重置密码</Button>
    </div>
  </Form>
})
