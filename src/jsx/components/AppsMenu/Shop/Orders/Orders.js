import React, { Fragment, useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import PageTitle from "../../../../layouts/PageTitle";
import { Dropdown, Table } from "react-bootstrap";
import { fire } from "../../../../../fire";
import { firestore } from "../../../../../fire";
import { collection, query, where } from "../../../../../fire";
import App from "../../../../../App";
import { useDispatch, useSelector } from "react-redux";
import { allOrders } from "../../../../store/actions/restaurants_actions";
import { User } from "react-feather";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { DATA_LOADING } from "../../../../store/types";
import "./Orders.css";
import { Clock, ThumbsUp } from "react-feather";
import { getLivreurs,AffectOrders} from "../../../../store/actions/Livreurs_actions";
import { Button, Modal } from "react-bootstrap";
import { ready } from "jquery";
import InvoicePreview from './Orderpreview'
const Orders = () => {
   const moment = require('moment');
  const [searchTerm, setsearchTerm] = useState("0");

  const Order = useSelector((state) => state.Orders.Orders);
  const loading = useSelector((state) => state.Orders.loading);
  const livreurs = useSelector((state) => state.Livreurs.livreurs);
  const [filterEtat, setfilterEtat] = useState(1);
  const [selectedOrder, setselectedOrder] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [filterType, setfilterType] = useState("on delivery");
  const [stateModal, setStateModal] = useState(false);
  const [livreurID,setlivreurID]=useState();
  const [Token,setToken]=useState();
  const [numberOrder,setNumberOrder]=useState(0);
  const [Total,setTotal]=useState(0);
  const [fraislivraison,setFraislivraison]=useState(0);
  
  const [Tokenrestaurant,setTokenrestaurant]=useState();
  const [show2, setShow2] = useState(false);
  const [affectedOrder,setaffectedOrder]=useState(
   {
      orderID : "",
      userID : "",
      restaurantID : "",
      orderState : "",
      userAffected : "",
      typeUserAffected : "Admin",
      dateAffectation : moment(new Date()).format("DD/MM/YYYY hh:mm")
    }
  )
  const dispatch = useDispatch();
  const searchByTerm = (value) => {
    setsearchTerm(value);
  };

  const remove = (id) => {
    firestore
      .collection("Orders")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };
  const  submit = (e) => {
   e.preventDefault()
 dispatch(AffectOrders(livreurID,affectedOrder,Token,Tokenrestaurant,numberOrder,Total,fraislivraison))
 dispatch((allOrders()))
 }

  useEffect(() => {
    dispatch({ type: DATA_LOADING });
    dispatch(getLivreurs())
    dispatch(allOrders())
    console.log(filterEtat);
  
    return () => {};
  }, []);

  return (
    <>
      {loading == true ? (
        <div className="col-xl-12 col-xxl-12">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Box sx={{ width: 300 }}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
          </div>
        </div>
      ) : (
        <>
          <div className="container">
            <div className="main__cardds  row">
              <div
                className={filterEtat == "0" ? "carddf col" : "cardd col"}
                onClick={() => setfilterEtat(0)}
              >
                <i
                  class="fa fa-clock-o  aria-hidden=true fa-2x text-red"
                  aria-hidden="true"
                ></i>
                <div className="cardd_inner container">
                  <p className="text-primary-p"> pending </p>
                  <span className="font-bold text-title">{Order.filter(res => res.data.Etat === 0).length}</span>
                </div>
              </div>

              <div
                className={filterEtat == "1" ? "carddf col" : "cardd col"}
                onClick={(e) => {
                  setfilterEtat(1);
                }}
              >
                <i
                  class="fa fa-check-circle  aria-hidden=true fa-2x text-green"
                  aria-hidden="true"
                ></i>
                <div className="cardd_inner container">
                  <p className="text-primary-p"> Accepted</p>
                  <span className="font-bold text-title">{Order.filter(res => res.data.Etat === 1).length}</span>
                </div>
              </div>

              <div
                className={filterEtat == "3" ? "carddf col" : "cardd col"}
                onClick={() => setfilterEtat(3)}
              >
                <i class="fa fa-truck aria-hidden=true fa-2x text-red"></i>
                <div className="cardd_inner container">
                  <p className="text-primary-p">Out for delivery</p>
                  <span className="font-bold text-title">{Order.filter(res => res.data.Etat === 3).length}</span>
                </div>
              </div>
              <div
                className={filterEtat == "2" ? "carddf col" : "cardd col"}
                onClick={() => setfilterEtat(2)}
              >
                <i class="fa fa-spinner aria-hidden=true fa-2x text-blue"></i>
                <div className="cardd_inner container">
                  <p className="text-primary-p">In progress</p>
                  <span className="font-bold text-title">{Order.filter(res => res.data.Etat === 2).length}</span>
                </div>
              </div>
              <div
                className={filterEtat == "8" ? "carddf col" : "cardd col"}
                onClick={() => setfilterEtat(8)}
              >
                <i class="fa fa-motorcycle aria-hidden=true fa-2x text-red"></i>
                <div className="cardd_inner container">
                  <p className="text-primary-p">Ready to deliver</p>
                  <span className="font-bold text-title">{Order.filter(res => res.data.Etat === 8).length}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <div className="input-group search-area d-lg-inline-flex d-none mr-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search here"
                    onChange={(e) => {
                      searchByTerm(e.target.value);
                    }}
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
                  </div>{" "}
                </div>

                <div
                  class="btn-toolbar  justify-content-center"
                  role="toolbar"
                  aria-label="Toolbar with button groups"
                >
                  <div class="btn-group mr-2">
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={() => setfilterType("on delivery")}
                    >
                      On Delivery
                    </button>
                  </div>
                  <div class="btn-group mr-2">
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={() => setfilterType("on site")}
                    >
                      On Site
                    </button>
                  </div> 
                  <div class="btn-group mr-2">
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={() => setfilterType("to take")}
                    >
                      To Take{" "}
                    </button>
                  </div>
                </div>

                <h4 className="card-title">Order List </h4>
              </div>

              <div className="card-body">
                <Table responsive className="w-100">
                  <div id="example_wrapper" className="dataTables_wrapper">
                    <table id="example" className="display w-100 dataTable">
                      <thead>
                        <tr role="row">
                          <th>User</th>
                          <th>Statut</th>
                          <th>Restaurant</th>
                          <th>typeOrder</th>
                          <th>Téléphone</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Order.filter(
                          (e) =>
                            e.data.Etat == filterEtat &&
                            e.data.typeOrder == filterType
                        ).map((data) => { 
                          return (
                            <tr>
                              <td>{data.user.firstname}</td>
                              {(data.data.Etat==0)&&
                               <td><span class="badge badge-pill badge-warning">Pending</span></td>
                              }
                               {(data.data.Etat==1)&&
                               <td><span class="badge badge-pill badge-success">Accepted</span></td>
                              }
                              {(data.data.Etat==2)&&
                               <td><span class="badge badge-pill badge-secondary">inProgress</span></td>
                              }
                              {(data.data.Etat==3)&&
                               <td><span class="badge badge-pill badge-info">Ready</span></td>
                              }
                                {(data.data.Etat==8)&&
                               <td><span class="badge badge-pill badge-danger">Out for Delivery</span></td>
                              }
                              <td>{data.restaurant.name_restaurant}</td>
                              <td>{data.data.typeOrder}</td>
                              <td>{data.user.phonenumber}</td>
                              {filterEtat == "0" ? (
                                <>
                                  <td>
                                    <div
                                      className="btn btn-danger shadow btn-xs sharp"
                                      onClick={remove.bind(this, data.id)}
                                    >
                                      <i className="fa fa-trash"></i>
                                    </div>

                                    <div
                                      className="btn btn-info shadow btn-xs sharp"
                                       onClick={() => {setStateModal(true);
                                        setFraislivraison(data.data.fraisLivraison)
                                        setTotal(data.data.Total)
                                        setNumberOrder(data.restaurant.numberorder)
                                        setTokenrestaurant(data.restaurant.token)
                                        setaffectedOrder({ orderID : data.id,
                                                                                     userID : data.data.idUser,
                                                                                     restaurantID : data.data.idRestaurant,
                                                                                     orderState : 1,
                                                                                     userAffected : data.data.idRestaurant,
                                                                                     typeUserAffected : "Admin",
                                                                                     dateAffectation : moment(new Date()).format("DD/MM/YYYY hh:mm")
                                                                                    })}}
                                     >
                                      <i className="fa fa-check"></i>{" "}
                                    </div>
                                    <div
                                    className="btn btn-light shadow btn-xs sharp"
                                    onClick={() => {
                                      setselectedOrder(data)
                                      setShow2(true)
                                    }}
                                  >
                                    <i className="fa fa-eye"></i>{" "}
                                  </div>
                                  </td>{" "}
                                </>
                              ) : (
                                <td>
                                  <div
                                    className="btn btn-danger shadow btn-xs sharp"
                                    onClick={remove.bind(this, data.id)}
                                  >
                                    <i className="fa fa-trash"></i>{" "}
                                  </div>
                                  <div
                                    className="btn btn-light shadow btn-xs sharp"
                                    onClick={() => {
                                      setselectedOrder(data)
                                      setShow2(true)
                                    }}
                                  >
                                    <i className="fa fa-eye"></i>{" "}
                                  </div>
                                </td>
                              )}
                            </tr>
                          );
                        })}
                      </tbody>
      <Modal  size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
     show={stateModal}
     onHide={() => setStateModal(false)}>
      <Modal.Header closeButton>
          <Modal.Title>Accepté La commande</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           
        <Table responsive className="w-100">
                  <div id="example_wrapper" className="dataTables_wrapper">
                    <table id="example" className="display w-100 dataTable">
                      <thead>
                        <tr role="row">
                          <th>Nom</th>
                          <th>Prenom</th>
                          <th>Numero</th>
                          <th>Region</th>
                           <th>choisir</th>
                        </tr>
                      </thead>
                      <tbody>
                         {livreurs.map((data)=>{
                            return(
                         <tr>
                              <td>{data.data.lastName}</td>
                              <td>{data.data.firstName}</td>
                              <td>{data.data.phoneNumber}</td>
                              <td>{data.data.deliveryRegion}</td>
                              <td> <Button variant="primary" onClick={()=>{
                                handleShow();
                                setlivreurID(data.id)
                                setToken(data.data.token)}}>Affecter
        
      </Button></td>
                              </tr>
                         )})}
                      </tbody>
                      </table>
                      </div>
                      </Table>
                      
        </Modal.Body>
        <Modal.Footer>
    
        </Modal.Footer>
      </Modal>
                    </table>
                  </div>
                </Table>
              </div>
            </div>
            <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Step final</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to affect this order!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e)=>{handleClose();submit(e);setStateModal(false)}}>
            i'm sure Done
          </Button>
        </Modal.Footer>
      </Modal>
          </div>
          <>
     
      <Modal size="xl"  show={show2} onHide={() => setShow2(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Details Commande</Modal.Title>
        </Modal.Header>
        <Modal.Body>
<InvoicePreview data={selectedOrder}></InvoicePreview>

        </Modal.Body>
      </Modal>
    </>
        </>
      )}
    </>
  );
};

export default Orders;
