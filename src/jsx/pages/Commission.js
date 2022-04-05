import React, { useEffect, useState } from "react";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import { getComission, updateComission } from "../store/actions/Comission_actions";
import { useDispatch } from "react-redux";

// import Ext from "../../layouts/Ext";


const Commission = () => {
   const [commison, setCommision] = useState(0)
    const dispatch = useDispatch()

const changeCommisionValue = () => {
   dispatch(updateComission(commison))
   dispatch(getComission())
   
   
   } 

   return (
      
   <div className="card-body">
                     <div className="basic-form">
                
                         
                           <div className="form-group">
                              <input
                              value={commison}
                              onChange={(value) => setCommision(value.target.value)}
                                 type="number"
                                 className="form-control input-rounded"
                                 placeholder="10%"
                              />
                           </div>
                           <div className="form-group row">
                              <div className="col-sm-10">
                                 <button
                                 onClick={() => changeCommisionValue()}
                             
                                    className="btn btn-primary"
                                 >
                                    Add Commision
                                 </button>
                              </div>
                           </div>
                  
                     </div>
                  </div> );
}
export default Commission ;