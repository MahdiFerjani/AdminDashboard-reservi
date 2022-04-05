import { GET_REVIEWS } from "../types";

export default function (state = {}, action){
    switch (action.type) 
    {
        case GET_REVIEWS: 
        return {...state , actions : action.payload}
        default:
            return state;
    }
}