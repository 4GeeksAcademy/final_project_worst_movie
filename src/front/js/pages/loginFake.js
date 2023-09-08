import React from "react";

export const LogIn=()=>{
    return(
      
        <form>
        <h1>Wellcome  to Your Best Worst Movie Log in.</h1>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" placeholder="Type your email adress here" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control"  placeholder="Type your password here" id="exampleInputPassword1"/>
        </div>
        <button type="submit" className="btn btn-primary">Log in</button>
        <p className="text-danger">
            -Suspense music-  Oh Lord!...Have you... 
            forgotten your... password?!!!!!-Tension, pain..
            .-Or... do you... need to... reset it?
        </p>
        <input type="email" className="form-control"
         placeholder="Typer here your email adress to receive a resset link" 
        id="exampleInputEmail1" aria-describedby="emailHelp"/>
         <p className="text-danger">
         Guess what? You're in the 'Not Registered' club! Time for a wild
          adventure—off to the registration form you go!
        </p>
        <button type="submit" className="btn btn-primary">Sign up.</button>
      </form>
         );
    };