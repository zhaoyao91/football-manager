import React from 'react'
import { Card, Row, Col } from 'reactstrap'
import { compose }from 'recompose'

import withStyles from '../../hocs/with_styles'
import MainLayout from '../views/MainLayout'

export default function IndexPage (props) {
  return <MainLayout>
    <NavCardsLayout>
      <NavCard>我</NavCard>
      <NavCard>活动</NavCard>
      <NavCard>人员</NavCard>
      <NavCard>球队</NavCard>
      <NavCard>球场</NavCard>
      <NavCard>球赛</NavCard>
    </NavCardsLayout>
  </MainLayout>
}

const NavCard = compose(
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
)(function NavCard ({styles, children, href}) {
  return <Card {...styles.card}>
    <div {...styles.content}>
      <h3>{children}</h3>
    </div>
    <div {...styles.verticalPlaceholder}></div>
  </Card>
})

const NavCardsLayout = function NavCardsLayout ({children}) {
  return <Row noGutters>
    {
      children.map((child, index) => (
        <Col xs="12" sm="6" lg="4" key={index}>
          {child}
        </Col>
      ))
    }
  </Row>
}