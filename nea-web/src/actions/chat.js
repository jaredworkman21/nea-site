import {LOAD_CHAT} from './types';

export const loadChat = (payload) => (
    {
        type: LOAD_CHAT,
        payload: payload,
    }
)