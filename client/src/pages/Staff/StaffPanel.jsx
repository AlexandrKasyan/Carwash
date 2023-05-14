import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import EmployeeInformation from './EmployeeInformation'
import Order from './order/Order'
import './style.css'

const StaffPanel = () => {
  return (
    <Container>
      <Row className='mt-4'>
        <Col><EmployeeInformation /></Col>
        <Col md={9}><Order  /></Col>
      </Row>

    </Container>
  )
}

export default StaffPanel