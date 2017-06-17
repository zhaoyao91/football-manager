import React from 'react'
import { Card, CardBlock, CardTitle, Container } from 'reactstrap'
import { compose } from 'recompose'

import withStyles from '../../hocs/with_styles'

export default compose(
  withStyles('styles', {
    formCard: {
      maxWidth: '500',
      margin: 'auto',
    }
  })
)(function SingleColumnFormLayout ({styles, title, children}) {
  return <Container className="pt-3">
    <Card {...styles.formCard}>
      <CardBlock>
        {
          title && <CardTitle>{title}</CardTitle>
        }
        {children}
      </CardBlock>
    </Card>
  </Container>
})