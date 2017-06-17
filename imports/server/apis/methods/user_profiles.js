import { Meteor } from 'meteor/meteor'
import { check, Match } from 'meteor/check'

import UserProfiles from '../../../common/collections/user_profiles'

Meteor.methods({
  'UserProfiles.setName'(name) {
    check(name, String)

    const userId = this.userId
    if (!userId) throw new Meteor.Error('not-loggedIn', 'user must login')

    UserProfiles.upsert(userId, {$set: {name}})
  },

  'UserProfiles.setGender'(gender) {
    check(gender, String)

    const userId = this.userId
    if (!userId) throw new Meteor.Error('not-loggedIn', 'user must login')

    UserProfiles.upsert(userId, {$set: {gender}})
  },

  'UserProfiles.setBirthday'(birthday) {
    check(birthday, Date)

    const userId = this.userId
    if (!userId) throw new Meteor.Error('not-loggedIn', 'user must login')

    UserProfiles.upsert(userId, {$set: {birthday}})
  },

  'UserProfiles.setIntroduction'(introduction) {
    check(introduction, String)

    const userId = this.userId
    if (!userId) throw new Meteor.Error('not-loggedIn', 'user must login')

    UserProfiles.upsert(userId, {$set: {introduction}})
  },

  'UserProfiles.setAvatar'(avatar) {
    check(avatar, String)

    const userId = this.userId
    if (!userId) throw new Meteor.Error('not-loggedIn', 'user must login')

    UserProfiles.upsert(userId, {$set: {avatar}})
  },

  'UserProfiles.setHeight'(setHeight) {
    check(setHeight, String)

    const userId = this.userId
    if (!userId) throw new Meteor.Error('not-loggedIn', 'user must login')

    UserProfiles.upsert(userId, {$set: {setHeight}})
  },

  'UserProfiles.setWeight'(weight) {
    check(weight, String)

    const userId = this.userId
    if (!userId) throw new Meteor.Error('not-loggedIn', 'user must login')

    UserProfiles.upsert(userId, {$set: {weight}})
  },
})