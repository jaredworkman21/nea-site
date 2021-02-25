import { LOAD_CHAT } from '../actions/types';

const initialState = {
    currentChat: {
        id: '',
        messages: [],
        userId: '',
        washerId: '',

    }
}

const chatReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_CHAT:
            return{ ...state,
                currentChat: action.payload.chat
            };
        default:
            return state;
    }
}

export default chatReducer;