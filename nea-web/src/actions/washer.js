import {LOAD_WASHER,
    ADD_CARWASH_TO_WASHER,
    ADD_DOCUMENTS_TO_WASHER,
    ADD_AVAILABILITY_TO_WASHER,
    ADD_TUTORIAL_COMPLETE,
    ADD_A_DOCUMENT_TO_WASHER,
    UPDATE_WASHER_STATUS,
    ADD_ADDRESS_TO_WASHER,
    ADD_LATLANG_WASHER,
    REMOVE_CARWASH_FROM_WASHER,
    ADD_STRIPE_ACCOUNT_TO_WASHER,
} from './types';


export const loadWasher = (payload) => (
    {
        type: LOAD_WASHER,
        payload: payload,
    }
)
export const addCarwashToWasher = (payload) => (
    {
        type: ADD_CARWASH_TO_WASHER,
        payload: payload,
    }
)
export const addDocumentsToWasher = (payload) => (
    {
        type: ADD_DOCUMENTS_TO_WASHER,
        payload: payload,
    }
)
export const addCompleteToWasher = (payload) => (
    {
        type: ADD_AVAILABILITY_TO_WASHER,
        payload: payload,
    }
)
export const addTutorialToWasher = (payload) => (
    {
        type: ADD_TUTORIAL_COMPLETE,
        payload: payload,
    }
)
export const addADocumentToWasher = (payload) => (
    {
        type: ADD_A_DOCUMENT_TO_WASHER,
        payload: payload,
    }
)

export const updateWasherStatus = (payload) => (
    {
        type: UPDATE_WASHER_STATUS,
        payload: payload,
    }
)

export const addAddressToWasher = (payload) => (
    {
        type: ADD_ADDRESS_TO_WASHER,
        payload: payload,
    }
)
export const addLatLangToWasher = (payload) => (
    {
        type: ADD_LATLANG_WASHER,
        payload: payload,
    }
)
export const removeCarwashFromWasher = (payload) => (
    {
        type: REMOVE_CARWASH_FROM_WASHER,
        payload: payload,
    }
)
export const addStripeAccountToWasher = (payload) => (
    {
        type: ADD_STRIPE_ACCOUNT_TO_WASHER,
        payload: payload,
    }
)