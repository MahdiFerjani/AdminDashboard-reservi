import {UPDATE_ORDERS, GET_ALL_ORDERS,DATA_LOADING, GET_ALL_ORDERS_ALL_RESTAURANTS, GET_ALL_ORDERS_BY_RESTAURANTS, GET_ORDERS_BY_RESTAURANTS,ALL_ORDERS } from "../types";
  const defaultstate = {
        OrderNumber: 0,
        OrderCommision: 0,
        OrderIncomes: 0,
        OrdersCtp: 0,
        OrdersCommisionCtp: 0,
        OrdersIncomesCtp: 0,
        allOrderNumber: 0,
        allOrderDate: 0,
        allOrderincomes: 0,
        Orders : [],
        loading: true
  }
export default function (state = defaultstate, action) {
  switch (action.type) {
    case DATA_LOADING:
    return {
      ...state,
     loading :true
    }; 
    case GET_ORDERS_BY_RESTAURANTS:
      return {
        ...state,
        loading : false,
        OrderNumber: action.OrderNumber,
        OrderCommision: action.OrderCommision,
        OrderIncomes: action.OrderIncomes,
        OrdersCtp: action.OrdersCtp,
        OrdersCommisionCtp: action.OrdersCommisionCtp,
        OrdersIncomesCtp: action.OrdersIncomesCtp
      }; 
       case GET_ALL_ORDERS_BY_RESTAURANTS:
      return {
        ...state,
        loading : false,
        allOrderNumber: action.allOrderNumber,
        allOrderDate: action.allOrderDate,
        allOrderincomes: action.allOrderincomes
        
      };
      case GET_ALL_ORDERS_ALL_RESTAURANTS:
        return {
          ...state,
          loading : false,
          allOrderNumber: action.allOrderNumber,
          allOrderDate: action.allOrderDate,
          allOrderincomes: action.allOrderincomes
          
        };
      case GET_ALL_ORDERS:
        return {
          ...state,
          loading : false,
          OrderNumber: action.OrderNumber,
          OrderCommision: action.OrderCommision,
          OrderIncomes: action.OrderIncomes,
          OrdersCtp: action.OrdersCtp,
          OrdersCommisionCtp: action.OrdersCommisionCtp,
          OrdersIncomesCtp: action.OrdersIncomesCtp
          
        };
        case ALL_ORDERS:
          return {
            ...state,
            loading : false,
            Orders:action.payload
            
            
          };
        /*  case UPDATE_ORDERS:
            return {
              ...state,
              Orders:action.payload
            };*/
          
    default:
      return state;
  }
}
