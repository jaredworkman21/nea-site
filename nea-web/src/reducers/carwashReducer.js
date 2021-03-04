import { 
     LOAD_CARWASH,
     ADD_CAR_TO_CARWASH,
     ADD_TYPE_TO_CARWASH,
     ADD_SUBSCRIPTION_TO_CARWASH,
     ADD_DATE_TO_CARWASH,
     ADD_WASHER_TO_CARWASH,
     ADD_PAYMENT_STATUS_TO_CARWASH,
     ADD_CARWASH,
     LOAD_CURRENT_CARWASH,
     UPDATE_CARWASH_STATUS,
     SET_CASH,
     ADD_PRICETEMP,
     ADD_LAST_WASH,
    } from '../actions/types';

const initialState = {
    carwashes: [],
    currentCarwash: {
        id: "",
        car: {},
        userId: "",
        washType: {},
        washer: "",
        paymentStatus: "",
        recurring: false,
        subscription: "",
        price: "",
        date: "",
        dateString: "",
        dayString: "",
        time: "",
        chatId: "",
        status: '',
        stripeToken: "",
        cash: false,
        closestWashers: [],
        priceTemp: '',
        lastWash: '',
    }
}

const carwashReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_CARWASH:
            return{ ...state,
                carwashes: action.payload.carwashes
            };
        case LOAD_CURRENT_CARWASH:
            return{ ...state,
                currentCarwash: action.payload.currentCarwash
            };
        case ADD_CAR_TO_CARWASH:
            return {
                ...state,
                currentCarwash: {
                  ...state.currentCarwash,
                  car: action.payload.car
                }
              }
        case ADD_PRICETEMP:
            return {
                ...state,
                    currentCarwash: {
                        ...state.currentCarwash,
                        priceTemp: action.payload.price
                    }
                }
        case SET_CASH:
            return {
                ...state,
                currentCarwash: {
                    ...state.currentCarwash,
                    cash: action.payload.cash
                }
            }
        case ADD_LAST_WASH:
            return {
                ...state,
                currentCarwash: {
                    ...state.currentCarwash,
                    lastWash: action.payload.lastWash
                }
            }
        case ADD_TYPE_TO_CARWASH:
            return {
                ...state,
                currentCarwash: {
                  ...state.currentCarwash,
                  washType: action.payload.washType.level
                }
              }
        case ADD_SUBSCRIPTION_TO_CARWASH:
            return {
                ...state,
                currentCarwash: {
                  ...state.currentCarwash,
                  subscription: action.payload.subscription,
                  price: action.payload.price
                }
              }
        case ADD_DATE_TO_CARWASH:
            return {
                ...state,
                currentCarwash: {
                  ...state.currentCarwash,
                  time: action.payload.time,
                  date: action.payload.selectedDate,
                  dateString: action.payload.dateString
                }
              }
        case UPDATE_CARWASH_STATUS: 
            return {
                ...state,
                currentCarwash: {
                    ...state.currentCarwash,
                    status: action.payload.status
                }
            }
        case ADD_WASHER_TO_CARWASH:
            state.currentCarwash.washer =  action.payload.washer
            state.currentCarwash.status = 'solicited'
            return state
        case ADD_PAYMENT_STATUS_TO_CARWASH:
            state.currentCarwash.paymentStatus =  action.payload.paymentStatus
            return state
        case ADD_CARWASH:
            state.carwashes.push(action.payload.carwash)
            return state
        default:
            return state;
    }
}

export default carwashReducer;