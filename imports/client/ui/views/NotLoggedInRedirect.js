import React from 'react'
import { Redirect } from 'react-router-dom'
import { compose, lifecycle } from 'recompose'

import withAlert from '../../hocs/with_alert'

export default compose(
  withAlert('alert'),
  lifecycle({
    componentWillMount() {
      this.props.alert.error('登录后才能访问该页面 ')
    }
  })
)(function NotLoggedInRedirect () {
  return <Redirect to="/"/>
})