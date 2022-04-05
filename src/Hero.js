import React, { Fragment } from "react";

/// Components
import Markup from "./jsx";

/// Style
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";

import { withResizeDetector } from "react-resize-detector";

const Hero = ({  width }) => { 
  
   const body = document.querySelector("body");

   width >= 1300
      ? body.setAttribute("data-sidebar-style", "full")
      : width <= 1299 && width >= 767
      ? body.setAttribute("data-sidebar-style", "full")
      : body.setAttribute("data-sidebar-style", "overlay");

   return ( <section className="Hero">
     
 <Fragment>
         <Markup />
      </Fragment>
   </section>
     
   );
};

export default withResizeDetector(Hero);