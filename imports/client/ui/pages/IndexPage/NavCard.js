import React from 'react'
import { Card } from 'reactstrap'
import { compose }from 'recompose'

import withStyles from '../../../hocs/with_styles'

export default compose(
  withStyles('styles', {
    card: {
      position: 'relative'
    },
    content: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    verticalPlaceholder: {
      paddingTop: '56.25%'
    }
  })
)(function IndexNavCard ({styles, children, href}) {
  return <Card {...styles.card}>
    <div {...styles.content}>
      <h3>{children}</h3>
    </div>
    <div {...styles.verticalPlaceholder}></div>
  </Card>
})