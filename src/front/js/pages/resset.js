import React from "react";
import { Link } from "react-router-dom";
import "../../styles/resset.css";

export const Resset = () => {
	return (
        <form className="text-center">
            <div className="superFormWrappa">
            <div className="formWrappa">
                <p className="text-danger">
                -Suspense music-  Oh Lord!...Have you... 
                forgotten your... password?!!!!!-Tension, pain..
                .-Or... do you... need to... reset it?
                </p>
                <input type="email" className="form-control"
                placeholder="Type here your email adress to receive a resset link" 
                id="exampleInputEmail1" aria-describedby="emailHelp"/>
                <button type="submit" className="btn btn-primary">Send link</button>
                </div>
            </div>    
        </form>
    	    );
          };