import { ADD_MESSAGE, ADD_MESSAGES } from "../constants/action-types";

export function addMessage(payload) {
    return { type: ADD_MESSAGE, payload }
};

export function addMessages(payload) {
    return { type: ADD_MESSAGES, payload }
};