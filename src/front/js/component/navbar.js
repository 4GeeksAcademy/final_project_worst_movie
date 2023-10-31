import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const nav = useNavigate();

	/***/
	const [inputText, setInputText] = useState("");
	const [autocompleteResults, setAutocompleteResults] = useState([]);
	const [showAutocomplete, setShowAutocomplete] = useState(false);

	let inputHandler = (text) => {
		setInputText(text)

		if (text.trim() == "") {
			setAutocompleteResults([])
			setShowAutocomplete(false);
		}

		else {
			const fetchHorror = fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIEDB_API_KEY}&vote_average.lte=5.1&sort_by=vote_average.asc&with_genres=27&vote_average.gte=2&vote_count.gte=800`);
			const fetchDrama = fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIEDB_API_KEY}&vote_average.lte=5.2&sort_by=vote_average.asc&with_genres=10749&vote_average.gte=2&vote_count.gte=475`);
			const fetchAction = fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIEDB_API_KEY}&vote_average.lte=5.2&sort_by=vote_average.asc&with_genres=28%2C%2012&vote_average.gte=2&vote_count.gte=750`);

			Promise.all([fetchHorror, fetchAction, fetchDrama])
				.then((responses) =>
					Promise.all(responses.map((response) => response.json()))
				)
				.then(([dataHorror, dataAction, dataDrama]) => {
					const combinedData = [
						...dataHorror.results.filter((result) =>
							result.title.toLowerCase().includes(text.toLowerCase())
						),
						...dataAction.results.filter((result) =>
							result.title.toLowerCase().includes(text.toLowerCase())
						),
						...dataDrama.results.filter((result) =>
							result.title.toLowerCase().includes(text.toLowerCase())
						)]
					setAutocompleteResults(combinedData)
					setShowAutocomplete(true);
				})
				.catch((error) => {
					console.log("Looks like there was a problem: \n", error);
				});
		}
	};

	const handleSelectAutocomplete = (item) => {
		setInputText("");
		setShowAutocomplete(false);
		console.log(`detail/${item.id}`)
		nav(`detail/${item.id}`);
	};
	/***/

	return (
		<div>
			<nav className="navbar navbar-light ">
				<div className="container">
					<Link to="/">
						<span className="navbar-brand mb-0">
							<img src="https://i.postimg.cc/RVH9yJfR/movie-resized-logo.png" className="logo" />
						</span>
					</Link>
					<form className="searchbar-wrapper">
						<div className="form-inline me-4 d-flex">
							<input className="form-control search-input mr-sm-2" type="search" placeholder="Search" aria-label="Search" autoComplete="on" onChange={(e) => inputHandler(e.target.value)} value={inputText} />
							<p className="icon-search my-2 my-sm-0"><i className="fas fa-search"></i></p>
						</div>
						<div className="search-results-wrapper">
							{showAutocomplete && autocompleteResults.length > 0 && (
								<ul className="search-bar-list scrollbar p-0">
									{autocompleteResults.map((item, index) => (
										//<Link to={`/details/${item.id}`}>
										<li key={index} className="search-item-li my-2" onClick={() => handleSelectAutocomplete(item)}>
											{item.title}
										</li>
										//</Link>
									))}
									{/*<option>
								{autocompleteResults.length == 0 ? "Oops! Looks like we don't have that movie right now!" : ""}
							</option>*/}
								</ul>
							)}
						</div>
					</form>
					<div className="ml-auto">
						<Link to="/login">
							<div className="dropdown">
								<button className="btn navbar-btn btn-warning dropdown-toggle text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false">
									Log in
								</button>
								<ul className="dropdown-menu dropdown-menu-end">
									<li className="text-end"><a className="dropdown-item text-danger" href="#" onClick={actions.logout}>Log out</a>
									</li>
								</ul>
							</div>
						</Link>
					</div>
				</div>
			</nav>
			<h6 className="subtitle mt-4 text-center">Movies that might make you want to run out of the cinema!</h6>
		</div>
	);
};
