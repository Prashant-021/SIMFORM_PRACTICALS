import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import Displaydate from '../date/Displaydate'

import './bodySec.css'


type Props = {}

const Bodysec = (props: Props) => {
  return (
    <Container>
        <Row className='bodySec'>
            <Col className='contentBox col-10 col-md-6 col-lg-4 px-4 py-5 bg-light border border-1 rounded'>
                <Displaydate/>
            </Col>
        </Row>
    </Container>
  )
}

export default Bodysec