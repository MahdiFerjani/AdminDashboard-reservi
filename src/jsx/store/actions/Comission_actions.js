import moment from 'moment'
import { firestore } from "../../../fire";
import {useState} from "react";
import { ADD_COMMISION } from '../types';
import { UPDATE_COMMISION } from '../types';
import { GET_COMMISION } from '../types';



const notifications= [];



export async  function addComission(valueCommision){

 const notifications = await firestore.collection("Comissions").add({ title: valueCommision
}).then((ref) => { console.log(ref) }).catch(e => {return [];});  
return await {
type : ADD_COMMISION , 
payload : true
    }
  }
  export async  function updateComission(valueCommision){

    const no = await firestore.collection("Comissions").doc("7hWN1jP8jidmWyG5Nhz3").update({title:valueCommision})
    .then((ref) => { console.log(ref) }).catch(e => {return [];});  
   return await {
   type : UPDATE_COMMISION, 
   payload : true
       }
     }
   
     export async  function getComission(){

      const no = await firestore.collection("Comissions").doc("7hWN1jP8jidmWyG5Nhz3").get()
      .then((ref) => { localStorage.setItem("commisionvalue", ref.data().title) }).catch(e => {return [];});  
     return await {
     type : GET_COMMISION, 
     payload : true
         }
       }
     