import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';


export const Username = (props) => {

    const username = props.username;

    return (
        <Button>{username}</Button>
    )
}

export default Username;