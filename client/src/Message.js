import React from 'react';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export const Message = (props) => {
  
  const user = useSelector(state => state.user)
  const cardClassName = "mt-2 shadow-sm"
  var cardBackgroundClass = "primary"
  if (props.user != user) {
    cardBackgroundClass = "secondary"
  }

  return (
      <Card className={cardClassName} bg={cardBackgroundClass}>
          <p class="text-left pl-2 pt-1 mb-0">{props.user}</p>
          <Card.Body><p class="text-left pl-2 mb-0">{props.text}</p></Card.Body>
      </Card>
  );

}

export default Message;