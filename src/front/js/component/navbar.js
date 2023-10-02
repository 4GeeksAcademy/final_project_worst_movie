import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	return (
		<div>
			<nav className="navbar navbar-light ">
				<div className="container">
					<Link to="/">
						<span className="navbar-brand mb-0">
							<img src="https://i.postimg.cc/RVH9yJfR/movie-resized-logo.png" className="logo" />
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
						<div className="ml-auto">
							<Link to="/login">
								<button className="btn text-white btn-warning">Log in</button>
							</Link>
						</div>
					</div>
				</div>
			</nav>
			<h6 className="subtitle mt-4 text-center">Movies that might make you want to run out of the cinema!</h6>
		</div>
	);
};
