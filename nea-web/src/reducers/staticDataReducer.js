import { CURRENT_IMAGE,
    ADD_WASHERS_DATA,
    LOAD_REVIEW,
    LOAD_NOTIFICATION
   } from '../actions/types';

const initialState = {
   currentImage: {
       tree: 'alsdkfjaj'
   },
   washers: {},
   review: {},
   notification: {}
}

const staticDataReducer = (state = initialState, action) => {
   switch(action.type){
       case CURRENT_IMAGE:
           return{ ...state,
            currentImage: action.payload.image
           };
        case ADD_WASHERS_DATA:
            return{ ...state,
                washers: action.payload.washers
            };
        case LOAD_REVIEW:
            return{ ...state,
                review: action.payload.review
            };
        case LOAD_NOTIFICATION: 
            return {
                ...state,
                notification: action.payload.notification
            }
       default:
           return state;
   }
}

export default staticDataReducer;