import { LOAD_WASHER, 
     ADD_CARWASH_TO_WASHER,
     ADD_DOCUMENTS_TO_WASHER,
     ADD_TUTORIAL_COMPLETE,
     ADD_AVAILABILITY_TO_WASHER,
     ADD_A_DOCUMENT_TO_WASHER,
     UPDATE_WASHER_STATUS,
     ADD_ADDRESS_TO_WASHER,
     ADD_LATLANG_WASHER,
     REMOVE_CARWASH_FROM_WASHER,
     ADD_STRIPE_ACCOUNT_TO_WASHER
    } from '../actions/types';
import { loadWasher } from '../actions/washer';

const initialState = {
    washer: {
        uid: "",
        email: "",
        names: "",
        lastNames: "",
        phone: "",
        agreement:"",
        address: {},
        status:"",
        documents: {
            antecedentesNoPenales:'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fnotadocument.png?alt=media&token=bdd34b21-2343-4bbd-aa0e-d916c103f224',
            antidoping:'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fnotadocument.png?alt=media&token=bdd34b21-2343-4bbd-aa0e-d916c103f224',
            coprobanteDeDomicilio: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fnotadocument.png?alt=media&token=bdd34b21-2343-4bbd-aa0e-d916c103f224',
            identificacionOficial: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fnotadocument.png?alt=media&token=bdd34b21-2343-4bbd-aa0e-d916c103f224',
            registroDatosFiscales: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fnotadocument.png?alt=media&token=bdd34b21-2343-4bbd-aa0e-d916c103f224'
        },
        profile: {
        },
        profileUrl: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fno-profile.png?alt=media&token=80097535-6a6b-4283-aa17-7927338d2d1f',
        notifications: [],
        tutorialComplete: false,
        availability: {},
        chatIds: [],
        carwashIds: [],
        latlang: {},
        rating: 2.5,
        reviews: [],
        washes: 0,
        stripeAccount: null,
    }
}

const washerReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_WASHER:
            return{ ...state,
                washer: action.payload.washer
            };
        case ADD_CARWASH_TO_WASHER:
            state.washer.carwashIds.push(action.payload.carwashId)
            return state
        case REMOVE_CARWASH_FROM_WASHER:
            
            const index = state.washer.carwashIds.indexOf(action.payload.carwash);
            if(index != -1){
              state.washer.carwashIds.splice(index, 1);
            }
            return state
        case ADD_DOCUMENTS_TO_WASHER:
            state.washer.documents.push(action.payload.documentUrls)
            return state
        case ADD_TUTORIAL_COMPLETE:
            state.washer.tutorialComplete = action.payload.tutorialComplete
            return state
        case ADD_AVAILABILITY_TO_WASHER:
            state.washer.availability = action.payload.availability
            return state
        case UPDATE_WASHER_STATUS:
            state.washer.status = action.payload.status
            return state
        case ADD_ADDRESS_TO_WASHER:
            state.washer.address = action.payload.address
            return state
        case ADD_STRIPE_ACCOUNT_TO_WASHER:
            state.washer.stripeAccount = action.payload.stripeAccount
            return state
        case ADD_LATLANG_WASHER:
            state.washer.latlang = action.payload.latlang
            return state
        case ADD_A_DOCUMENT_TO_WASHER: 
            if(action.payload.imageType == 'antecedentesNoPenales'){
                return {
                    ...state,
                    washer: {
                      ...state.washer,
                      documents: {
                        ...state.washer.documents,
                        antecedentesNoPenales: action.payload.document
                      }
                    }
                  }
            }
            else if (action.payload.imageType == 'antidoping'){
                return {
                    ...state,
                    washer: {
                      ...state.washer,
                      documents: {
                        ...state.washer.documents,
                        antidoping: action.payload.document
                      }
                    }
                  }
            }
            else if (action.payload.imageType == 'coprobanteDeDomicilio'){
                return {
                    ...state,
                    washer: {
                      ...state.washer,
                      documents: {
                        ...state.washer.documents,
                        coprobanteDeDomicilio: action.payload.document
                      }
                    }
                  }
            }    
            else if (action.payload.imageType == 'identificacionOficial'){
                return {
                    ...state,
                    washer: {
                      ...state.washer,
                      documents: {
                        ...state.washer.documents,
                        identificacionOficial: action.payload.document
                      }
                    }
                  }
            }
            else if (action.payload.imageType == 'registroDatosFiscales'){
                return {
                    ...state,
                    washer: {
                      ...state.washer,
                      documents: {
                        ...state.washer.documents,
                        registroDatosFiscales: action.payload.document
                      }
                    }
                  }
            }
            else if (action.payload.imageType == 'profile'){
                
                state.washer.profileUrl = action.payload.document
                return state
            }
        default:
            return state;
    }
}

export default washerReducer;

