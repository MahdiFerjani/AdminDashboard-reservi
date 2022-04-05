import {ALL_NOTIFICATIONS, ETAT_VUE } from "../types";
export default function (state = {}, action){
    switch (action.type) 
    {
        case ALL_NOTIFICATIONS : 
        return {
            ...state ,
             notifications : action.payload
            
            }
      case ETAT_VUE:
                return {
                  ...state
                  
                  
                };
        default:
            return state;
    }
}