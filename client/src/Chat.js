import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Chatbox from './Chatbox';
import Messages from './Messages';
import Header from './Header';
import UsersList from './UsersList';
import { Container, Row, Col } from 'react-bootstrap';
import { useWebSocket } from './WebSocket';
import { addMessages } from './actions/index';

export const Chat = (props) => {

    const ws = useWebSocket();    

    const username = useSelector(state => state.user)
    
    const dispatch = useDispatch()

    ws.socket.onopen = (event) => {ws.enterRoom(username)}

    
    // Load history of messages that existed before we joined
    useEffect(() => {
        axios.get("http://localhost:8080/api/messages").then(function (response) {
            // Change "_id" property to "id"
            response.data.map((value) => {
                Object.defineProperty(value, "id", Object.getOwnPropertyDescriptor(value, "_id"))
                delete value["_id"]
                return value
            })
            dispatch(addMessages(response.data))
        })
    }, [])

    return (
    <Container fluid className="w-100" style={{display: 'flex', flexFlow: 'column', height: '100vh'}}>
        <Header/>
        <Container style={{flex: '1', overflow: 'auto'}}>
            <Row className="justify-content-md-center h-100">
            <Col xs={3}>
                <UsersList/>
            </Col>
            <Col xs={6} className="border-left border-right">
                <Messages/>
            </Col>
            <Col xs={3}>
                
            </Col>
            </Row>
        </Container>
        <Chatbox/>
    </Container>
    );
}

export default Chat;