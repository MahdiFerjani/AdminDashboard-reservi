import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reducers from './jsx/store/reducers'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import SimpleReactLightbox from "simple-react-lightbox";
import { Provider } from "react-redux";
import promiseMiddleware from 'redux-promise'
import { render } from 'react-dom'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = createStore(
  reducers,
  composeEnhancers(applyMiddleware(promiseMiddleware))
)

const Appredux = () =>{

   return (
   <Provider store={createStoreWithMiddleware}>

   <React.StrictMode>
      <SimpleReactLightbox>
         <App />
      </SimpleReactLightbox>
   </React.StrictMode>
   </Provider>
   )
   }

ReactDOM.render(<Appredux />, document.getElementById('root'))
