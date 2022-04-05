import React , { Component } from "react";
import { firestore } from "../../../fire";
import {connect} from 'react-redux'
import { Link} from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { getNewRestaurants } from "../../store/actions/restaurant_actions";
import { etatVue} from "../../store/actions/nortifications_actions";
import Notifications from './Notifications';
import moment  from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import { Route } from 'react-router-dom'
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Image
import profile from "../../../images/profile/17.jpg";
import avatar from "../../../images/avatar/1.jpg";
import { fire } from "../../../fire";
import { compose } from "redux";
import { alert } from "../../store/actions/nortifications_actions";
import { differenceInDays } from "date-fns/esm";
import { allOrdersFornotif  } from "../../store/actions/restaurants_actions";


class Header extends Component {
   state = {
      notifications: [],
      newRestaurants:[]
   }
    
   convert(d){
const date1 = new Date(d);
const date2 = new Date();
const diffTime = Math.abs(date2 - date1);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
const diffHours =Math.ceil(diffTime)/(1000*60*60)
const diffMin =Math.ceil(diffTime)/(1000*60)
if(diffDays>1)
 return diffDays+"j"
else if(diffHours>1)
return Math.trunc(diffHours)+"h"
else 
return diffMin+"min"

   }
    activate(id){
      firestore.collection("Notifications").doc(id).update({etatVue:0})
      
  
   }
getData(){
   firestore.collection("Notifications").get().then((querySnapshot) => {
      let notifications = []
      querySnapshot.forEach((doc) => {
      notifications.push({   
      id : doc.id,
      data: doc.data()})
      });
      this.setState({notifications : notifications})
    }); 
}

   
  componentDidMount = () => {
     this.getData()
   
this.props.dispatch(getNewRestaurants())
this.props.dispatch(allOrdersFornotif())
//this.props.dispatch(OrdersUpdate())

   }
  
