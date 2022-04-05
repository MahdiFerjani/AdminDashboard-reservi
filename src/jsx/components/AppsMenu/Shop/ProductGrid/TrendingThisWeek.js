/*import React, { Fragment, useState } from "react";
import { firestore } from "../../../../../fire";
import { Link ,Route} from "react-router-dom";
import ProductDetail from "./ProductDetail";
import { getTRENDING } from "../../../../store/actions/trendingThisWeek_actions";
import { connect } from "react-redux";

import TableDndApp from "./DraggableTableTrending";
import { bindActionCreators } from "@reduxjs/toolkit";
class TrendingThisWeek extends React.Component {

   state = {
      searchTerm : "",
      statetes : "",
      Restaurants: [],
       Most:  []
      
   }
   
   constructor(props){
      super(props);   
   }

searchByTerm = (value) => {
   this.setState({searchTerm : value});

}
deleteresto = (value) => {

let dataCopy = this.state.Most
dataCopy.splice(dataCopy.findIndex(res => res.id === value), 1 )
this.setState({Most : dataCopy})
}
setresto = (value) => {


   this.setState({Most : value})
   }
   componentDidMount() {
      this.props.getTRENDING().then((res) => {
      
         this.setState({Most : this.props.TrendingWeek})
    
      })
       
      firestore.collection("Restaurants").get().then((querySnapshot) => {
         let Rest = []
         querySnapshot.forEach((doc) => {
         console.log(`${doc.id} => ${doc.data().lastn}`);
         Rest.push({   
         id : doc.id,
         data: doc.data()})
         });
         
         this.setState({Restaurants : Rest.sort((a,b) => (a.data.review/a.data.numberReview) < (b.data.review/b.data.numberReview) )})
       });  
    }
    render() {
      return (
      <Fragment>  
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
                           </div>  </div> <br></br><br></br>
             
       <div className="row">
            {this.state.Restaurants.map(data => { 
   return (
      <div className="col-xl-3 ">
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

                    
    
                     </h2> </div>
                    

                     <span className="email">{data.data.email}</span>
                     <span className="email">{data.data?.review/data.data?.numberReview ? data.data?.review/data.data?.numberReview : 0}</span>
                     <br></br>
                     <span className="phone">{data.data.phone_number}</span>
                     <button
                                                          onClick ={() => {
                                                             let MostCopy = this.state.Most;
                                                    
                                                          if(MostCopy.findIndex(res => res.id === data.id) === -1 ){
                                                             MostCopy.push({name_restaurant : data.data.name_restaurant, id: data.id })
                                                           
                                                             this.setState({Most: MostCopy})}}
                                                          }
                                                      > Trending this week
                                                         </button> 
                     
                  </div>
               </div>
            </div>
         </div>
      </div>
      
   );

                                    
        
      
    } )
}
<div className="col-xl-3 "><TableDndApp data={this.state.Most} delete={this.deleteresto} ></TableDndApp></div>
</div>

</Fragment>
      );
   };
}; 

function mapStateToProps(state) {
   
   return {
      TrendingWeek: state.trendingThisWeek.TrendingWeek,
   };
 }
 function mapDispatchToProps(dipatch) {
   return bindActionCreators(
     { getTRENDING },
     dipatch,
   );
 }
export default connect(mapStateToProps, mapDispatchToProps)(TrendingThisWeek)*/
import Compressor from "compressorjs";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import { firestore } from "../../../../../fire";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddTrending, getTRENDING } from "../../../../store/actions/trendingThisWeek_actions";
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

const TrendingThisWeek = (props) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [RestaurantID, setRestaurantID] = useState("");
  const [selectedID, setselectedID] = useState("");
  const [promoName, setpromoName] = useState("");
  const [Trending, setTrending] = useState([]);
  const [random, setrandom] = useState(0);
  const [expireDate, setexpireDate] = useState("");
  const [stateModal, setStateModal] = useState(false);
  const { promotions } = useSelector((state) => state.Promotions);
  const { restaurants } = useSelector((state) => state.Restaurants);
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [Modalshow, setModalshow] = useState(false)


  const searchByTerm = (value) => {
    setSearchTerm(value);
  };
  const remove = (id,index) => {
   alert(id)
   firestore
     .collection("TrendingWeek")
     .doc(id)
     .delete()
     .then(() => {
       toast.success('🦄 Trend has been deleted successfully!', {
         position: "bottom-right",
         autoClose: 5000,
         hideProgressBar: true,
         closeOnClick: true,
         pauseOnHover: false,
         draggable: false,
         progress: 0,
         });
         
         var array = Trending.filter(res => res.id !== id); 
       
         setTrending(array)
       
     })
     .catch((error) => {
       
     });
 };

 const ajoutTrends=(e)=>{
    let a=Trending.length
   
    let datauser={id:a,data:e}
    let arraycopy = Trending
    arraycopy.push(datauser)
    
    setTrending(arraycopy)
    setrandom(Math.random())
    dispatch(AddTrending(arraycopy.map(res => res.data)))
 }
  useEffect(() => {
    dispatch(getTRENDING()).then((e)=>{
       let array=[]
       e.payload.map((data)=>{
          array.push(data)
       })
       setTrending(e.payload)
    })
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
    }
    
  };
const findAvatar=(id)=>{
 let index=restaurants.findIndex(x => x.id === id);
 let avatar=restaurants[index]?.data.avatar
 return avatar
 console.log(avatar)
}

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
            {Trending.map((data, index) => {
              return (
        
                <div style={card1} key={index}>
                  <img style={img} src={findAvatar(data.data.id)} />
                  <div className="new-arrival-content text-center mt-3">
                    <div key={data.id}>
                      <h2>
                        <Link to={`/restaurant-detail/${data.data.id}`}>
                          {data.data.name_restaurant}
                        </Link>
                      </h2>{" "}
                    </div>

                    
                    <br></br>

                    <br></br>
                    <br></br>
                    <div
                      className="btn btn-danger shadow btn-xs sharp"
                      onClick={() => {
                        remove(data.id,index)
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
                        ajoutTrends({id:data.id,name_restaurant:data.data.name_restaurant})
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
          <Button // onClick={() => deletePromotion()} 
          variant="primary">
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

export default TrendingThisWeek;
