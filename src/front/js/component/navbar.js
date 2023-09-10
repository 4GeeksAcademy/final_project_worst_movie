import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light ">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">
					<i className="fa-solid fa-film text-warning"></i>
						</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Log in.</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
