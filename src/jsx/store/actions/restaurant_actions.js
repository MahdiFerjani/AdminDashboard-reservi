
import { firestore } from "../../../fire";
import {useState} from "react";
import { ACTIVATE_RESTAURANT, GET_ALL_ORDERS, GET_ALL_RESTAURANTS,GET_ARGENTS_RESTAURANTS, GET_BANNE_RESTAURANTS, GET_NEW_RESTAURANTS, GET_ORDERS_BY_RESTAURANTS } from '../types';
const notifications= [];
const moment = require('moment');

export async  function activateRestaurants(RestaurantID){ 
 const activateState = await firestore.collection("Restaurants").doc(RestaurantID).update({isNew : false}).then((querySnapshot) => {
    dispatchEvent(getNewRestaurants()) 
 return true;
  }).catch(e => {return false;});  
return await {
type : ACTIVATE_RESTAURANT, 
payload : activateState,
    }
  }
  export async  function banneRestaurants(RestaurantID, state){ 
    const activateState = await firestore.collection("Restaurants").doc(RestaurantID).update({status : state}).then((querySnapshot) => {
       dispatchEvent(getNewRestaurants()) 
    return true;
     }).catch(e => {return false;});  
   return await {
   type : ACTIVATE_RESTAURANT, 
   payload : activateState,
       }
     }
export async  function getNewRestaurants(){ 
    let Restaurants = []
  
 const Orders = await firestore.collection("Restaurants").where("isNew" , "==" , true).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
   Restaurants.push({
        id: doc.id,
        data : doc.data()
   })
    });
 return Restaurants;
  }).catch(e => {return [];});  
return await {
type : GET_NEW_RESTAURANTS , 
payload : Restaurants,

    }
  }
  export async function getBanneRestaurants(){
      
    let Restaurants = []
  
 const Orders = await firestore.collection("Restaurants").where("status", "==", false).get().then((querySnapshot) => {
    
    querySnapshot.forEach((doc) => {
   Restaurants.push({
        id: doc.id,
        data : doc.data()
   })
    
    });
 return Restaurants;
  }).catch(e => {return [];});  
return await {
type : GET_BANNE_RESTAURANTS , 
payload : Orders,

    }
  }
  export async  function getAllRestaurants(){
    let Restaurants = []
  
    const Orders = await firestore.collection("Restaurants").where("status", "==", true).get().then((querySnapshot) => {
       
       querySnapshot.forEach((doc) => {
      Restaurants.push({
           id: doc.id,
           data : doc.data()
      })
       
       });
    return Restaurants;
     }).catch(e => {return [];});  
   return await {
   type : GET_ALL_RESTAURANTS , 
   payload : Orders,
   
       }
  }
  
  export async  function getRestaurantsArgent(){
    let Restaurants = []
    let commisonvalue = Number(localStorage.getItem("commisionvalue")) / 100;
    const Orders = await firestore.collection("Restaurants").get().then((querySnapshot1) => {
       
        querySnapshot1.forEach((doc) => {
  

    let OrderNumber = 0
    let OrderIncomes = 0
    let OrderCommision = 0
    let OrdersCtp = 0
    let OrdersIncomesCtp = 0
    let OrdersCommisionCtp = 0
    let now = moment().format("YYYY-MM-DD");
    let dateNow = moment(new Date()).format("YYYY-MM-DD")
   
 firestore.collection("Orders").where("idRestaurant" , "==" , doc.id).get().then((querySnapshot) => {

        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().lastn}`)
            let dateOrder = moment(doc.data().date)
       
            if(dateOrder.isBefore(moment(doc.data().date).add(30, 'days'))){
                if(doc.data().typePayement === 'delivry'){
                    OrderNumber ++;
                    OrderIncomes += doc.data().Total
                    OrderCommision += ((doc.data().Total)  * commisonvalue) 
                    } else {
                    OrdersCtp ++;
                    OrdersCommisionCtp += ((doc.data().Total)  * commisonvalue)
                    OrdersIncomesCtp += doc.data().Total
                    }
                
            }
            });
    
            Restaurants.push({

                id: doc.id,
                data : doc.data(),
                OrderNumber: OrderNumber,
                OrderIncomes:OrderIncomes,
                OrderCommision:OrderCommision,
                OrdersCtp:OrdersCtp,
                OrdersCommisionCtp:OrdersCommisionCtp,
                OrdersIncomesCtp:OrdersIncomesCtp,
                apayer : OrdersCommisionCtp - ((OrderIncomes * commisonvalue) + (OrdersCommisionCtp * commisonvalue))
     
           })
            

 
  }).catch(e => {return [];}); 

       });
    return Restaurants;
     }).catch(e => {return [];});  
   return await {
   type : GET_ARGENTS_RESTAURANTS , 
   payload : Orders,
   
       }
  }