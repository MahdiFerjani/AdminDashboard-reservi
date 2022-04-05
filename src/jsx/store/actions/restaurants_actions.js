
import { firestore } from "../../../fire";
import {useState} from "react";
import { GET_ALL_ORDERS, GET_ALL_ORDERS_ALL_RESTAURANTS, GET_ALL_ORDERS_BY_RESTAURANTS, GET_ORDERS_BY_RESTAURANTS, ALL_ORDERS ,UPDATE_ORDERS } from '../types';
import restaurant_reducers from "../reducers/restaurant_reducers";
import { ToastContainer, toast } from 'react-toastify';
const notifications= [];
const moment = require('moment');



const findMonth = (datestring) => {
    let date = new Date(datestring);
    
    return date.getMonth();
};



const makeDateArray = (orders) => {
  
    let monthFreq =new Array(12).fill(0); // you can use Array.fill() but for clarity
    // now you loop over each object in the data array
    for (const order of orders) {
        const month = findMonth(order.date);
        // Months are from 0-11 in JS so it matches directly with array index
        monthFreq[month] = monthFreq[month] + 1;
        
    }
   return monthFreq;
  
};
const income = (orders) => {
  
    let monthFreq =new Array(12).fill(0); // you can use Array.fill() but for clarity
    // now you loop over each object in the data array
    for (const order of orders) {
        const month = findMonth(order.date);
        // Months are from 0-11 in JS so it matches directly with array index
        monthFreq[month] = monthFreq[month] + order.Total;
        
    }
   return monthFreq;
  
};
export async  function getOrdersByRestaurants(id){
    
    let OrderNumber = []
    let OrderDate = []
    let Orderincomes = []
    let incomes = 0
 const Orders = await firestore.collection("Orders").where("idRestaurant" , "==" , id).get().then((querySnapshot) => {
    
    querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().lastn}`);
    let indexSearchValue = OrderDate.findIndex(res => {

        return res=== moment(doc.data().date).month()
    })

    if(indexSearchValue > -1 ){
        
        OrderNumber[indexSearchValue] ++;
        Orderincomes[indexSearchValue] = Orderincomes[indexSearchValue] + doc.data().Total ;

    }
    else {

        OrderNumber.push(1)
        OrderDate.push(moment(doc.data().date).month())
        Orderincomes.push(doc.data().Total)
        
    }

    });
 return OrderNumber;
  }).catch(e => {return [];});  
return await {
type : GET_ALL_ORDERS_BY_RESTAURANTS , 
allOrderNumber : OrderNumber,
allOrderDate : OrderDate,
allOrderincomes : Orderincomes
    }
  }
  
  export async  function getInfoRestaurants(id, dateType){
    let commisonvalue = Number(localStorage.getItem("commisionvalue")) / 100;

    let OrderNumber = 0
    let OrderIncomes = 0
    let OrderCommision = 0
    let OrdersCtp = 0
    let OrdersIncomesCtp = 0
    let OrdersCommisionCtp = 0
    let now = moment().format("YYYY-MM-DD");
    let dateNow = moment(new Date()).format("YYYY-MM-DD")
   
 const Orders = await firestore.collection("Orders").where("idRestaurant" , "==" , id).get().then((querySnapshot) => {
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
     
            if(dateOrder.isoWeek() == moment(new Date()).isoWeek()){
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
       
            if(dateOrder.month ===  moment(new Date()).month){
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
type : GET_ORDERS_BY_RESTAURANTS , 
OrderNumber : OrderNumber,
OrderCommision : OrderCommision,
OrdersCtp : OrdersCtp,
OrdersCommisionCtp : OrdersCommisionCtp,
OrderIncomes : OrderIncomes,
OrdersIncomesCtp: OrdersIncomesCtp,

}
  }

  export async  function getAllInfo(dateType){
    //let commisonvalue = Number(localStorage.getItem("commisionvalue")) / 100;
    let commisonvalue = 10/ 100;

    let OrderNumber = 0
    let OrderIncomes = 0
    let OrderCommision = 0
    let OrdersCtp = 0
    let OrdersIncomesCtp = 0
    let OrdersCommisionCtp = 0
    let now = moment().format("YYYY-MM-DD");
    let dateNow = moment(new Date()).format("YYYY-MM-DD")
    let OrderDate = ["janvier" ,"février" ,"mars" , "avril" , "mai" ,"juin","juillet","aout","septembre","octobre","novembre","decembre"]
 const Orders = await firestore.collection("Orders").get().then((querySnapshot) => {
   
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
           // if(dateOrder.isBefore(moment(doc.data().date).add(30, 'days'))){
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
OrdersIncomesCtp: OrdersIncomesCtp,
OrderDate: OrderDate
}
  }


export async  function getAllOrdersRestaurants(){
    let OrderNumber = []
    let OrderDate  = ["janvier" ,"février" ,"mars" , "avril" , "mai" ,"juin","juillet","aout","septembre","octobre","novembre","decembre"]
    let Orderincomes = []
    let incomes = 0
    let a=[]
    let NbCommandeparMois=[]
    let TotalCommandeparMois=[]
 const Orders = await firestore.collection("Orders").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
     a.push(doc.data())  
    let indexSearchValue = OrderDate.findIndex(res => res === doc.data().date)
    if(indexSearchValue > -1 ){
        OrderNumber[indexSearchValue] ++;
        Orderincomes[indexSearchValue] = Orderincomes[indexSearchValue] + doc.data().Total ;

    }
    else {

        OrderNumber.push(1)
        
        Orderincomes.push(doc.data().Total)
        
    }

    });
 return OrderNumber;
  }).catch(e => {return [];}); 
  NbCommandeparMois=makeDateArray(a) 
  TotalCommandeparMois=income(a)
return await {
type : GET_ALL_ORDERS_ALL_RESTAURANTS , 
allOrderNumber : NbCommandeparMois,
allOrderDate : OrderDate,
allOrderincomes : TotalCommandeparMois,
    }
  }
  export async  function allOrders(){
    let Orders = []
    let Restaurant=[]
    let res=[]
    
    let a = await firestore.collection("Orders").get()
      for await (let doc of a.docs){
        
         
      let result = await firestore.collection("Restaurants").doc(doc.data().idRestaurant).get()
      let userr = await  firestore.collection("Users").doc(doc.data().idUser).get()
               
      Orders.push({
                    id: doc.id,
                    data : doc.data(),
                     restaurant:result.data(),
                     user: userr.data()
                    
                }) 
       };
        /*firestore.collection("Orders").onSnapshot(res =>{
        for(let doc of res.docChanges()){ 
           
            let r1 = firestore.collection("Restaurants").doc(doc.doc.data().idRestaurant).get()
            let u1 = firestore.collection("Users").doc(doc.doc.data().idUser).get()
                
            Orders.push({
                id: doc.doc.id,
                data : doc.doc.data(),
                 restaurant: doc.doc.data(),
                 user: doc.doc.data()
                
            }) 
        }
    })*/
   return await {
   type : ALL_ORDERS , 
   payload : Orders,
       }
  } 
   export async  function allOrdersFornotif(){
    let Orders = []
    let Restaurant=[]
    let res=[]
    
    let a =  firestore.collection("Orders").onSnapshot(res =>{
        
        for  (let doc of res.docChanges()){ 

     if(doc.doc.data().Etat === 0)
     toast.success(' new Order !', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: 0,
        });
                
              
             };
    })
    
   
     
  
  }
  /*export async  function OrdersUpdate(){
    let Orders = []
    let Restaurant=[]
    let res=[]
    
   
 
        firestore.collection("Orders").onSnapshot(res =>{
        for (let doc of res.docChanges()){ 
           let users=[]
           let rest=[]
            let r1 = firestore.collection("Restaurants").doc(doc.doc.data().idRestaurant).get().then(e=>{
                 rest.push(e.data())
            })
            let u1 = firestore.collection("Users").doc(doc.doc.data().idUser).get().then(e=>{
                users.push(e.data())
            })
            Orders.push({
                id: doc.doc.id,
                data : doc.doc.data(),
                 restaurant: rest,
                 user: users
                
            }) 

        }
        return Orders
    })
 
    return await {
        type : UPDATE_ORDERS , 
        payload : Orders,
            }
  } 
  */