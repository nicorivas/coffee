import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import axios from 'axios';
import Username from './Username';
import { Container, Row, Col, Dropdown, InputGroup, FormControl, DropdownButton, Form, Button} from 'react-bootstrap';
import { useWebSocket } from './WebSocket';

let endpoint = "http://localhost:8080";

export const Chatbox = (props) => {
  

  const ws = useWebSocket();

  const [message, setMessage] = useState("");

  const username = useSelector(state => state.user)
  const room = useSelector(state => state.room)

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  }

  // Called when user submits message.
  const sendMessage = (e) => {

    console.log("Chatbox.sendMessage()")

    e.preventDefault();
    
    // Add message to DB via API.
    axios.post(
      endpoint + "/api/message", 
        { User: username, Room: room, Text: message },
        { headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    )
    
    // Send event through websocket.
    ws.sendMessage(username, message)
  }

  return (
    <Container fluid style={{height: 'auto'}}>
      <Row className="justify-content-md-center pb-2 pt-2 border-top">
        <Col></Col>
        <Col xs={8}>
          <Row>
            <Col md="auto">
              <Username username={username}/>
            </Col>
            <Col>
              <Form onSubmit={e => sendMessage(e)}>
                <InputGroup>
                <FormControl
                  placeholder="Say something"
                  value={message}
                  onChange={handleMessageChange}
                />

                <DropdownButton
                  as={InputGroup.Append}
                  variant="primary"
                  title="Say"
                  id="input-group-dropdown-2"
                >
                  <Dropdown.Item href="#">Shout</Dropdown.Item>
                  <Dropdown.Item href="#">WTF</Dropdown.Item>
                </DropdownButton>
                </InputGroup>
              </Form>
            </Col>
          </Row>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default Chatbox;