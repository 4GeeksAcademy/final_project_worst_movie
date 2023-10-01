import React,{useState,useContext} from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";
import { Context } from "../store/appContext";

export const Login = () => {
  const[email,setEmail]=useState();
  const[password, setPassword]=useState();
  const { store, actions } = useContext(Context);
 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);  
    actions.logIn(email, password);
  };

	return (
        <form className="text-center my-5"onSubmit={handleSubmit}>
        <h1 className="text-light">Welcome  to Your Best Worst Movie Log in.</h1>
        <div className="superFormWrappalogin p-0">
        <div className="formWrappal ">
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label text-warning">Email address</label>
          <input type="email" className="form-control" 
          placeholder="Type your email adress here" id="exampleInputEmail1" 
          aria-describedby="emailHelp"onChange={(e) => setEmail(e.target.value)}/>
          <div id="emailHelp" className="form-text text-light">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label text-warning">Password</label>
          <input type="password" className="form-control" 
           placeholder="Type your password here" 
           id="exampleInputPassword1"onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="text-center">
        <button type="submit" className="btn btn-primary">Log in</button>
        </div>
        <Link to="/resset">
          <p className="text-light mt-3">Forgot your username or password?</p>
       </Link>
         <p className="text-danger mt-5">
         Guess what? You're in the 'Not Registered' club! Time for a wild
          adventure—off to the registration form you go!
        </p>
        <div className="text-center">
       <Link to="/registration">
       <button type="submit" className="btn btn-primary">Sign up</button>
       </Link>
        </div>
       </div>
        </div>
        </form>      
       
         );
    };
	
