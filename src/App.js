
import React , {useState, useEffect} from "react" ;
import {fire} from "./fire";
import Login from './Login' ;
import "./App.css";
import  Hero from './Hero';
import reducers from './jsx/store/reducers'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import {
    ReactReduxFirebaseProvider,
    firebaseReducer
  } from 'react-redux-firebase';
  import firebase from 'firebase/app'
  import GifLoader from 'react-gif-loader';
import promiseMiddleware from 'redux-promise'
  import { Provider } from 'react-redux';
  import 'firebase/firestore' // <- needed if using firestore
  import { createFirestoreInstance, firestoreReducer } from 'redux-firestore'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = createStore(
  reducers,
  composeEnhancers(applyMiddleware(promiseMiddleware))
)


const App = () =>{ 
   const [user, setUser] = useState('');
   const [email, setEmail] = useState ('');
   const [password, setPassword] = useState ('');
   const [emailError, setEmailError] = useState ('');
   const [passwordError, setPasswordError] = useState ('');
   const [hasAccount, setHasAccount] =  useState(false);
   const [isDisplayed, setIsDisplayed] = useState(true);
   const clearInputs =() => {
       setEmail ('');
       setPassword ('');
   }
   const clearErrors = () => {
         setEmailError ('') ;
         setPasswordError ('') ;                                                                
       
   }
   const handleLogin = () => {
    clearErrors();
    

       fire.auth()      
       .signInWithEmailAndPassword (email ,password)
       .catch ((err) => {
         switch (err.code) {
               case "auth/invalid-email":
               case "auth/user-disabled":
               case "auth/user-not-found":
                setEmailError(err.message);
                break; 
                case "auth/wrong-password" :
                   setPasswordError(err.message); 
                   break;
           }
       });
 }; 

  
 const handlelogout = () =>{
     fire.auth().signOut();};
 const authListenner = () => {
    fire.auth().onAuthStateChanged( user => {
        if (user){
            clearInputs();
            setUser(user);
        } else {
        setUser ("");
        }
    });
};
   useEffect (() => {
   authListenner ();
   setInterval(() => {
    setIsDisplayed(false);
  }, 3500);
   } , []) ; 

   

   return (
    

        <div className = "App"> 
        {isDisplayed && (
          <GifLoader
          loading={true}
          imageSrc="https://s10.gifyu.com/images/5957114.gif"
          overlayBackground="#ffffff"
      />
        )     
}
        { user&&!isDisplayed && 
          <Hero handleLogout={handlelogout}/>     
         }
        { !user&&!isDisplayed &&
          <Login 
          email={email} 
          setEmail={setEmail} 
          password={password} 
          setPassword= {setPassword} 
          handleLogin = {handleLogin} 
          hasAccount = {hasAccount} 
          setHasAccount ={setHasAccount}
          emailError = {emailError}
          passwordError={passwordError}
          />
         }
       
        </div>
       

    );
};


export default App