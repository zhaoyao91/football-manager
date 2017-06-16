import React from 'react'
import { compose } from 'recompose'

import MainNavbar from './MainNavbar'
import withStyles from '../../hocs/with_styles'

export default compose(
  withStyles('styles', {
    layout: {
      paddingTop: '54px'
    },
    navbarWrapper: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
    }
  })
)(function MainLayout ({styles, children}) {
  return <div {...styles.layout}>
    <div {...styles.navbarWrapper}>
      <MainNavbar/>
    </div>
    <div>{children}</div>
  </div>
})