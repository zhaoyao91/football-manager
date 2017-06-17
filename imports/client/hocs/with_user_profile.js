import React from 'react'
import { Meteor }from 'meteor/meteor'
import { compose, branch, renderComponent } from 'recompose'

import withMeteorData from './with_meteor_data'
import CenterLoading from '../ui/components/CenterLoading'
import UserProfiles from '../../common/collections/user_profiles'

export default function (name, getUserId) {
  return compose(
    withMeteorData((props) => {
      const userId = getUserId(props)
      const sub = Meteor.subscribe('UserProfiles.userProfile', userId, {onStop: console.error.bind(console)})
      return {
        _ready: sub.ready()
      }
    }),
    branch(({_ready}) => !_ready, renderComponent(CenterLoading)),
    withMeteorData((props) => ({
      [name]: UserProfiles.findOne(getUserId(props)) || {}
    }))
  )
}