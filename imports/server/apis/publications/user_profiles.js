import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

import UserProfiles from '../../../common/collections/user_profiles'

Meteor.publish('UserProfiles.userProfile', function (userId) {
  check(userId, String)

  return UserProfiles.find(userId)
})