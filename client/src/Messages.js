import React from 'react';
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap';
import Message from './Message';

export const Messages = () => {

  // Updates of messages triggers re-render
  const messages = useSelector(state => state.messages)

  return (
    <Container fluid>
      {
        messages.map(message => (
          <Message user={message.user} text={message.text} key={message.id.toString()}/>
        ))
      }
    </Container>
  );
}

export default Messages;