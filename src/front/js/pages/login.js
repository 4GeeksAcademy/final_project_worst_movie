import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/login.css";

export const Login = () => {
	const { store, actions } = useContext(Context);

	return (
        <form className="text-center">
        <h1 className="text-light">Wellcome  to Your Best Worst Movie Log in.</h1>
        <div className="superFormWrappa ">
        <div className="formWrappa ">
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label text-warning">Email address</label>
          <input type="email" className="form-control" placeholder="Type your email adress here" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text text-light">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label text-warning">Password</label>
          <input type="password" className="form-control"  placeholder="Type your password here" id="exampleInputPassword1"/>
        </div>
        <div className="text-center">
        <button type="submit" className="btn btn-primary">Log in</button>
        </div>
        <p className="text-danger">
            -Suspense music-  Oh Lord!...Have you... 
            forgotten your... password?!!!!!-Tension, pain..
            .-Or... do you... need to... reset it?
        </p>
        <input type="email" className="form-control"
         placeholder="Typer here your email adress to receive a resset link" 
        id="exampleInputEmail1" aria-describedby="emailHelp"/>
         <button type="submit" className="btn btn-primary">Send link</button>
         <p className="text-danger">
         Guess what? You're in the 'Not Registered' club! Time for a wild
          adventure—off to the registration form you go!
        </p>
        <div className="text-center">
        <button type="submit" className="btn btn-primary">Sign up.</button>
        </div>
       </div>
        </div>
        </form>
       
       
         );
    };
	
