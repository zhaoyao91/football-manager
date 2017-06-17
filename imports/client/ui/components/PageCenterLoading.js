import React from 'react'
import { css }from 'glamor'
import { compose, withProps } from 'recompose'

import Loading from './Loading'

export default compose(
  withProps({
    styles: {
      container: css({
        position: 'fixed',
        top: '50%',
        transform: 'translateY(-50%)',
        left: 0,
        right: 0
      })
    }
  })
)(function CenterLoading ({styles}) {
    return <div {...styles.container}>
      <Loading/>
    </div>
  }
)