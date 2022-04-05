import { ADD_COMMISION } from "../types";
import { UPDATE_COMMISION} from "../types";
import { GET_COMMISION} from "../types";


export default function (state = {}, action){
    switch (action.type) 
    {
        case ADD_COMMISION : 
        return {...state , actions : action.payload}
        
        case  UPDATE_COMMISION : 
        return {...state , actions : action.payload}

        case  GET_COMMISION : 
        return {...state , actions : action.payload}

        default:
            return state;
    }
}


