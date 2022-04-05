
import { firestorage, firestore } from "../../../fire";
import {useState} from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ADD_PROMOTIONS, ADD_TRENDING, DELETE_TRENDING, GET_ALL_ORDERS, GET_ALL_ORDERS_BY_RESTAURANTS, GET_TRENDING, GET_ORDERS_BY_RESTAURANTS, GET_PROMOTIONS, DELETE_PROMOTIONS } from '../types';
const notifications= [];
const moment = require('moment');


 export async  function deletePromotions(idpromotion){

   
    await firestore.collection("Promos").
   doc(idpromotion).delete().then(function() {
    toast.warning(' promotion delete successfully!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: 0,
      });
    })

  
return await {
type : DELETE_PROMOTIONS , 
payload : idpromotion
    }
}

export async  function AddPromotions(data, imageAsFile){
  
const uploadTask = firestorage.ref(`/promos/${imageAsFile.name}`).put(imageAsFile)
   
uploadTask.on('state_changed', 
(snapShot) => {
  //takes a snap shot of the process as it is happening
  console.log(snapShot)
}, (err) => {
  //catches the errors
  console.log(err)
}, () => {
  // gets the functions from storage refences the image storage in firebase by the children
  // gets the download url then sets the image from firebase as the value for the imgUrl key:
  firestorage.ref('promos').child(imageAsFile.name).getDownloadURL()
   .then(fireBaseUrl => {
     data.promoImage = fireBaseUrl
     firestore.collection("Promos").add(data).then(function() {
      toast.success(' promotion added successfully!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: 0,
        });
    }).catch(function(error) {
      toast.error('failed to add promotion :(!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: 0,
        });
    })
     
     //setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
   })
})
    


return await {
type : ADD_PROMOTIONS , 
payload : data
    }


    
  }

  
  export async  function getPromotions(){

    let promotions = []

 const promotion = await firestore.collection("Promos").get().then((querySnapshot) => {
  
  
        querySnapshot.forEach((doc) => {
 
       
      promotions.push({
        ...doc.data(),
        id : doc.id
      })
            });
    
   

 return promotions;
  }).catch(e => {return [];});  
 
return await {
type : GET_PROMOTIONS , 
payload : promotion,

}
  }

