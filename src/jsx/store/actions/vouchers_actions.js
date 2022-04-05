import axios from 'axios'

// ** GET Mails
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { firestore } from '../../../fire'


const MySwal = withReactContent(Swal)
// ** Get table Data

export async function  getVouchers()  {
 
    console.log('ress.docs')
    const Menu = []
    await firestore.collection('Restaurants').doc("Dxp8I8X0S0WLhrZOXkyb9wbgphC3").collection('Vouchers')
.get().then(ress => {

  for (const keys in ress.docs) {
      Menu.push({
...ress.docs[keys].data(),
id:ress.docs[keys].id

  })
}


})
return await ({ type: 'GET_Vouchers', data: Menu })
  
}
export const deleteVouchers = (idMenu) => {

    return firestore.collection('Restaurants').doc(JSON.parse(localStorage.getItem('userData')).id).collection('Vouchers').doc(idMenu).delete().then(res => {
      MySwal.fire({
        title: 'Vouchers Deleted',
        text: '',
        icon: 'success',
        customClass: {
          confirmButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
     // dispatch({ type: 'UPDATE_MAILS', emailIds })
      getVouchers()
    }).catch(e => MySwal.fire({
      title: 'Error!',
      text: '',
      icon: 'error',
      customClass: {
        confirmButton: 'btn btn-danger'
      },
      buttonsStyling: false
    }))


  
}
export const enableVouchers = (idMenu) => {

    return firestore.collection('Restaurants').doc(JSON.parse(localStorage.getItem('userData')).id).collection('Vouchers').doc(idMenu).update({status : 0}).then(res => {
      MySwal.fire({
        title: 'Voucher enabled',
        text: '',
        icon: 'success',
        customClass: {
          confirmButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
     // dispatch({ type: 'UPDATE_MAILS', emailIds })
    getVouchers()
    }).catch(e => MySwal.fire({
      title: 'Error!',
      text: '',
      icon: 'error',
      customClass: {
        confirmButton: 'btn btn-danger'
      },
      buttonsStyling: false
    }))


  
}
export const desableVouchers = (idMenu) => {

    return firestore.collection('Restaurants').doc(JSON.parse(localStorage.getItem('userData')).id).collection('Vouchers').doc(idMenu).update({status : 1}).then(res => {
      MySwal.fire({
        title: 'Voucher disabled',
        text: '',
        icon: 'success',
        customClass: {
          confirmButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
     // dispatch({ type: 'UPDATE_MAILS', emailIds })
  getVouchers()
    }).catch(e => MySwal.fire({
      title: 'Error!',
      text: '',
      icon: 'error',
      customClass: {
        confirmButton: 'btn btn-danger'
      },
      buttonsStyling: false
    }))


  
}
export const UpdateMenu = (title, couponType, typeUse, numberUse, code, startDate, expireDate, minPurchase, discount, typeDiscount, status, listeMenu, idvoucher) => {

 
    return firestore.collection('Restaurants').doc(JSON.parse(localStorage.getItem('userData')).id).collection('Vouchers').doc(idvoucher)
    .update({
      title,
       couponType,
       typeUse,
       numberUse,
       code,
       startDate,
       expireDate,
       minPurchase,
       discount,
       typeDiscount,
       status,
       listeMenu

       }).then(res => {
      MySwal.fire({
        title: 'Vouchers Updates',
        text: '',
        icon: 'success',
        customClass: {
          confirmButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      //dispatch({ type: 'UPDATE_MAILS', emailIds })
 getVouchers()
    }).catch(e => {
       MySwal.fire({
      title: 'Error!',
      text: '',
      icon: 'error',
      customClass: {
        confirmButton: 'btn btn-danger'
      },
      buttonsStyling: false
    }) 
  })
  
}
export const AddMenu = (title, couponType, typeUse, numberUse, code, startDate, expireDate, minPurchase, discount, typeDiscount, status, listeMenu) => {


      const idvoucher = new Date().getTime()
      return firestore.collection('Restaurants').doc("B1vQYtrD70gbL89WHwMrBiigivp1").collection('Vouchers').doc(idvoucher.toString())
      .set({
        title,
         couponType,
         typeUse,
         numberUse,
         code,
         startDate,
         expireDate,
         minPurchase,
         discount,
         typeDiscount,
         status,
         idRestaurant : "iuhrhghg",
         namerestaurant : "rkhfrhf"
  
         }).then(res => {
        MySwal.fire({
          title: 'Vouchers Added',
          text: '',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
       
    
      }).catch(e => {
         MySwal.fire({
        title: 'Error!',
        text: '',
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-danger'
        },
        buttonsStyling: false
      }) 
    })
    
  }