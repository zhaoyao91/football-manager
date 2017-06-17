import React from 'react'
import { Container } from 'reactstrap'
import { compose } from 'recompose'
import withStyles from '../../hocs/with_styles'

export default compose(
  withStyles('_styles', {
    container: {
      padding: 15
    }
  })
)(function ({_styles, ...otherProps}) {
  return <Container {..._styles.container} {...otherProps}/>
})