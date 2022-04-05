import React from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import logo from "./images/logo.png";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        T&M CONSULTINGS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Login =(props) => {
  const {email,setEmail,password,setPassword,handleLogin,emailError,passwordError} = props ;
  

  
    return(
      
       
         <Grid container style ={{minHeight:'100vh'}}>
           <Grid item xs={14} sm={8}>
            <img src="https://restaurant.xn--reserv-gva.fr/static/media/login-v2.eace0a32.jpg" style={{width: '100%', height:'100%',objectFit :'cover'}} alt = "" />
           </Grid>
           <Grid container item xs={12} sm={4} alignItems="center" direction="column" justify="space-between" style ={{padding: 10}}>
            <div />
            <div className="authincation" >
       <div className="authincation-content">
        <div className="auth-form">
           <div>
            <div align ="center" ><Avatar  src={logo}
                           alt="profile"
                         style={{ width:40 ,
                         height: 50}}>
            
            
            </Avatar> </div> <br></br>
            <Typography component="h1" variant="h5" align="center" style ={{paddingTop:'10'}}> 
              Sign in
            </Typography> <br></br>
            <div >
            <TextField type="email"
                                       className="form-control"
                                       name="Email"
                                       
                                       required value = {email}
            onChange = {(e) => setEmail (e.target.value)}
            />
            <p className="errorMsg">{emailError}</p>
                
            <TextField type="password"
                                       className="form-control"
                                       name="password"
                                       required value = {password} 
                                       onChange = {(e) => setPassword (e.target.value)}/>
                                       <p className="errorMsg"> {passwordError} </p>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              
                                    <button 
                                       type="submit"
                                       className="btn btn-primary btn-block" 
                       onClick = {handleLogin}> Sign in </button>    
           

             
                </div>
                <Box mt={5}>
                <Copyright />
              </Box>
              </div>  </div>  </div>  </div>
          
            <div />
           </Grid>
         </Grid>
    )
}
  
export default Login;