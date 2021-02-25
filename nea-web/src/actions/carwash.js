import {LOAD_CARWASH,
     ADD_CAR_TO_CARWASH,
      ADD_TYPE_TO_CARWASH,
      ADD_SUBSCRIPTION_TO_CARWASH,
      ADD_DATE_TO_CARWASH,
      ADD_WASHER_TO_CARWASH,
      ADD_PAYMENT_STATUS_TO_CARWASH,
      ADD_CARWASH,
      UPDATE_CARWASH_STATUS,
      SET_CASH,
      ADD_PRICETEMP
    } from './types';


export const loadCarwash = (payload) => (
    {
        type: LOAD_CARWASH,
        payload: payload,
    }
)


export const addCarToCarwash = (payload) => (
    {
        type: ADD_CAR_TO_CARWASH,
        payload: payload,
    }
)

export const addTypeToCarwash = (payload) => (
    {
        type: ADD_TYPE_TO_CARWASH,
        payload: payload,
    }
)

export const addSubscriptionToCarwash = (payload) => (
    {
        type: ADD_SUBSCRIPTION_TO_CARWASH,
        payload: payload,
    }
)

export const addDateToCarwash = (payload) => (
    {
        type: ADD_DATE_TO_CARWASH,
        payload: payload,
    }
)

export const addWasherToCarwash = (payload) => (
    {
        type: ADD_WASHER_TO_CARWASH,
        payload: payload,
    }
)
export const addPaymentStatusToCarwash = (payload) => (
    {
        type: ADD_PAYMENT_STATUS_TO_CARWASH,
        payload: payload,
    }
)

export const addCarwash = (payload) => (
    {
        type: ADD_CARWASH,
        payload: payload,
    }
)
export const updateCarwashStatus = (payload) => (
    {
        type: UPDATE_CARWASH_STATUS,
        payload: payload
    }
)
export const setCash = (payload) => (
    {
        type: SET_CASH,
        payload: payload
    }
)
export const addPriceTemp = (payload) => (
    {
        type: ADD_PRICETEMP,
        payload: payload
    }
)