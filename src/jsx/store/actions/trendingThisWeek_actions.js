
import { firestore } from "../../../fire";
import {useState} from "react";
import { ADD_TRENDING, DELETE_TRENDING, GET_ALL_ORDERS, GET_ALL_ORDERS_BY_RESTAURANTS, GET_TRENDING, GET_ORDERS_BY_RESTAURANTS } from '../types';
const notifications= [];
const moment = require('moment');


 export async  function deleteTrending(idRestaurant){

   
    await firestore.collection("TrendingWeek")
    .where("id", "==", idRestaurant ).get()
    .then(res => {
     
      res.forEach(element => {
        element.ref.delete();
      });
    });
    let i = 0
  
return await {
type : DELETE_TRENDING , 
payload : true
    }
}

export async  function AddTrending(dataTRENDING){
  

   
    let OrderNumber = []
    let OrderDate = []
    let Orderincomes = []
    let incomes = 0
    await firestore.collection("TrendingWeek")
    .get()
    .then(res => {
      res.forEach(element => {
        element.ref.delete();
      });
    });
    let i = 0
    await dataTRENDING.forEach(element => {
    
         firestore.collection("TrendingWeek").doc(i+"").set(element)
         i++
    });

return await {
type : ADD_TRENDING , 
payload : true
    }


    
  }

  
  export async  function getTRENDING(){

    let TRENDING = []

 const Orders = await firestore.collection("TrendingWeek").get().then((querySnapshot) => {
  
  
        querySnapshot.forEach((doc) => {
 
       
      TRENDING.push({data:doc.data(),id : doc.id})
            });
    
   

 return TRENDING;
  }).catch(e => {return [];});  
 
return await {
type : GET_TRENDING , 
payload : Orders,

}
  }

