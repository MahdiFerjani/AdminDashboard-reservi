import { ADD_TRENDING, DELETE_TRENDING, GET_ALL_ORDERS, GET_ALL_ORDERS_BY_RESTAURANTS, GET_TRENDING, GET_ORDERS_BY_RESTAURANTS } from "../types";

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_TRENDING:
      return {
        ...state,
        action: action.payload,
       
      }; 
       case DELETE_TRENDING:
      return {
        ...state,
        action: action.payload,
        
      };
      case GET_TRENDING:
        return {
          ...state,
          TrendingWeek: action.payload,
          
        };
    default:
      return state;
  }
}
