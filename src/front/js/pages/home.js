import React, { useContext , useState , useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import {useNavigate} from "react-router-dom";

import { MovieCard } from "../component/movie-card";
import { Watchlist_Item } from "../component/watchlist-item";


export const Home = () => {
	const { store, actions } = useContext(Context);
	const [watchlist, setWatchlist] = useState([])
	useEffect(() => {
		actions.getWatchlistFromDB(setWatchlist)
	}, [])
	
	/*const navigate = useNavigate();
	useEffect(()=>{
	  if(store.token){
		console.log("Go ahead.")
	  }
	  else {
		navigate('/login')
	  }
	},[])*/

	return (
		<div className="main-wrapper mt-5">
			<div className="wrapper-first-section">
				<div className="row">
					<div className="movie-section col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8">
						<div className="d-flex">
							<i className="main-icon fas fa-star"></i>
							<div>
								<h1 className="main-title">Top 10</h1>
								<h1 className="purple-title main-title">Worst Movies</h1>
								<p className="main-title">(You guys have voted for)</p>
							</div>
						</div>
						<div className="topten-section">
							<div className="image-wrapper">
								<img className="main-topt-img" src="https://images.webapi.gc.blackpoolfcservices.co.uk/fit-in/1000x1000/4b7df6b0-8053-11ec-b799-ef66214b7928.png" alt="placeholder image" />
								<div className="main-floating-title">
									<h1>#1</h1>
									<h3 className="bold-fl-title">Movie Title</h3>
								</div>
							</div>

							<div className="restof-topt-section row g-0">
								<div className="col-4 image-wrapper">
									<img className="sec-topt-img" src="https://simoneleighvenice2022.org/wp-content/themes/simoneleighvenice/assets/img/580x430.png" alt="placeholder image" />
									<div className="floating-title">
										<h4>#2</h4>
										<h6 className="bold-fl-title">Movie Title</h6>
									</div>
								</div>
								<div className="col-4 image-wrapper">
									<img className="sec-topt-img" src="https://simoneleighvenice2022.org/wp-content/themes/simoneleighvenice/assets/img/580x430.png" alt="placeholder image" />
									<div className="floating-title">
										<h4>#3</h4>
										<h6 className="bold-fl-title">Movie Title</h6>
									</div>
								</div>
								<div className="col-4 image-wrapper">
									<img className="sec-topt-img" src="https://simoneleighvenice2022.org/wp-content/themes/simoneleighvenice/assets/img/580x430.png" alt="placeholder image" />
									<div className="floating-title">
										<h4>#4</h4>
										<h6 className="bold-fl-title">Movie Title</h6>
									</div>
								</div>
								<div className="col-4 image-wrapper">
									<img className="sec-topt-img" src="https://simoneleighvenice2022.org/wp-content/themes/simoneleighvenice/assets/img/580x430.png" alt="placeholder image" />
									<div className="floating-title">
										<h4>#5</h4>
										<h6 className="bold-fl-title">Movie Title</h6>
									</div>
								</div>
								<div className="col-4 image-wrapper">
									<img className="sec-topt-img" src="https://simoneleighvenice2022.org/wp-content/themes/simoneleighvenice/assets/img/580x430.png" alt="placeholder image" />
									<div className="floating-title">
										<h4>#6</h4>
										<h6 className="bold-fl-title">Movie Title</h6>
									</div>
								</div>
								<div className="col-4 image-wrapper">
									<img className="sec-topt-img" src="https://simoneleighvenice2022.org/wp-content/themes/simoneleighvenice/assets/img/580x430.png" alt="placeholder image" />
									<div className="floating-title">
										<h4>#7</h4>
										<h6 className="bold-fl-title">Movie Title</h6>
									</div>
								</div>
								<div className="col-4 image-wrapper">
									<img className="sec-topt-img" src="https://simoneleighvenice2022.org/wp-content/themes/simoneleighvenice/assets/img/580x430.png" alt="placeholder image" />
									<div className="floating-title">
										<h4>#8</h4>
										<h6 className="bold-fl-title">Movie Title</h6>
									</div>
								</div>
								<div className="col-4 image-wrapper">
									<img className="sec-topt-img" src="https://simoneleighvenice2022.org/wp-content/themes/simoneleighvenice/assets/img/580x430.png" alt="placeholder image" />
									<div className="floating-title">
										<h4>#9</h4>
										<h6 className="bold-fl-title">Movie Title</h6>
									</div>
								</div>
								<div className="col-4 image-wrapper">
									<img className="sec-topt-img" src="https://simoneleighvenice2022.org/wp-content/themes/simoneleighvenice/assets/img/580x430.png" alt="placeholder image" />
									<div className="floating-title">
										<h4>#10</h4>
										<h6 className="bold-fl-title">Movie Title</h6>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="sidebar-section col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
						<h2 className="title text-center mt-5">What to watch</h2>
						<h1 className="light-yellow title text-center mb-3 watchlist-title">Watchlist</h1>
						<div className="watchlist-items y-scrollbar">
							{store.watchlist.length === 0 ? (
								<div className="empty-watchlist text-center mt-5 mx-4">
									<i className="fa-solid fa-bookmark fs-1 mb-4"></i>
									<h3><strong>Your watchlist is empty</strong></h3>
									<h5>Save some movies you want to watch here!</h5>
									<button type="button" className="btn btn-light mt-5"><a className="button-link" href='#movies-selection'>Browse Movies!</a></button>
								</div>
							) : <div>
								{watchlist?.map((movies, index) => (
									<Watchlist_Item img_src={movies.image} title={movies.title} rating={movies.rating} index={index} id={movies.id}/>
								))} </div>
							}
						</div>
					</div>
				</div>

			</div>
			<div className="wrapper-second-section me-3 mt-5">
				<div className="d-flex">
					<i className="icon fas fa-film"></i>
					<div>
						<h2 className="main-title">Want some <span className="italic really-bad-text">really bad</span> movie recommendations? </h2>
						<h2 className="purple-title main-title mb-4">We got you!</h2>
						<p id="movies-selection" className="main-title fs-5">What are you in the mood for?</p>
					</div>
				</div>

				<h1 className="genre-title title mt-5 mb-3"><i className="light-yellow fas fa-caret-right"></i> Horror</h1>
				<div className="movies-by-genre-section h-scrollbar d-flex">
					{store.horror_movies?.map((movies) => (
						<MovieCard img_src={movies.poster_path} title={movies.title} rating={movies.vote_average} id={movies.id}/>
					))}
				</div>
				<h1 className="genre-title title mt-5 mb-3"><i className="light-yellow fas fa-caret-right"></i> Drama</h1>
				<div className="movies-by-genre-section h-scrollbar d-flex">
					{store.drama_movies?.map((movies) => (
						<MovieCard img_src={movies.poster_path} title={movies.title} rating={movies.vote_average} id={movies.id}/>
					))}
				</div>
				<h1 className="genre-title title mt-5 mb-3"><i className="light-yellow fas fa-caret-right"></i> Action</h1>
				<div className="movies-by-genre-section h-scrollbar d-flex">
					{store.action_movies?.map((movies) => (
						<MovieCard img_src={movies.poster_path} title={movies.title} rating={movies.vote_average} id={movies.id}/>
					))}
				</div>
			</div>
		</div>
	);
};

// Fix responsiveness once the website is done!!
