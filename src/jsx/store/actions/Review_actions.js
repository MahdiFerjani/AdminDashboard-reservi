import moment from 'moment'
import { firestore } from "../../../fire";
import {useState} from "react";
import { GET_REVIEWS } from '../types';
const review= [];



export async  function GetReviews(RestId){

 const review = await firestore.collection("Restaurants").doc(RestId).collection("Reviews").get().then((querySnapshot) => {
    let Rev = []
    querySnapshot.forEach((doc) => { 
    firestore.collection("Users").doc(doc.data().idUser).get().then((rest) =>{
        let User = rest.data()
      
        Rev.push({   
            id : doc.id,
            data: doc.data(),
            User:User
            })
    })
  
    });

 return Rev;
  }).catch(e => {return [];});  
return await {
type : GET_REVIEWS , 
payload : review
    }
  }
