import { ACTIVATE_RESTAURANT, GET_ALL_ORDERS, GET_ALL_ORDERS_BY_RESTAURANTS,GET_ARGENTS_RESTAURANTS, GET_ALL_RESTAURANTS, GET_BANNE_RESTAURANTS, GET_NEW_RESTAURANTS, GET_ORDERS_BY_RESTAURANTS } from "../types";

export default function (state = {}, action) {
  switch (action.type) {
    case GET_NEW_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload,
      
      }; 
       case GET_BANNE_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload,
        
      };
      case GET_ALL_RESTAURANTS:
        return {
          ...state,
          restaurants: action.payload,
          
        };
        case ACTIVATE_RESTAURANT:
          return {
            ...state,
            updatestate: action.payload,
            
          };
          case GET_ARGENTS_RESTAURANTS:
            return {
              ...state,
              RestaurantsArgent: action.payload,
              
            };
    default:
      return state;
  }
}
