import React, { Fragment, useEffect, useState } from "react";
import { firestore } from "../../../../../fire";
import { Link ,Route} from "react-router-dom";
import ProductDetail from "./ProductDetail";
import { banneRestaurants } from "../../../../store/actions/restaurant_actions";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Switch from '@mui/material/Switch';


 const Restaurants = (props) => {
   const dispatch = useDispatch()
   const [searchTerm, setSearchTerm] = useState("")
   const [Restaurant, setRestaurants] = useState([])
   const [selectedID, setselectedID] = useState("")
   const [stateModal, setStateModal] = useState(false)
   const [checked, setChecked] = React.useState();

  const handlechange = (event,e) => {
   //.collection('Restaurants').doc(e.target.id).get().then((k)=>{
    firestore.collection("Restaurants").doc(event.target.id).update({adminmanger:e})
   //})
   
   
  };

 
const searchByTerm = (value) => {
   setSearchTerm(value)
   

}
const activateRestaurant = (stateBanne) => {
   dispatch(banneRestaurants(selectedID, stateBanne))
   setStateModal(false)
      }
      useEffect(() => {
        
         firestore.collection("Restaurants").where("status", "==", true).get().then((querySnapshot) => {
            let Rest = []
            querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().lastn}`);
            Rest.push({   
            id : doc.id,
            data: doc.data()})
            });
            setRestaurants(Rest)
           
          });  
      }, [])
  
    
   

      return (
      <Fragment>  
          <div className="input-group search-area d-lg-inline-flex d-none mr-5">
                           <input
                              type="text"
                              className="form-control"
                              placeholder="Search here"
                              onChange ={(e) => {
                                 setSearchTerm(e.target.value);
                               
                           }}
                           
                               /> 

                           
                           <div className="input-group-append">
                              <span className="input-group-text" 
                              >
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
                           </div>  </div> <br></br><br></br>
             
         <div className="row">
            {Restaurant.filter((val) => {
  
  const term = searchTerm.toLowerCase();
  const { data: { email = "", name_restaurant = "" } } = val;

  if (term) {
   return (
       
      email.toLowerCase().includes(term) ||
      name_restaurant.toLowerCase().includes(term)
    );
  
  }

  return true;

}).map(data => { 
   return (
      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
         <div className="card">
            <div className="card-body">
               <div className="new-arrival-product">
                  <div className="new-arrivals-img-contnent">
                     <img className="img-fluid"   style={{width:280,height:210}} src={data.data.avatar} />
                  </div>
                  <div className="new-arrival-content text-center mt-3">
                  <div key={data.id}>
                <h2>
                <Route
                   exact
                   path="/ProductDetail/"
                   render={({ match }) => (
                <ProductDetail item={data.find((data) => String(data.id) === String(match.params.id))} />
                                   )}
/>
               <Link to={`/restaurant-detail/${data.id}`}>{data.data.name_restaurant}</Link>

                    {/* <Link to={`restaurant-detail/${data.id}`}>{data.data.name_restaurant}</Link>  */}
                        {/* <Link to={{pathname:`/:productId/${data.id}`,
                        productdetailProps: {
                        productdetail: "I M passed From Props"
                       }}} >{data.data.name_restaurant}</Link>  */}

               {/* <Link to={`/detail/${data.id}`}>{data.data.name_restaurant}</Link> */}
    
                     </h2> </div>
                     {/* <span class="star-rating mb-2 d-flex">{data.data.review}</span> */}
              
                     <span className="email">{data.data.email}</span>
                     <br></br>
                     <span className="phone">{data.data.phone_number}</span>
                    
                     <br></br>
                     <br></br>
                     <div
                                                         className="btn btn-danger shadow btn-xs sharp" onClick 
                                                      >
                                                         <i className="fa fa-trash"></i> </div>
                                                         <div
                                                         className="btn btn-danger shadow btn-xs sharp" 
                                                      >
                                                         <i className="fa fa-ban" onClick={() => {
                                                            setStateModal(true);
                                                            setselectedID(data.id)
                                                          
      
                                                         }}></i>
                                                        
                                                         
                                                          </div>
                                                          <br></br>
                                                          
                                                          <div> 
                                                             <Switch 
                                                                      defaultChecked={data.data.adminmanger}
                                                                      id={data.id}
                                                                      onChange={(e)=>{
                                                                        
                                                                         handlechange(e,e.nativeEvent.target.checked)}
                                                                        }
                                                            /></div>
                                                            </div>
               </div>
            </div>
         </div>
      </div>
   );

                                    
        
      
    } )
}
</div>
<Modal className="fade" show={stateModal}>
                           <Modal.Header>
                              <Modal.Title>Banné restaurant</Modal.Title>
                              <Button
                                 variant=""
                                 className="close"
                                 onClick={() => setStateModal(false)}
                              >
                                 <span>&times;</span>
                              </Button>
                           </Modal.Header>
                           <Modal.Body>Voulez vous confirmé </Modal.Body>
                           <Modal.Footer>
                              <Button
                                 onClick={() => setStateModal(false)}
                                 variant="danger light"
                              >
                                 Close
                              </Button>
                              <Button   onClick={() => activateRestaurant(false)} variant="primary">Accepter</Button>
                           </Modal.Footer>
                        </Modal>

</Fragment>
      );
 
}; 

export default Restaurants;
