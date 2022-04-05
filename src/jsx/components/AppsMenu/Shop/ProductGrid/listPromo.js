import Compressor from "compressorjs";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import { firestore } from "../../../../../fire";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  AddPromotions,
  deletePromotions,
  getPromotions,
} from "../../../../store/actions/promotions_actions";
import { banneRestaurants, getAllRestaurants } from "../../../../store/actions/restaurant_actions";
import styles from "./index.css";
import ProductDetail from "./ProductDetail";
const allInputs = { imgUrl: "" };

const card1 = {
  marginLeft: "10px",
  marginTop: "20px",
 
  boxShadow: "0 7px 10px 0 rgba(0, 0, 0, 0.329)",
  width: "200px",
  height: "350px",
  textAlign: "center",
  borderRadius: "5px",
  display: "inline-block",
  backgroundColor: "#ffffff",
};
const card2 = {
  
   marginTop: "10px",
   marginBottom: "20px",
   boxShadow: "0 7px 10px 0 rgba(0, 0, 0, 0.329)",
   width: "225px",
   maxHeight: "800px",
    overflowY: "auto",
   borderRadius: "5px",
   display: "inline-block",
   backgroundColor:"#f5f5f5",
 };
const img = {
  borderRadius: "12px",
  width: "90%",
  height: "180px",
};

const PromoList = (props) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  
  const [RestaurantID, setRestaurantID] = useState("");
  const [selectedID, setselectedID] = useState("");
  const [promoName, setpromoName] = useState("");
  const [expireDate, setexpireDate] = useState("");
  const [stateModal, setStateModal] = useState(false);
  const { promotions } = useSelector((state) => state.Promotions);
  const { restaurants } = useSelector((state) => state.Restaurants);
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [Modalshow, setModalshow] = useState(false)

  const deletePromotion = () => {
    setStateModal(false);
    dispatch(deletePromotions(selectedID));
    setTimeout(() => {
      dispatch(getPromotions());
    }, 2000);
  };
  const searchByTerm = (value) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    dispatch(getPromotions());
    dispatch(getAllRestaurants())
  }, []);

  const handleSubmitImage = (e) => {
    e.preventDefault();
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    } else {
      let data = {
        RestaurantID,
        promoName,
        expireDate,

      };
      dispatch(AddPromotions(data, imageAsFile));
    }
  };

  const handleImgaeasFile = (e) => {
    const image = e.target.files[0];
    new Compressor(image, {
      quality: 0.6, // 0.6 can also be used, but its not recommended to go below.
      success: (compressedResult) => {
        setImageAsFile((imageFile) => compressedResult);
      },
    });
  };
  return (
    <Fragment>
      <div className="input-group search-area d-lg-inline-flex d-none mr-5">
        <input
          type="text"
          className="form-control"
          placeholder="Search here"
          onChange={(e) => {
            setSearchTerm(e.target.value);
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
      </div>{" "}
      <br></br>
      <br></br>
      <div>
      
      </div>
      
        <div className="row">
          <div className="col-sm-9 ">
            {promotions?.map((data, index) => {
              return (
        
                <div style={card1} key={index}>
                  <img style={img} src={data.promoImage} />

                  <div className="new-arrival-content text-center mt-3">
                    <div key={data.id}>
                      <h2>
                        <Link to={`/restaurant-detail/${data.id}`}>
                          {data.promoName}
                        </Link>
                      </h2>{" "}
                    </div>

                    <span className="email">{data.expireDate}</span>
                    <br></br>

                    <br></br>
                    <br></br>
                    <div
                      className="btn btn-danger shadow btn-xs sharp"
                      onClick={() => {
                        setStateModal(true);
                        setselectedID(data.id);
                      }}
                    >
                      <i className="fa fa-trash"></i>{" "}
                    </div>
                  </div>
                </div>                
                
              );
            })}
          </div>
          <div ClassName="col-sm-3">
             <div style={card2}>
             {restaurants?.map((data, index) => {
                return(
                <div style={card1}>
                   <img  style={img} src={data.data.avatar} />
                   <h2>
                        <Link to={`/restaurant-detail/${data.id}`}>
                          {data.data.name_restaurant}
                        </Link>
                      </h2>{" "}
                      <span className="email">{data.data.email}</span>
                     <br></br>
                     <span className="phone">{data.data.phone_number}</span>
                     <br></br>
                     <br></br>
                     <div
                      className="btn btn-danger shadow btn-xs sharp"
                      onClick={() => {
                        setModalshow(true);
                        setRestaurantID(data.id);
                      }}
                    >
                      <i className="fa fa-plus"></i>{" "}
                    </div>
                   </div>)})}

             </div>
          </div>
        </div>
        
      
      <Modal className="fade" show={stateModal}>
        <Modal.Header>
          <Modal.Title>Supprimer promotion</Modal.Title>
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
            onClick={() => {
              setStateModal(false);
            }}
            variant="danger light"
          >
            Close
          </Button>
          <Button onClick={() => deletePromotion()} variant="primary">
            Accepter
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal className="fade" show={Modalshow}>
        <Modal.Header>
          <Modal.Title>Ajouter promotion</Modal.Title>
          <Button
            variant=""
            className="close"
            onClick={() => setModalshow(false)}
          >
            <span>&times;</span>
          </Button>
        </Modal.Header>
        <Modal.Body>
        <form >
          <div className="form-group col">
            <input
              value={promoName}
              onChange={(value) => setpromoName(value.target.value)}
              type="text"
              className="form-control input-rounded"
              placeholder="Name Promo"
            />
          </div>
          <div className="form-group col">
            <input
              value={expireDate}
              onChange={(value) => setexpireDate(value.target.value)}
              type="date"
              className="form-control input-rounded"
              placeholder="expiry date"
            />
          </div>
          <div className="form-group col">
            <input
              type="file"
              onChange={handleImgaeasFile}
              className="form-control input-rounded"
            />
          </div>
        </form> </Modal.Body>
        <Modal.Footer>
        <button  onClick={(e)=>{handleSubmitImage(e);setModalshow(false)}}  className="input-rounded col">Ajouter Promotion</button>
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
    </Fragment>
  );
};

export default PromoList;
