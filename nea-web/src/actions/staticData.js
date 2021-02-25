import {CURRENT_IMAGE,
    ADD_WASHERS_DATA,
    LOAD_REVIEW,
    LOAD_NOTIFICATION
} from './types';


export const currentImage = (payload) => (
    
    {
        type: CURRENT_IMAGE,
        payload: payload,
    }
)

export const addWashersData = (payload) => (
    
    {
        type: ADD_WASHERS_DATA,
        payload: payload,
    }
)

export const loadReview = (payload) => (
    {
        type: LOAD_REVIEW,
        payload: payload
    }
)

export const loadNotification = (payload) => (
    {
        type: LOAD_NOTIFICATION,
        payload: payload
    }
)
