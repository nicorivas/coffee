import { ADD_MESSAGE, ADD_MESSAGES, ADD_USER, CHANGE_ROOM_NAME } from "../constants/action-types";

const initialState = {
    user: "Anonymous_"+Math.random().toString(36).substring(7),
    users: [],
    room: "",
    messages: []
};
  
function rootReducer(state = initialState, action) {
    if (action.type === ADD_MESSAGE) {
        return Object.assign({}, state, {
            messages: state.messages.concat(action.payload)
        });
    } else if (action.type === ADD_MESSAGES) {
        return Object.assign({}, state, {
            messages: state.messages.concat(action.payload)
        });
    } else if (action.type === CHANGE_ROOM_NAME) {
        return Object.assign({}, state, {
            room: action.payload
        });
    } else if (action.type === ADD_USER) {
        return Object.assign({}, state, {
            users: state.users.concat(action.payload)
        });
    }
    return state;
};

export default rootReducer;