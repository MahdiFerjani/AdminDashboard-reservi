import React, { Fragment, useState } from "react";
import { Avatar } from '@material-ui/core';
import PageTitle from "../../../../layouts/PageTitle";
import { Dropdown, Table } from "react-bootstrap";
import { fire } from "../../../../../fire";
import { firestore } from "../../../../../fire";
import { collection, query, where } from "../../../../../fire"; 
import App from "../../../../../App";
import { useDispatch, useSelector } from "react-redux";
export default class Recipe extends React.Component {
   
   state = {
      searchTerm : "",
      Users: []
      
   }
 
   
   constructor(props){
      super(props);   
   }
   searchByTerm = (value) => {
      this.setState({searchTerm : value});

   }
componentDidMount() {
     firestore.collection("Users").get().then((querySnapshot) => {
        let User = []
        querySnapshot.forEach((doc) => {
        User.push({   
        id : doc.id,
        data: doc.data()})
        });
        this.setState({Users : User})
      });  
   }    

       delete = (id) => {
         console.log(id)
         firestore.collection("Users").doc(id).delete().then(() => {
           console.log("Document successfully deleted!");
           this.props.history.push("#")
         }).catch((error) => {console.error("Error removing document: ", error);
         });
      }

 


render() {



      return (
      <Fragment>  
             
        
        <div className="col-12">
        <div className="card">
        <div className="card-header">
        <div className="input-group search-area d-lg-inline-flex d-none mr-5">
                           <input
                              type="text"
                              className="form-control"
                              placeholder="Search here"
                              onChange ={(e) => {
                                 this.searchByTerm(e.target.value);
                               
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
                           </div>  </div>
        <h4 className="card-title">Customer List </h4>
            </div> 
            <div className="card-body">      
            <Table responsive className="w-100">
            <div id="example_wrapper" className="dataTables_wrapper">
            <table id="example" className="display w-100 dataTable">
            <thead>
                           <tr role="row">
                                
                                   
                                    <th>Avatar</th>
                                    <th>Email</th>
                                    <th>Firstname</th>
                                    <th>Lastname</th>
                                    <th>PhoneNumber</th>
                                   
                                    {/* <th className="pl-5 width200">
                                    Billing Address
                                 </th> */}
                                 <th>Action</th>
                              
                              </tr>
                                   
                                 
                              </thead>
                              <tbody>

                                 {this.state.Users.filter((val) => {
  
  const term = this.state.searchTerm.toLowerCase();
  const { data: { email = "", firstname = "" , phonenumber="" } } = val;

  if (term) {
   return (
       
      email.toLowerCase().includes(term) ||
      firstname.toLowerCase().includes(term)||
      phonenumber.includes(term)


    );
  
  }

  return true;

}).map(data => {

                                    return (
                                       <tr>
                                          <td> <Avatar className ="rounded-circle img-fluid" src={data.data.avatar}/> </td>
                                          
                                          <td>{data.data.email}</td>
                                          <td>{data.data.firstname}</td>
                                          <td>{data.data.lastname}</td>
                                          <td>{data.data.phonenumber}</td>
                                            
                                           <td>
                                                         <div
                                                         className="btn btn-danger shadow btn-xs sharp" onClick ={this.delete.bind(this, data.id)}
                                                      >
                                                         <i className="fa fa-trash"></i> </div></td>                
                                     </tr>
                                    );

                                 })}
                              </tbody>
                           </table>
                           </div>
                        </Table>
                     </div>
                  </div>
               </div>
        
         </Fragment>
      );
   };
};




