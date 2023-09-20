import React,{useState,useContext} from "react";
import { Link } from "react-router-dom";
import "../../styles/resset.css";
import { Context } from "../store/appContext";

export const Resset = () => {
    const[email,setEmail]=useState();
    const[password, setPassword]=useState();
    const { store, actions } = useContext(Context);
   
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(email);  
      actions.resset(email, password);
    };
	return (
        <form className="text-center"onSubmit={handleSubmit}>
            <div className="superFormWrappa">
            <div className="formWrappa">
                <p className="text-danger">
                -Suspense music-  Oh Lord!...Have you... 
                forgotten your... password?!!!!!-Tension, pain..
                .-Or... do you... need to... reset it?
                </p>
                <input type="email" className="form-control"
                placeholder="Type here your email adress to resset your password" 
                id="exampleInputEmail1" aria-describedby="emailHelp"
                onChange={(e) => setEmail(e.target.value)}/>
                 <input type="password" className="form-control"
                placeholder="Type here your new password" 
                id="exampleInputEmail1" aria-describedby="emailHelp"
                onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit" className="btn btn-primary">Resset</button>
                </div>
            </div>    
        </form>
    	    );
          };