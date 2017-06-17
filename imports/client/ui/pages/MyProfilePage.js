import React from 'react'
import { compose, withHandlers, withProps } from 'recompose'
import { Form, FormGroup, Label, Input, Col, Container } from 'reactstrap'
import { prop, trim } from 'lodash/fp'

import withStyles from '../../hocs/with_styles'
import MainLayout from '../views/MainLayout'
import UserCenterNavs from '../views/UserCenterNavs'
import withCurrentUser from '../../hocs/with_current_user'
import checkAuthForPage from '../../hocs/check_auth_for_page'
import UserAvatar from '../views/UserAvatar'
import withUserProfile from '../../hocs/with_user_profile'
import { paddingContainer, narrowContainer } from '../../styles/styles'
import EditableInputForm from '../components/EditableInputForm'
import withAlert from '../../hocs/with_alert'

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
  }),
  withAlert('alert'),
  withHandlers({
    updateName: ({alert, profile}) => (tempValue, done) => {
      const newValue = trim(tempValue)
      Meteor.call('UserProfiles.setName', newValue, (err) => {
        done(newValue)
        if (err) {
          console.error(err)
          alert.error('姓名更新失败')
        }
        else {
          alert.success('姓名更新成功')
        }
      })
    }
  }),
  withProps(({currentUser}) => ({email: prop('emails.0.address', currentUser.user)}))
)(function UserProfileView ({styles, email, profile, updateName}) {
  return <div {...styles.view}>
    <div {...styles.avatarBlock}>
      <UserAvatar size={200} avatar={profile.avatar} name={profile.name} email={email}/>
    </div>
    <div {...styles.infoBlock}>
      <Form>
        <FormGroup row>
          <Label sm="2">邮箱</Label>
          <Col sm="10">
            <Input readOnly value={email}/>
          </Col>
        </FormGroup>
      </Form>
      <EditableInputForm label="姓名" value={profile.name || ''} updateValue={updateName}/>
      <EditableInputForm label="性别"/>
      <EditableInputForm label="生日"/>
      <EditableInputForm label="身高"/>
      <EditableInputForm label="体重"/>
    </div>
  </div>
})