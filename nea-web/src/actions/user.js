import {LOAD_USER} from './types';
import {ADD_CARWASH_TO_USER} from './types';
import {ADD_CAR_TO_USER} from './types';
import {ADD_LATLANG_USER} from './types';
import {ADD_PAYMENT_METHOD_TO_USER} from './types';
import {UPDATE_CAR_ON_USER,
    LOAD_CURRENT_CARWASH, REMOVE_CAR} from './types';

export const loadUser = (payload) => (
    {
        type: LOAD_USER,
        payload: payload,
    }
)
export const addCarwashToUser = (payload) => (
    {
        type: ADD_CARWASH_TO_USER,
        payload: payload,
    }
)

export const addCarToUser = (payload) => (
    {
        type: ADD_CAR_TO_USER,
        payload: payload,
    }
)
export const addLatLangToUser = (payload) => (
    {
        type: ADD_LATLANG_USER,
        payload: payload,
    }
)
export const addPaymentMethodToUser = (payload) => (
    {
        type: ADD_PAYMENT_METHOD_TO_USER,
        payload: payload,
    }
)
export const updateCarOnUser = (payload) => (
    {
        type: UPDATE_CAR_ON_USER,
        payload: payload,
    }
)
export const loadCurrentUser = (payload) => (
    {
        type: LOAD_CURRENT_CARWASH,
        payload: payload
    }
)

export const removeCar = (payload) => (
    {
        type: REMOVE_CAR,
        payload: payload
    }
)
