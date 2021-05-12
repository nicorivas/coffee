import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux'

export const Header = (props) => {

    const room = useSelector(state => state.room)

    return (
        <Container className="border-bottom" fluid style={{height: '50px'}}>
          <Row className="justify-content-md-center">
            <Col></Col>
            <Col>
              <h1>{room}</h1>
            </Col>
            <Col></Col>
          </Row>
        </Container>
    );
}

export default Header;