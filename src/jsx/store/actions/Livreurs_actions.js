
import {GET_LIVREUR,ADD_LIVREUR,AFFECT_ORDER} from "../types";
import axios from 'axios'
import { firestorage, firestore , fire } from "../../../fire";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export async  function getLivreurs(){

    let livreurs = []

 const Delivery_boys = await firestore.collection("DeliveryBoys").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
      
      if (doc.OrdersAffected) {
           livreurs.push({
           OrdersAffected:doc.OrdersAffected,
           data :doc.data(),
           id : doc.id
      })}
      else {

        livreurs.push({
          data :doc.data(),
          id : doc.id
     })
      }
            });
 return livreurs;
  }).catch(e => {return [];});  
 
return await {
type : GET_LIVREUR , 
payload : livreurs ,
}
}

export async function addLivreur(data){
fire.auth().createUserWithEmailAndPassword(data.email, data.password).then((res)=>{
    firestore.collection("DeliveryBoys").doc(res.user.uid).set(data).then(function() {
      toast.success(' delivery boy added successfully!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: 0,
        });
    })
    

    }).catch(function(error) {
      toast.error('failed to add a delivery boy :(!', {
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
    type : ADD_LIVREUR , 
    payload : data
        }

}

export async  function AffectOrders(LivreurId,affectedOrder,token,tokenrestaurant,numberorder,Total,fraislivraison){
  const assign = await firestore.collection("DeliveryBoys").doc(LivreurId).collection("OrdersAffected").add(affectedOrder)
    await firestore.collection("Orders").doc(affectedOrder.orderID).update({"Etat":1, numticket : numberorder + 1})
    await firestore.collection("Restaurants").doc(affectedOrder.restaurantID).update({"numberorder":numberorder+1})
     const usertoken = await getUserById(affectedOrder.userID)
      await firestore.collection("deliverygratuit").doc(affectedOrder.userID).get().then(resdel => {

if(resdel.exists === false){
 firestore.collection("Orders").doc(affectedOrder.orderID).update({"fraisLivraison": 0, Total : Total - fraislivraison})
firestore.collection("deliverygratuit").doc(affectedOrder.userID).set({deliveryGratuit : true})
if(usertoken&&usertoken!=""){

  axios.post('https://fcm.googleapis.com/fcm/send', {
    notification: {
        title: `First Order = Free Delivery`,
        body: `Thank you for using Reservé`,
        sound : "default",
        icon: "http://url-to-an-icon/icon.png"
    },
    data: {
      titre : `First Order = Free Delivery`,
      title: `irst Order = Free Delivery`,
      body: `Thank you for using Reservé`,
    },
    to:usertoken
  }, {
    headers: {
     'Content-Type': 'application/json',
     Authorization: `key=AAAALVZuUPs:APA91bGbIFqCjsXdDTPwgsk5jR2uvlbOOOgFG1gMKo94OZtWmoSdllk6zQX9yJu3HsxerXB47Z7Qrpy10zU_ZriddXpiG2HW7fWI3u2YwR1zNgqfxObxt9AaJc-AGuumep19hq2zevNF`
    }}).then(res => console.log(res))
 
 
  }}
      }).catch(e => {
        alert("efffrfrfffr")
      
      }) 
     if(tokenrestaurant!=""){
      axios.post('https://fcm.googleapis.com/fcm/send', {
        notification: {
            title: `Order#${numberorder+1} changed to Accepted`,
            body: ``,
            sound : "default",
            icon: "http://url-to-an-icon/icon.png"
        },
        data: {
          titre : 'Order Accepted',
          title: `Order#${numberorder+1} changed to Accepted`,
          body: ``
        },
        to: tokenrestaurant
      }, {
        headers: {
         'Content-Type': 'application/json',
         Authorization: `key=AAAALVZuUPs:APA91bGbIFqCjsXdDTPwgsk5jR2uvlbOOOgFG1gMKo94OZtWmoSdllk6zQX9yJu3HsxerXB47Z7Qrpy10zU_ZriddXpiG2HW7fWI3u2YwR1zNgqfxObxt9AaJc-AGuumep19hq2zevNF`
        }}).then(res => console.log(res))
     }
     if(token!=""){
      axios.post('https://fcm.googleapis.com/fcm/send', {
        notification: {
            title: `Order#${numberorder+1}  changed to Accepted`,
            body: ``,
            sound : "default",
            icon: "http://url-to-an-icon/icon.png"
        },
        data: {
          titre : 'Order Accepted',
          title: `Order#${numberorder+1} changed to Accepted`,
          body: ``
        },
        to: token
      }, {
        headers: {
         'Content-Type': 'application/json',
         Authorization: `key=AAAALVZuUPs:APA91bGbIFqCjsXdDTPwgsk5jR2uvlbOOOgFG1gMKo94OZtWmoSdllk6zQX9yJu3HsxerXB47Z7Qrpy10zU_ZriddXpiG2HW7fWI3u2YwR1zNgqfxObxt9AaJc-AGuumep19hq2zevNF`
        }}).then(res => console.log(res))
     }
     if(usertoken&&usertoken!=""){
      axios.post('https://fcm.googleapis.com/fcm/send', {
        notification: {
            title: `Order#${numberorder+1} Accepted`,
            body: `we will be there in few minutes`,
            sound : "default",
            icon: "http://url-to-an-icon/icon.png"
        },
        data: {
          titre : `Order#${numberorder+1} Accepted`,
          title: `we will be there in few minutes`,
          body: `Order#${numberorder+1} changed to Accepted`,
        },
        to:usertoken
      }, {
        headers: {
         'Content-Type': 'application/json',
         Authorization: `key=AAAALVZuUPs:APA91bGbIFqCjsXdDTPwgsk5jR2uvlbOOOgFG1gMKo94OZtWmoSdllk6zQX9yJu3HsxerXB47Z7Qrpy10zU_ZriddXpiG2HW7fWI3u2YwR1zNgqfxObxt9AaJc-AGuumep19hq2zevNF`
        }}).then(res => console.log(res))
     }
   
 return await {
 type : AFFECT_ORDER , 
 payload : AffectOrders.orderID
     }
   }
   async function getUserById(id){
   
    const user = firestore.collection('Users').doc(id)

    const doc = await user.get()
    if (!doc) {
      return await null
    } else {
     
      return await (doc.data().token);
    }
       }
 