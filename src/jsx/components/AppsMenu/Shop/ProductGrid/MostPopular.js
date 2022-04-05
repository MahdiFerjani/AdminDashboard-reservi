import React, { Fragment, useState } from "react";
import { firestore } from "../../../../../fire";
import { Link ,Route} from "react-router-dom";
import ProductDetail from "./ProductDetail";
import TableDndApp from "./DraggableTable";
import { Button } from "bootstrap";
import { getMostPopular } from "../../../../store/actions/mostPopular_actions";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";




 class MostPopular extends React.Component {
   
 
   constructor(props){
      super(props);   


   }


searchByTerm = (value) => {
   this.setState({searchTerm : value});

}
   componentDidMount() {
      this.props.getMostPopular().then((res) => {
      
         this.setState({Most : this.props.MostPopular})
    
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
    state = {
      searchTerm : "",
      statetes : "",
      Restaurants: [],
      Most: this.props.MostPopular ? this.props.MostPopular.MostPopulars : []
      
   }
   deleteresto = (value) => {

      let dataCopy = this.state.Most
      dataCopy.splice(dataCopy.findIndex(res => res.id === value), 1 )
      this.setState({Most : dataCopy})
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

                    {/* <Link to={`restaurant-detail/${data.id}`}>{data.data.name_restaurant}</Link>  */}
                        {/* <Link to={{pathname:`/:productId/${data.id}`,
                        productdetailProps: {
                        productdetail: "I M passed From Props"
                       }}} >{data.data.name_restaurant}</Link>  */}

               {/* <Link to={`/detail/${data.id}`}>{data.data.name_restaurant}</Link> */}
    
                     </h2> </div>
                     {/* <span class="star-rating mb-2 d-flex">{data.data.review}</span> */}

                     <span className="email">{data.data.email}</span>
                     <span className="email">{data.data?.review/data.data?.numberReview ? data.data?.review/data.data?.numberReview : 0}</span>
                     <br></br>
                     <span className="phone">{data.data.phone_number}</span>

                    
                     <button 
                                                          onClick ={() => {
                                                             let MostCopy = this.state.Most;
                                                      
                                                          if(MostCopy.findIndex(res => res.id === data.id) === -1 )
                                                             MostCopy.push({name_restaurant : data.data.name_restaurant, id: data.id })
                                                             this.setState({Most: MostCopy})}}
                                                      > Most popular 
                     </button> 
                  </div>
               </div>
            </div>
         </div>
      </div>
      
   );

                                    
        
      
    } )
}
<div className="col-xl-3 "><TableDndApp data={this.state.Most}  delete={this.deleteresto}></TableDndApp></div>
</div>
</Fragment>
      );
   };
   
}; 

function mapStateToProps(state) {
   
   return {
      MostPopular: state.MostPopular.MostPopulars,
   };
 }
 function mapDispatchToProps(dipatch) {
   return bindActionCreators(
     { getMostPopular },
     dipatch,
   );
 }
export default connect(mapStateToProps, mapDispatchToProps)(MostPopular)