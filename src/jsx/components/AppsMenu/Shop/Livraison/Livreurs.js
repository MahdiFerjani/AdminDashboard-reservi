import Compressor from "compressorjs";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { firestore } from "../../../../../fire";
import { Table } from "react-bootstrap";
import { getLivreurs,addLivreur } from "../../../../store/actions/Livreurs_actions";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { data } from "jquery";
import { preventDefault } from "@fullcalendar/react";



const allInputs = { imgUrl: "" };


const Livreurs = (props) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedID, setselectedID] = useState("");
  const [promoName, setpromoName] = useState("");
  const [expireDate, setexpireDate] = useState("");
  const [stateModal, setStateModal] = useState([]);
  const livreurs = useSelector((state) => state.Livreurs.livreurs);
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [modalShow, setModalShow] = useState(false);
  const [delivery, setDelivery] = useState([]);


  const searchByTerm = (value) => {
    setSearchTerm(value);
  };
  const parentCallback = (childData) =>{
    var array = [...delivery];
      array.push({id:"",
      data:childData})
    setDelivery(array)
  }
  
   const remove = (id,index) => {
    console.log(id);
    firestore
      .collection("DeliveryBoys")
      .doc(id)
      .delete()
      .then(() => {
        toast.success('🦄 deliveryboy deleted!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: 0,
          });
          
          var array = [...delivery]; 
          array.splice(index, 1);
          setDelivery(array)
        
      })
      .catch((error) => {
        
      });
  };

  useEffect(() => {
    dispatch(getLivreurs()).then((e)=>{
      let array=[]
      e.payload.map((data)=>{
        array.push(data)
        
      })
     setDelivery(array)
     console.log(array)
    })
  
    return () => {};
  }, []);

 /* const handleSubmitImage = (e) => {
    e.preventDefault();
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    } else {
      let data = {
        promoName,
        expireDate,
      };
      dispatch(AddPromotions(data, imageAsFile));
    }
  };*/

  const handleImgaeasFile = (e) => {
    const image = e.target.files[0];
    new Compressor(image, {
      quality: 0.6, //
      success: (compressedResult) => {
        setImageAsFile((imageFile) => compressedResult);
      },
    });
  };

  return (
    <>
      {!livreurs ? (
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
                </div>
              </div>
              <button onClick={() => setModalShow(true)} className="input-rounded col-3"> Ajouter Livreur</button>
              <h4 className="card-title">Liste des Livreurs </h4>
            </div>
            <div className="card-body">
              <Table responsive className="w-100">
                <div id="example_wrapper" className="dataTables_wrapper">
                  <table id="example" className="display w-100 dataTable">
                    <thead>
                      <tr role="row">
                        <th>avatar</th>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>adresse</th>
                        <th>N°Forza</th>
                        <th>Status</th>
                        <th>position</th>
                        <th>note</th>
                        <th>permis</th>
                        <th>phoneNumber</th>
                        <th>naissance</th>
                        <th>Region</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {delivery
                        ?.filter((val) => {
                          const term = searchTerm.toLowerCase();
                          const {
                            data: {
                              lastName = "",
                              firstName = "",
                              phoneNumber = "",
                            },
                          } = val;

                          if (term) {
                            return (
                              lastName.toLowerCase().includes(term) ||
                              firstName.toLowerCase().includes(term) ||
                              phoneNumber.includes(term)
                            );
                          }

                          return true;
                        })
                        .map((data,index) => {
                          return (
                            <tr key={index}>
                              <td>{data.data.imageUser}</td>
                              <td>{data.data.lastName}</td>
                              <td>{data.data.firstName}</td>
                              <td>{data.data.adresse}</td>
                              <td>{data.data.NumberForza}</td>
                              <td>{data.data.status}</td>
                              <td>lat={data.data.lat} long={data.data.lng}</td>    
                              <td>{data.data.note}</td>
                              <td>{data.data.permis}</td>
                              <td>{data.data.phoneNumber}</td>
                              <td>{data.data.birthDay}</td>
                              <td>{data.data.deliveryRegion}</td>
                              <td>
                                <div
                                 className="btn btn-danger shadow btn-xs sharp"
                                 onClick={()=>remove(data.id,index)}>
                                 <i className="fa fa-trash"></i>{" "}
                                </div>
                              </td>
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
      )}
       <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        parentCallback = {parentCallback}
      />
    </>
  );
};
const MyVerticallyCenteredModal=(props)=> {
  const moment = require('moment');
  const dispatch = useDispatch();
  const [Data,setData]=useState({
    imageUser:"",
    lastName:"",
    firstName:"",
    CIN:"",
    email:"",
    password:"",
    adresse:"",
    createdAt:moment(new Date()).format("YYYY-MM-DD"),
    NumberForza:"",
    status:0,
    note:"",
    permis:"",
    phoneNumber:"",
    birthDay:"",
    deliveryRegion:""
  })

  const handle=(e)=>{
    const newData ={...Data}
    newData[e.target.id]=e.target.value
    setData(newData)
    console.log(Data)
    
}
const  submit = (e) => {
  e.preventDefault()
dispatch(addLivreur(Data))
props.parentCallback(Data);
props.onHide()


}


  return (
    <>
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Ajouter un Livreur
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form onSubmit={submit}>
      <div class="container">
  <div class="row">
    <div class="col">
    <div className="form-group">
            <input
              value={Data.lastName}
              onChange={e=>handle(e)} 
              type="text"
              id="lastName" 
              className="form-control input-rounded"
              placeholder="Nom"
            />
          </div>
          <div className="form-group ">
            <input
             value={Data.firstName}
             id="firstName" 
             onChange={e=>handle(e)} 
              type="text"
              className="form-control input-rounded"
              placeholder="Prenom"
            />
          </div>
          <div className="form-group ">
            <input
              value={Data.CIN}
              onChange={e=>handle(e)} 
              type="text"
              id="CIN" 
              className="form-control input-rounded"
              placeholder="CIN"
            />
          </div>
          <div className="form-group ">
            <input
                type="text"
                id="email" 
                value={Data.email}
                onChange={e=>handle(e)} 
              className="form-control input-rounded"
              placeholder="email"
            />
          </div>
          <div className="form-group ">
            <input
                type="text"
                id="password" 
                value={Data.password}
                onChange={e=>handle(e)} 
              className="form-control input-rounded"
              placeholder="password"
            />
          </div>
         
          
    </div>
    <div class="col">
    <div className="form-group ">
            <input
                id="phoneNumber" 
                type="text"
                value={Data.phoneNumber}
                onChange={e=>handle(e)} 
                className="form-control input-rounded"
                placeholder="telephone"
            />
          </div>
          <div className="form-group ">
            <input
                type="date"
                id="birthDay" 
                value={Data.birthDay}
                onChange={e=>handle(e)} 
                className="form-control input-rounded"
                placeholder="date naissance"
            />
          </div>
          <div className="form-group ">
            <input
                type="text"
                id="deliveryRegion" 
                value={Data.deliveryRegion}
                onChange={e=>handle(e)} 
                className="form-control input-rounded"
                placeholder="Region de livraison"
            />
          </div>
          <div className="form-group ">
            <input
                type="text"
                id="adresse" 
                value={Data.adresse}
                onChange={e=>handle(e)} 
              className="form-control input-rounded"
              placeholder="adresse"
            />
          </div>
          <div className="form-group ">
            <input
                type="text"
                id="NumberForza" 
                value={Data.NumberForza}
                onChange={e=>handle(e)} 
              className="form-control input-rounded"
              placeholder="Num Forza"
            />
          </div>
          <div className="form-group ">
            <label> permis :</label>
          <select id="permis" onChange={e=>handle(e)}>
            <option selected value="true">Oui</option>
            <option value="false">Non</option>
          </select>
          </div>
    </div>
  </div>
  </div>
  <button className="input-rounded" type="submit">
                  Ajouter
                </button>

  </form> 
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-outline-primary" onClick={props.onHide}>Close</button>
      </Modal.Footer>
    </Modal>
    <ToastContainer
    position="bottom-right"
    autoClose={5000}
    hideProgressBar
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss={false}
    draggable={false}
    pauseOnHover={false}
    />
    </>
  );
}


export default Livreurs;
