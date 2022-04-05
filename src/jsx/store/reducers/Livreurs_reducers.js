import {GET_LIVREUR,AFFECT_ORDER,ADD_LIVREUR} from "../types";

const defaultstate = {
      livreurs : [],
      userid:false}
export default function (state=defaultstate , action) {
  switch (action.type) {
        case GET_LIVREUR:
        return {
          ...state,
          livreurs: action.payload,
        };
        case ADD_LIVREUR:
          
        return {
          ...state,
          action:action.payload

        };
        case AFFECT_ORDER:
        
          return {
            ...state,
            action: action.payload,
           
          };
    default:
      return state;
  }
}