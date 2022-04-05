
import { firestore } from "../../../fire";
import {useState} from "react";
import { ADD_MOSTPOPULAR, DELETE_MOSTPOPULAR, GET_ALL_ORDERS, GET_ALL_ORDERS_BY_RESTAURANTS, GET_MOSTPOPULAR, GET_ORDERS_BY_RESTAURANTS } from '../types';
const notifications= [];
const moment = require('moment');


 export async  function deleteMostPopular(idRestaurant){

   
    await firestore.collection("MostPopular")
    .where("id", "==", idRestaurant ).get()
    .then(res => {
     
      res.forEach(element => {
        element.ref.delete();
      });
    });
    let i = 0
  
return await {
type : DELETE_MOSTPOPULAR , 
payload : true
    }
}

export async  function AddMostPopular(dataMostPopular){
  

   
    let OrderNumber = []
    let OrderDate = []
    let Orderincomes = []
    let incomes = 0
    await firestore.collection("MostPopular")
    .get()
    .then(res => {
      res.forEach(element => {
        element.ref.delete();
      });
    });
    let i = 0
    await dataMostPopular.forEach(element => {
    
         firestore.collection("MostPopular").doc(i+"").set(element)
         i++
    });

return await {
type : ADD_MOSTPOPULAR , 
payload : true
    }


    
  }

  
  export async  function getMostPopular(){

    let MostPopular = []

 const Orders = await firestore.collection("MostPopular").get().then((querySnapshot) => {
  
  
        querySnapshot.forEach((doc) => {
 
       
      MostPopular.push(doc.data())
            });
    
   

 return MostPopular;
  }).catch(e => {return [];});  
 
return await {
type : GET_MOSTPOPULAR , 
payload : Orders,

}
  }

  export async  function getAllInfo( dateType){
    let commisonvalue = Number(localStorage.getItem("commisionvalue")) / 100;

    let OrderNumber = 0
    let OrderIncomes = 0
    let OrderCommision = 0
    let OrdersCtp = 0
    let OrdersIncomesCtp = 0
    let OrdersCommisionCtp = 0
    let now = moment().format("YYYY-MM-DD");
    let dateNow = moment(new Date()).format("YYYY-MM-DD")
   
 const Orders = await firestore.collection("Orders").get().then((querySnapshot) => {
     alert(dateType)
    if(dateType === 'daily'){
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().lastn}`)
            let dateOrder = moment(doc.data().date).format("YYYY-MM-DD")
         
            if(dateNow === dateOrder ){
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
    }
    else if(dateType === 'weekly'){
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().lastn}`)
            let dateOrder = moment(doc.data().date)
         
            if(dateOrder.isBefore(moment(doc.data().date).add(7, 'days'))){
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
    }
    if(dateType === 'monthly'){
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
    }
  return OrderNumber;
  }).catch(e => {return [];});  
return await {
type : GET_ALL_ORDERS , 
OrderNumber : OrderNumber,
OrderCommision : OrderCommision,
OrdersCtp : OrdersCtp,
OrdersCommisionCtp : OrdersCommisionCtp,
OrderIncomes : OrderIncomes,
OrdersIncomesCtp: OrdersIncomesCtp
}
  }