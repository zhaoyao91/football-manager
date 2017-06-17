import React from 'react'
import { Row, Col } from 'reactstrap'

export default  function NavCardsLayout ({children}) {
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