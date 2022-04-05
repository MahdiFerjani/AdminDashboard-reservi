import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link ,Route} from "react-router-dom";
import { firestore } from "../../../fire";
import { getNewRestaurants, activateRestaurants } from "../../store/actions/restaurant_actions";
import ProductDetail from "../AppsMenu/Shop/ProductGrid/ProductDetail";
import { Row, Card, Col, Button, Modal, Container } from "react-bootstrap";
import { Avatar } from '@material-ui/core';

import { Dropdown, Table } from "react-bootstrap";


const DemandesRestaurants = (props) => {
   const [searchTerm, setSearchTerm] = useState("")
   const [stateModal, setstateModal] = useState(false)
   const [selectedID, setselectedID] = useState("")

const dispatch = useDispatch()
const {restaurants} = useSelector(state => state.Restaurants)
console.log(restaurants)
const searchByTerm = (value) => {
   setSearchTerm(value);

}
   useEffect(() => {
dispatch(getNewRestaurants())
      return () => {
      
      }
   }, [])
    
   const activateRestaurant = () => {
      dispatch(activateRestaurants(selectedID))
      setstateModal(false)
         }
      

      return (
      <Fragment>  
          <div className="input-group search-area d-lg-inline-flex d-none mr-5">
                           <input
                              type="text"
                              className="form-control"
                              placeholder="Search here"
                              onChange ={(e) => {
                               searchByTerm(e.target.value);
                               
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
             
<div className="card-body">      
            <Table responsive className="w-100">
            <div id="example_wrapper" className="dataTables_wrapper">
            <table id="example" className="display w-100 dataTable">
            <thead>
                           <tr role="row">
                                
                                   
                                    <th>Avatar</th>
                                    <th>Email</th>
                                    <th>Nom restaurant</th>
                                    <th>date creation</th>
                                    <th>Numero tel</th>
                                   
                                    {/* <th className="pl-5 width200">
                                    Billing Address
                                 </th> */}
                                 <th>Action</th>
                              
                              </tr>
                                   
                                 
                              </thead>
                              <tbody>

                                 {restaurants !== undefined ? restaurants.filter((val) => {
  
  const term = searchTerm.toLowerCase();
  const { data: { email = "", name_restaurant = "" , phone_number="" } } = val;

  if (term) {
   return (
       
      email.toLowerCase().includes(term) ||
      name_restaurant.toLowerCase().includes(term)||
      phone_number.includes(term)


    );
  
  }

  return true;

}).map(data => {
      return (
                                       <tr>
                                          <td> <Avatar className ="rounded-circle img-fluid" src={data.data.avatar}/> </td>
                                          
                                          <td>{data.data.email}</td>
                                          <td>{data.data.name_restaurant}</td>
                                          <td>{data.data.name_restaurant}</td>
                                          <td>{data.data.phone_number}</td>
                                            
                                           <td>
                                                         <div
                                                         className="btn btn-danger shadow btn-xs sharp" 
                                                      >
                                                         <i className="fa fa-check" onClick={() => {
                                                            setstateModal(true)
setselectedID(data.id)
                                                         }}></i> </div></td>                
                                     </tr>
                                    );

                                 }) : null }
                              </tbody>
                           </table>
                           </div>
                        </Table>
                     </div>
                     <Modal className="fade" show={stateModal}>
                           <Modal.Header>
                              <Modal.Title>Activation Restaurant</Modal.Title>
                              <Button
                                 variant=""
                                 className="close"
                                 onClick={() => setstateModal(false)}
                              >
                                 <span>&times;</span>
                              </Button>
                           </Modal.Header>
                           <Modal.Body>Voulez vous confirmé </Modal.Body>
                           <Modal.Footer>
                              <Button
                                 onClick={() => setstateModal(false)}
                                 variant="danger light"
                              >
                                 Close
                              </Button>
                              <Button   onClick={() => activateRestaurant()} variant="primary">Accepter</Button>
                           </Modal.Footer>
                        </Modal>

</Fragment>
      );
   };


export default DemandesRestaurants
