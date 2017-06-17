import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'

const UserProfiles = new Mongo.Collection('user_profiles')

UserProfiles.attachSchema(new SimpleSchema({
  // _id is user id

  name: {
    type: String,
    optional: true,
  },

  gender: {
    type: String,
    optional: true,
    allowedValues: ['Male', 'Female'],
  },

  birthday: {
    type: Date,
    optional: true,
  },

  // cm
  height: {
    type: Number,
    optional: true,
  },

  // kg
  weight: {
    type: Number,
    optional: true,
  },

  introduction: {
    type: String,
    optional: true,
  },

  // avatar image url
  avatar: {
    type: String,
    optional: true,
  },
}))

export default UserProfiles