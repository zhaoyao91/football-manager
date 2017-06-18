import React from 'react'
import { compose, withHandlers, withProps } from 'recompose'
import { Form, FormGroup, Label, Input, Col, Container } from 'reactstrap'
import { prop, trim } from 'lodash/fp'
import moment from 'moment'

import withStyles from '../../hocs/with_styles'
import MainLayout from '../views/MainLayout'
import UserCenterNavs from '../views/UserCenterNavs'
import withCurrentUser from '../../hocs/with_current_user'
import checkAuthForPage from '../../hocs/check_auth_for_page'
import UserAvatar from '../views/UserAvatar'
import withUserProfile from '../../hocs/with_user_profile'
import { paddingContainer, narrowContainer } from '../../styles/styles'
import EditableInput from '../components/EditableInput'
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
      })
    },
    updateGender: ({alert, profile}) => (tempValue, done) => {
      const newValue = trim(tempValue)
      Meteor.call('UserProfiles.setGender', newValue, (err) => {
        done(newValue)
        if (err) {
          console.error(err)
          alert.error('性别更新失败')
        }
      })
    },
    updateBirthday: ({alert, profile}) => (tempValue, done) => {
      const newValue = tempValue ? new Date(tempValue) : null
      Meteor.call('UserProfiles.setBirthday', newValue, (err) => {
        done(getBirthdayString(newValue))
        if (err) {
          console.error(err)
          alert.error('生日更新失败')
        }
      })
    },
    updateHeight: ({alert, profile}) => (tempValue, done) => {
      const newValue = tempValue ? Number(tempValue) : null
      Meteor.call('UserProfiles.setHeight', newValue, (err) => {
        done(getNumberString(newValue))
        if (err) {
          console.error(err)
          alert.error('身高更新失败')
        }
      })
    },
    updateWeight: ({alert, profile}) => (tempValue, done) => {
      const newValue = tempValue ? Number(tempValue) : null
      Meteor.call('UserProfiles.setWeight', newValue, (err) => {
        done(getNumberString(newValue))
        if (err) {
          console.error(err)
          alert.error('体重更新失败')
        }
      })
    },
    updateIntroduction: ({alert, profile}) => (tempValue, done) => {
      const newValue = trim(tempValue)
      Meteor.call('UserProfiles.setIntroduction', newValue, (err) => {
        done(newValue)
        if (err) {
          console.error(err)
          alert.error('自我介绍更新失败')
        }
      })
    }
  }),
  withProps(({currentUser}) => ({email: prop('emails.0.address', currentUser.user)})),
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
)(function UserProfileView ({updateIntroduction, styles, email, profile, updateName, updateGender, updateBirthday, updateHeight, updateWeight}) {
  return <div {...styles.view}>
    <div {...styles.avatarBlock}>
      <UserAvatar size={200} avatar={profile.avatar} name={profile.name} email={email}/>
    </div>
    <div {...styles.infoBlock}>
      <Form>
        <FormGroup row>
          <Label sm="3">邮箱</Label>
          <Col sm="9">
            <Input readOnly value={email}/>
          </Col>
        </FormGroup>
      </Form>
      <EditableInput label="姓名" value={profile.name || ''} updateValue={updateName}/>
      <EditableInput label="性别" type="select" value={profile.gender || ''} updateValue={updateGender}>
        <option value="">无</option>
        <option value="Male">男</option>
        <option value="Female">女</option>
      </EditableInput>
      <EditableInput type="date" label="生日" value={getBirthdayString(profile.birthday)} updateValue={updateBirthday}/>
      <EditableInput label="身高" type="number" step="any" value={getNumberString(profile.height)}
                     afterGroupAddon="厘米" updateValue={updateHeight}/>
      <EditableInput label="体重" type="number" step="any" value={getNumberString(profile.weight)}
                     afterGroupAddon="千克" updateValue={updateWeight}/>
      <EditableInput label="自我介绍" type="textarea" rows="5" value={profile.introduction || ''}
                     buttonsPosition="bottom" updateValue={updateIntroduction}/>
    </div>
  </div>
})

function getBirthdayString (birthday) {
  return (birthday && moment(birthday).format('YYYY-MM-DD')) || ''
}

function getNumberString (number) {
  if (number === null || number === undefined) return ''
  else return String(number)
}