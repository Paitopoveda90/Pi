// estado inicial 

import { 
    GET_BY_NAME, 
    GET_DOGS,
    GET_TEMPERAMENTS, 
    POST_DOGS,
    GET_DOGS_FOR_TEMP, 
    GET_DOGS_FOR_API,
    GET_DOG_FOR_ID,
    POST_DOGS_CREATE } from "../actions/actions"

let initialState = {dogs:[], dogsCopy: [], temperaments: [], details: []}

function reducer(state = initialState,action){
    switch(action.type){
    case GET_DOGS:
        return{
            ...state,
            dogs: action.payload,
            dogsCopy: action.payload
        };
    case GET_BY_NAME:
        return{
            ...state,
            dogs: action.payload
        };
    
    case GET_DOG_FOR_ID:
        return{
             ...state, 
             details: action.payload 
        };

    case GET_TEMPERAMENTS:
        return{
            ...state,
            temperaments: action.payload
        }
    
    case POST_DOGS:
        return{
             ...state,
             dogs: action.payload       
        }
    
    case POST_DOGS_CREATE:
            return{
                 ...state,
                 dogs: [...state.dogs, action.payload]       
            }
    
    case GET_DOGS_FOR_API:
        return { 
            ...state, 
            dogs: action.payload 
            };
            
    case GET_DOGS_FOR_TEMP:
        return { 
            ...state, 
            dogs: action.payload 
            };
        default:
            return state;
    }

    
};

export default reducer;