import { combineReducers } from "@reduxjs/toolkit";
import Notifications from './norifications_reducers';
import Orders from './restaurants_reducers';
import Commission from './Comissions_reducers';
import Reviews from './Review_reducers';
import MostPopular from './mostPopular_reducers';
import trendingThisWeek from './trendingThisWeek_reducers';
import Promotions from './promotions_reducers';
import Restaurants from './restaurant_reducers';
import Vouchers from './vouchers_reducers';
import Livreurs from "./Livreurs_reducers";

const rootReducer = combineReducers({
   Notifications,
   Orders, 
   Commission,
   Reviews,
   MostPopular,
   trendingThisWeek,
   Restaurants,
   Promotions,
   Vouchers,
   Livreurs
})
export default rootReducer;