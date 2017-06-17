import React from 'react'
import { compose, pure } from 'recompose'
import Avatar from 'react-avatar'

export default compose(
  pure
)(function UserAvatar ({avatar, name, email, size}) {
  return <Avatar round size={size} src={avatar} value={truncateName(name || getEmailName(email))} textSizeRatio={2.5}/>
})

function truncateName (name) {
  return name.substr(0, 2)
}

function getEmailName (email) {
  return email.substr(0, email.indexOf('@'))
}