import React from 'react'
import { compose } from 'recompose'
import { Col, Container, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import { prop } from 'lodash/fp'

import withStyles from '../../hocs/with_styles'
import MainLayout from '../views/MainLayout'
import UserCenterNavs from '../views/UserCenterNavs'
import withCurrentUser from '../../hocs/with_current_user'
import checkAuthForPage from '../../hocs/check_auth_for_page'
import UserAvatar from '../views/UserAvatar'
import withUserProfile from '../../hocs/with_user_profile'
import { paddingContainer, narrowContainer } from '../../styles/styles'

export default compose(
  checkAuthForPage
)(function MyProfilePage (props) {
  return <MainLayout>
    <Container {...paddingContainer} {...narrowContainer}>
      <h1>个人中心</h1>
      <UserCenterNavs/>
      <UserProfileView/>
    </Container>
  </MainLayout>
})

const UserProfileView = compose(
  withCurrentUser('currentUser'),
  withUserProfile('profile', ({currentUser}) => currentUser.user._id),
  withStyles('styles', {
    view: {
      '@media (min-width: 768px)': {
        display: 'flex'
      },
    },
    avatarBlock: {
      flexShrink: 0,
      display: 'flex',
      algnItems: 'center',
      justifyContent: 'center',
      '@media (min-width: 768px)': {
        marginRight: '3rem',
      },
      '@media (max-width: 767px)': {
        marginBottom: '1rem',
      },
    },
    infoBlock: {
      flexGrow: 1,
    }
  })
)(function UserProfileView ({styles, profile, currentUser}) {
  return <div {...styles.view}>
    <div {...styles.avatarBlock}>
      <UserAvatar size={200} avatar={profile.avatar} name={profile.name}
                  email={prop('emails.0.address', currentUser.user)}/>
    </div>
    <div {...styles.infoBlock}>
      <Form>
        <FormGroup row>
          <Label sm="2">姓名</Label>
          <Col sm="10"><Input/></Col>
        </FormGroup>
        <FormGroup row>
          <Label sm="2">性别</Label>
          <Col sm="10"><Input/></Col>
        </FormGroup>
        <FormGroup row>
          <Label sm="2">生日</Label>
          <Col sm="10"><Input/></Col>
        </FormGroup>
        <FormGroup row>
          <Label sm="2">身高</Label>
          <Col sm="10"><Input/></Col>
        </FormGroup>
        <FormGroup row>
          <Label sm="2">体重</Label>
          <Col sm="10"><Input/></Col>
        </FormGroup>
        <FormGroup row>
          <Label sm="2">简介</Label>
          <Col sm="10"><Input type="textarea" rows="5"/></Col>
        </FormGroup>
      </Form>
    </div>
  </div>
})