   render () {
      console.log(this.state.notifications)

     

   return (
      <>
      <div className="header">
         <div className="header-content">
            <nav className="navbar navbar-expand">
               <div className="collapse navbar-collapse justify-content-between">
                  <div className="header-left">
                  </div>
                  <ul className="navbar-nav header-right">
                     <li className="nav-item">
                        <div className="input-group search-area d-lg-inline-flex d-none mr-5">
                           <input
                              type="text"
                              className="form-control"
                              placeholder="Search here"
                           />
                           <div className="input-group-append">
                              <span className="input-group-text">
                                 <svg
                                    width={20}
                                    height={20}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <path
                                       d="M23.7871 22.7761L17.9548 16.9437C19.5193 15.145 20.4665 12.7982 20.4665 10.2333C20.4665 4.58714 15.8741 0 10.2333 0C4.58714 0 0 4.59246 0 10.2333C0 15.8741 4.59246 20.4665 10.2333 20.4665C12.7982 20.4665 15.145 19.5193 16.9437 17.9548L22.7761 23.7871C22.9144 23.9255 23.1007 24 23.2816 24C23.4625 24 23.6488 23.9308 23.7871 23.7871C24.0639 23.5104 24.0639 23.0528 23.7871 22.7761ZM1.43149 10.2333C1.43149 5.38004 5.38004 1.43681 10.2279 1.43681C15.0812 1.43681 19.0244 5.38537 19.0244 10.2333C19.0244 15.0812 15.0812 19.035 10.2279 19.035C5.38004 19.035 1.43149 15.0865 1.43149 10.2333Z"
                                       fill="#A4A4A4"
                                    />
                                 </svg>
                              </span>
                           </div>
                        </div>
                     </li>
                     <li className="nav-item dropdown notification_dropdown">
                    
                     <Link
                           className="nav-link  ai-icon"
                           to="#"
                           role="button"
                           data-toggle="dropdown"
                           onClick={() => {this.props.onNotification();this.getData()}}>
                           <svg
                              width={28}
                              height={28}
                              viewBox="0 0 30 30"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                           >
                             
                              <path
                                 d="M22.75 15.8385V13.0463C22.7471 10.8855 21.9385 8.80353 20.4821 7.20735C19.0258 5.61116 17.0264 4.61555 14.875 4.41516V2.625C14.875 2.39294 14.7828 2.17038 14.6187 2.00628C14.4546 1.84219 14.2321 1.75 14 1.75C13.7679 1.75 13.5454 1.84219 13.3813 2.00628C13.2172 2.17038 13.125 2.39294 13.125 2.625V4.41534C10.9736 4.61572 8.97429 5.61131 7.51794 7.20746C6.06159 8.80361 5.25291 10.8855 5.25 13.0463V15.8383C4.26257 16.0412 3.37529 16.5784 2.73774 17.3593C2.10019 18.1401 1.75134 19.1169 1.75 20.125C1.75076 20.821 2.02757 21.4882 2.51969 21.9803C3.01181 22.4724 3.67904 22.7492 4.375 22.75H9.71346C9.91521 23.738 10.452 24.6259 11.2331 25.2636C12.0142 25.9013 12.9916 26.2497 14 26.2497C15.0084 26.2497 15.9858 25.9013 16.7669 25.2636C17.548 24.6259 18.0848 23.738 18.2865 22.75H23.625C24.321 22.7492 24.9882 22.4724 25.4803 21.9803C25.9724 21.4882 26.2492 20.821 26.25 20.125C26.2486 19.117 25.8998 18.1402 25.2622 17.3594C24.6247 16.5786 23.7374 16.0414 22.75 15.8385ZM7 13.0463C7.00232 11.2113 7.73226 9.45223 9.02974 8.15474C10.3272 6.85726 12.0863 6.12732 13.9212 6.125H14.0788C15.9137 6.12732 17.6728 6.85726 18.9703 8.15474C20.2677 9.45223 20.9977 11.2113 21 13.0463V15.75H7V13.0463ZM14 24.5C13.4589 24.4983 12.9316 24.3292 12.4905 24.0159C12.0493 23.7026 11.716 23.2604 11.5363 22.75H16.4637C16.284 23.2604 15.9507 23.7026 15.5095 24.0159C15.0684 24.3292 14.5411 24.4983 14 24.5ZM23.625 21H4.375C4.14298 20.9999 3.9205 20.9076 3.75644 20.7436C3.59237 20.5795 3.50014 20.357 3.5 20.125C3.50076 19.429 3.77757 18.7618 4.26969 18.2697C4.76181 17.7776 5.42904 17.5008 6.125 17.5H21.875C22.571 17.5008 23.2382 17.7776 23.7303 18.2697C24.2224 18.7618 24.4992 19.429 24.5 20.125C24.4999 20.357 24.4076 20.5795 24.2436 20.7436C24.0795 20.9076 23.857 20.9999 23.625 21Z"
                                 fill="#555555"
                              />
                           </svg>
                           <span className="badge light text-white bg-primary">
                              
                           </span>
                        </Link>
                    
                        <div
                           className={`dropdown-menu dropdown-menu-right ${
                              this.props.onNotification=== "notification" ? "show" : ""
                           }`}
                        >
                           <PerfectScrollbar
                              id="DZ_W_Notification1"
                              className={` widget-media dz-scroll p-3 height380 ${
                                 this.props.toggle === "notification"
                                    ? "ps ps--active-y"
                                    : ""
                              }`}
                           >
                             
                              <div className="timeline">
                              {this.props.Restaurants?.map(e =>{
                                 
                                 return (
                                    
                                   <div>
                                    {(e.data.isNew)?
                                    (
                                     <li>
                                       <span className="pink-text" style={{color:"#f21395"}}>{e.data.name_restaurant}</span>
                                       <br/>
                                       <span> nouveau Restaurant</span>
                                   </li>  ):(
                                   <area/>)}
                                 </div>
                                 )
                                   })}
                              {this.state.notifications?.map(data =>{
                                 
                              return (
                                 
                                
                                 <div>
                                     {(data.data.message.includes("accepted")&&data.data.etatVue=="1"
                                     )?(
                                 <li>
                                 
                                 <span  onClick={()=>this.activate(data.id)} className="pink-text" style={{color:"#f21395"}}>{data.data.nameRestaurant}</span>
                                 <span className="pink-text" style={{marginLeft:"190px" , fontSize: "0.6em"}}>il ya {this.convert(data.data.date)} </span>
                                 <br/>
                                 <span onClick={()=>this.activate(data.id)}>{data.data.message}</span>
                                 
                             </li>  ):(
                             <area/>)}
                             </div>
                             );
                             })}

                              </div>
                              <Link className="all-notification" to="/demandesresto">
                              See all notifications{" "}
                              <i className="ti-arrow-right" />
                           </Link>
                           </PerfectScrollbar>
                           </div>
                     </li>
                     
                     <li className="nav-item dropdown notification_dropdown" >
                        <Link
                           className ="handleLogout"
                           to ="/"
                           onClick={() => handlelogout()}>

                           <i className="fa fa-sign-out" style={{fontSize:"18px"}} width={40}
                              height={28}
                              viewBox="0 0 28 28"
                              fill="none" >
                           </i>

                        </Link>
                     </li>
                  </ul>
               </div>
            </nav>
         </div>
      </div>
       <ToastContainer
       position="bottom-right"
       autoClose={false}
       hideProgressBar
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss={false}
       draggable={false}
       pauseOnHover={false}
       onClick={() =>{this.props.history.push('/orders') }}
       />
       </>
   );
};}
const handlelogout = () =>{
   fire.auth().signOut();
};  

const mapStateToProps = (state) => {
   console.log(state)
   return {
      
      Restaurants : state.Restaurants.restaurants
   }
}

export default withRouter(compose(
   connect(mapStateToProps),
  )(Header))

