import React,{useContext} from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar navbar-light ">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">
					<i className="fa-solid fa-film text-warning"></i>
						</span>
				</Link>
				<div className="ml-auto">
					<Link to="/login">
					<div class="dropdown">
  						<button className="btn-outline btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
   					 	Log in.
  						</button>
  						<ul className="dropdown-menu">
							<li><a className="dropdown-item text-danger" href="#" onClick={actions.logout}>Log out</a>
							</li>
    
  						</ul>
					</div>
					</Link>
				</div>
			</div>
		</nav>
	);
};
