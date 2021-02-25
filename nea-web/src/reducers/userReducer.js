import { LOAD_USER,
     ADD_CARWASH_TO_USER,
      ADD_CAR_TO_USER,
      ADD_LATLANG_WASHER,
      ADD_PAYMENT_METHOD_TO_USER,
      UPDATE_CAR_ON_USER,
      REMOVE_CAR
    } from '../actions/types';

const initialState = {
    user: {
        uid: null,
        email: "",
        names: "",
        phone: "",
        lastnames: "",
        cars: [],
        carwashIds: [],
        agreement:"",
        status:"",
        profile: {},
        profileUrl: '',
        chatIds: [],
        notifications: [],
        address: "",
        latlang: "",
        paymentMethod: null,
        customer: {},
    }
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_USER:
            return{ ...state,
                user: action.payload.user
            };
        case ADD_CARWASH_TO_USER:
            state.user.carwashIds.push(action.payload.carwashId)
            return state
        case ADD_CAR_TO_USER:
            state.user.cars.push(action.payload)
            return state
        case UPDATE_CAR_ON_USER:
            const index = state.user.cars.findIndex(car => car.car.id == action.payload.car.car.id);
            state.user.cars[index] = action.payload.car
            return state
        case ADD_PAYMENT_METHOD_TO_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    paymentMethod: action.payload.paymentMethod,
                    customer: action.payload.customer,
                }
            }
        case ADD_LATLANG_WASHER:
            return {
                ...state,
                user: {
                    ...state.user,
                    latlang: action.payload.latlang
                }
            }
        case REMOVE_CAR:
            const index1 = state.user.cars.findIndex(car => car.car.id == action.payload.car.car.id);
            if(index1 != -1){
                state.user.cars.splice(index1, 1);
            }
            return state
        default:
            return state;
    }
}

export default userReducer;