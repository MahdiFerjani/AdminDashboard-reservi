import { ADD_TRENDING, DELETE_TRENDING, GET_ALL_ORDERS, GET_ALL_ORDERS_BY_RESTAURANTS, GET_TRENDING, GET_ORDERS_BY_RESTAURANTS, ADD_PROMOTIONS, GET_PROMOTIONS, DELETE_PROMOTIONS } from "../types";

export default function (state = {promotions : []}, action) {
  switch (action.type) {
    case ADD_PROMOTIONS:
      let data = state.promotions
          data.push(action.payload)
      return {
        ...state,
        promotions: data,
      }; 
       case DELETE_PROMOTIONS:
        let datacopy = state.promotions.filter((e)=>e.id!==action.payload)
      return {
        ...state,
        promotions: datacopy,
        
      };
      case GET_PROMOTIONS:
        return {
          ...state,
          promotions: action.payload,
          
        };
    default:
      return state;
  }
}
