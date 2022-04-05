import { ADD_MOSTPOPULAR, DELETE_MOSTPOPULAR, GET_ALL_ORDERS, GET_ALL_ORDERS_BY_RESTAURANTS, GET_MOSTPOPULAR, GET_ORDERS_BY_RESTAURANTS } from "../types";

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_MOSTPOPULAR:
      return {
        ...state,
        action: action.payload,
       
      }; 
       case DELETE_MOSTPOPULAR:
      return {
        ...state,
        action: action.payload,
        
      };
      case GET_MOSTPOPULAR:
        return {
          ...state,
          MostPopulars: action.payload,
          
        };
    default:
      return state;
  }
}
