import React, { Component } from "react";

/// Link
import { Link } from "react-router-dom";

/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";

/// Menu
import MetisMenu from "metismenujs";

///
import drump from "../../../images/card/drump.png";
class MM extends Component {
   componentDidMount() {
      this.$el = this.el;
      this.mm = new MetisMenu(this.$el);
   }
   componentWillUnmount() {
      //this.mm("dispose");
   }
   render() {
      return (
         <div className="mm-wrapper">
            <ul className="metismenu" ref={(el) => (this.el = el)}>
               {this.props.children}
            </ul>
         </div>
      );
   }
   }

class SideBar extends Component {
   /// Open menu
   componentDidMount() {
      // sidebar open/close
      var btn = document.querySelector(".nav-control");
      var aaa = document.querySelector("#main-wrapper");

      function toggleFunc() {
         return aaa.classList.toggle("menu-toggle");
      }

      btn.addEventListener("click", toggleFunc);
   }
   render() {
      /// Path
      const path = window.location.pathname;

      /// Active menu
      let deshBoard = [
            "",
            "workout-statistic",
            "workout-plan",
            "distance-map",
            "diet-food-menu",
            "personal-record",
         ],
         app = [
            "app-profile",
            "app-calender",
            "email-compose",
            "email-inbox",
            "email-read",
            "ecom-product-grid",
            "restaurant-list",
            "restaurant-list",
            "ecom-product-order",
            "ecom-checkout",
            "ecom-invoice",
            "ecom-customers",
            "Orders",
            "ecom-restaurents",
            "mostpopular",
            "trending-this-week"
         ],
         gestioapp = [
          
            "mostpopular",
            "trending-this-week"
         ],
         charts = [
            "chart-flot",
            "chart-morris",
            "chart-chartjs",
            "chart-chartist",
            "commision",
            "restoArgents",
         ],
         bootstrap = [
            "ui-accordion",
            "ui-badge",
            "ui-alert",
            "ui-button",
            "ui-modal",
            "ui-button-group",
            "ui-list-group",
            "ui-media-object",
            "ui-card",
            "ui-carousel",
            "ui-dropdown",
            "ui-popover",
            "ui-progressbar",
            "ui-tab",
            "ui-typography",
            "ui-pagination",
            "ui-grid",
         ],
         plugins = [
            "uc-select2",
            "uc-nestable",
            "uc-sweetalert",
            "uc-toastr",
            "uc-jqvmap",
            "uc-noui-slider",
         ],
         widget = ["widget"],
         forms = [
            "form-element",
            "form-wizard",
            "form-editor-summernote",
            "form-pickers",
            "form-validation-jquery",
         ],
          demande = "demandesresto",
          orders= "orders",
          promotion = "promotions",
          vouchers = "Vouchers",
          livreurs = "Livreurs",
          table = ["table-bootstrap-basic", "table-datatable-basic"];
  

      return (
         <div className="deznav">
            <PerfectScrollbar className="deznav-scroll">
               <MM className="metismenu" id="menu">
                  <li
                     className={`${
                        deshBoard.includes(path) ? "mm-active" : ""
                     }`}
                  >
                     <Link
                        className="ai-icon"
                        to="/"
                        aria-expanded="false"
                     >
                        <i className="fa fa-home"></i>
                        <span className="nav-text">Dashboard</span>
                     </Link>
                     
                  </li>
                  <li
                     className={`${
                        path.includes(demande) ? "mm-active" : ""
                     }`}
                  >
                  <Link
                        className="ai-icon"
                        to="/demandesresto"
                        aria-expanded="false"
                  >
                        <i className="fa fa-hourglass"></i>
                        <span className="nav-text">Demande restaurants</span>
                     </Link>
                   
                  </li>
                  <li
                     className={`${
                        path.includes(livreurs) ? "mm-active" : ""
                     }`}
                  >
                  <Link
                        className="ai-icon"
                        to="/Livreurs"
                        aria-expanded="false"
                  >
                       <i class="fa fa-truck" aria-hidden="true"></i>
                        <span className="nav-text">Livreurs</span>
                     </Link>
                   
                  </li>
                  <li
                     className={`${
                        path.includes(promotion) ? "mm-active" : ""
                     }`}
                  >
                  <Link
                        className="ai-icon"
                        to="/promotions"
                        aria-expanded="false"
                  >
                        <i className="fa fa-bullhorn"></i>
                        <span className="nav-text">Promotions</span>
                     </Link>
                   
                  </li>
                  <li
                     className={`${
                        path.includes(orders) ? "mm-active" : ""
                     }`}
                  >
                  <Link
                        className="ai-icon"
                        to="/orders"
                        aria-expanded="false"
                  >
                        <i class="fa fa-shopping-bag" aria-hidden="true"></i>
                        <span className="nav-text">Orders</span>
                     </Link>
                   
                  </li>
                  <li
                     className={`${
                        path.includes(vouchers) ? "mm-active" : ""
                     }`}
                  >
                  <Link
                        className="ai-icon"
                        to="/Vouchers"
                        aria-expanded="false"
                  >
                        <i className="fa fa-gift" ></i>
                        <span className="nav-text">Vouchers</span>
                     </Link>
                   
                  </li>
                  
                  <li
                   
                  >
                     <Link
                        className="has-arrow ai-icon"
                        to="#"
                        aria-expanded="false"
                     >
                        <i className="fa fa-mobile-phone" style={{fontSize:24}}></i>
                        <span className="nav-text">Gestion App</span>
                     </Link>
                     <ul aria-expanded="false">
                   
                        <li   className={`${
                        gestioapp.includes(path.slice(1)) ? "mm-active" : ""
                     }`}
                        >
                                 <Link to="/mostpopular">Most popular</Link>
                              </li>
                              <li   className={`${
                        gestioapp.includes(path.slice(1)) ? "mm-active" : ""
                     }`}
                              >
                           <Link to="/trending-this-week">Trending this week</Link>
                        </li>
                       
                     
                                 </ul>
                  </li>
            
                     <li
                    
                  >
                     <Link
                        className="has-arrow ai-icon"
                        to="#"
                        aria-expanded="false"
                     >
                        <i className="fa fa-user"></i>
                        <span className="nav-text">Users</span>
                     </Link>
                     <ul aria-expanded="false">
                       
                        <li   className={`${
                        gestioapp.includes(path.slice(1)) ? "mm-active" : ""
                     }`}
                        >
                                 <Link to="/ecom-customers">Customers</Link>
                              </li>
                            
                       
                      
                         </ul>
                  </li>
            
                  <li
                     className={`${
                        charts.includes(path.slice(1)) ? "mm-active" : ""
                     }`}
                  >
                     <Link
                        className="has-arrow ai-icon"
                        to="#"
                        aria-expanded="false"
                     >
                        <i className="fa fa-calculator"></i>
                        <span className="nav-text">Finance</span>
                     </Link>
                     <ul aria-expanded="false">
                        <li>
                           <Link to="/commision">Gestion Commision</Link>
                        </li>
                        <li>
                           <Link to="/restoArgents">Comptabilite</Link>
                        </li>
                      
                     </ul>
                  </li>
                  <li
                     className={`${
                        bootstrap.includes(path.slice(1)) ? "mm-active" : ""
                     }`}
                  >
                     <Link
                        className="has-arrow ai-icon"
                        to="/ecom-restaurents"
                        aria-expanded="false"
                     >
                        <i className="fas fa-concierge-bell"></i>
                        <span className="nav-text">Restaurants</span>
                     </Link>
                     <ul aria-expanded="false">
                     <li>
                           <Link to="/restaurants">Restaurants</Link>
                        </li>
                       
                        <li>
                           <Link to="/restuarantbanne">Restaurants bannés</Link> 
                        </li>
                      
                     </ul>
                  </li>
                   {/* <li
                     className={`${
                        widget.includes(path.slice(1)) ? "mm-active" : ""
                     }`}
                  >
                     <Link
                        to="widget-basic" 
                        className="ai-icon"
                        aria-expanded="false"
                     >
                        <i className="flaticon-381-star"></i>
                        <span className="nav-text">Statistiques</span>
                     </Link>
                  </li> */}
                     </MM>
               {/* <div className="drum-box mt-5">
                  <img src={drump} alt="" />
                  <p className="fs-18 font-w500 mb-4">
                     Start Plan Your Workout
                  </p>
                  <Link className to={"./personal-record"}>
                     Check schedule
                     <svg
                        className="ml-3"
                        width={6}
                        height={12}
                        viewBox="0 0 6 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path d="M0 12L6 6L0 0" fill="#BCD7FF" />
                     </svg>
                  </Link>
               </div> */}

               <div className="copyright" margin-top="600px" >
                  <p>
                     <strong>T&M Consultings </strong> ©All Rights Reserved
                  </p>
                  
               </div>
            </PerfectScrollbar>
         </div>
      );
   }
}

export default SideBar;
