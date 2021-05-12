// WebSocket.js

import React from 'react'
import { SEND_MESSAGE, ENTER_ROOM } from './constants/EventTypes'
import { useDispatch } from 'react-redux';
import { addMessage } from './actions/index';

const WebSocketContext = React.createContext(null)

function WebSocketProvider({children}) {
    
    let socket;
    let ws;

    const dispatch = useDispatch();

    // Triggered when user enters a room.
    const enterRoom = (username) => {
        
        console.log("WebSocketProvider.enterRoom()")

        const payload = {event: ENTER_ROOM, user: username}
        
        socket.send(JSON.stringify(payload))
    }

    // Triggered when users send a message
    const sendMessage = (username, message) => {

        console.log("WebSocketProvider.sendMessage()")
        
        const payload = {
            event: SEND_MESSAGE,
            user: username,
            text: message,
        }

        socket.send(JSON.stringify(payload))
    }

    if (!socket) {
        // Stablish connection
        socket = new WebSocket('ws://localhost:8080/ws')

        // Define listeners
        socket.onmessage = (e) => {
            console.log("WebSocketProvider.socket.onmessage")
            var msg = JSON.parse(e.data);
            console.log(msg)
            switch (msg.event) {
                case ENTER_ROOM:
                    // Enter room
                    console.log("WebSocketProvider.socket.onmessage.ENTER_ROOM")
                    break;
                case SEND_MESSAGE:
                    // Send message
                    console.log("WebSocketProvider.socket.onmessage.SEND_MESSAGE")
                    delete msg["event"]
                    msg["id"] = "temp_id_"+Math.random().toString(36).substring(7)
                    dispatch(addMessage(msg))
                    break;
                default:
            }
            //addMessage(e, msg)
        };

        // Define the value of the provider, with the connection and the events.
        ws = {
            socket: socket,
            sendMessage,
            enterRoom
        }
    }

    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    )
}

function useWebSocket() {
    const context = React.useContext(WebSocketContext)
    if (context === undefined) {
        throw new Error('context undefined')
    }
    return context
}

export {WebSocketProvider, useWebSocket}
