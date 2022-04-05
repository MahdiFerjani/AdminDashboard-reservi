import moment from 'moment'
import { firestore } from "../../../fire";
import {ALL_NOTIFICATIONS, ETAT_VUE } from "../types";
import {useState} from "react";
const notifications= [];



export async  function AllNotifications(){

 const notifications = await firestore.collection("Notifications").get().then((querySnapshot) => {
    let User = []
    querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().lastn}`);
    User.push({   
    id : doc.id,
    data: doc.data()})
    });
 return User;
  }).catch(e => {return [];});  
return await {
type : ALL_NOTIFICATIONS , 
payload : notifications
    }
  }

  export async function etatVue(notificationID){
    const activateState = await firestore.collection("Notifications").doc(notificationID).update({etatVue : 1}).then((querySnapshot) => {
      dispatchEvent(AllNotifications()) 
   return true;
    }).catch(e => {return false;});  
  return await {
  type : ETAT_VUE , 
  payload : notificationID,
      }
    }
  
