import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import "../../styles/detail.css";
import {useNavigate} from "react-router-dom";
import StarRatingComponent from 'react-star-rating-component';

export const Detail = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [movieInfo, setMovieInfo] = useState({});
    const [videoKey, setVideoKey] = useState();
    const [userRating, setUserRating] = useState() 

    const navigate = useNavigate();
    useEffect(()=>{
        if(actions.getToken()){
          console.log("Go ahead.")
        }
        else {
          navigate('/login')
        }
      },[])

   const handleAddToWatchlist = (movie) => {
    actions.addToWatchlist(movie);
    console.log("movieposter",movie.poster_path)
    };

    const handleRatingClick = (nextValue) => {
        setUserRating(nextValue);
        //localStorage.setItem(`userRating-${params.movieId}`, nextValue.toString());
        actions.rateMovie(movieInfo, nextValue);
    };

    useEffect(() => {
        actions.getTrailerForMovie(params.movieId, setVideoKey);
        actions.getMovieById(params.movieId, setMovieInfo);
        actions.getUserRating(params.movieId, setUserRating)
    }, [params.movieId, setMovieInfo, setVideoKey]);

    return (
        <div className="page-content mb-5">
            <div className="movie-details">
                <div className="movie-info mt-5">
                    <div>
                        <h1 className="detail-title mb-3">{movieInfo.original_title}<span>( <i className="yellow fas fa-star me-2"></i>{parseFloat(movieInfo.vote_average).toFixed(1)} )</span></h1>
                        <div className="action-buttons">
                            <div className="rating mb-2">
                                <p>Your Rating &nbsp;</p>
                                <StarRatingComponent
                                    name="userRating"
                                    starCount={5}
                                    value={userRating}
                                    onStarClick={handleRatingClick}
                                />
                            </div>
                            <div className="second-button">
                                <button
                                    onClick={() => actions.addToWatchlist(movieInfo)}
                                    disabled={store.watchlist.some(movie => movie.id === movieInfo.id)}
                                >
                                    {store.watchlist.some(movie => movie.id === movieInfo.id) ? 'Added to Your Watchlist' : 'Add to Watchlist'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>{movieInfo.release_date} / {movieInfo.runtime}m</p>
                    </div>
                </div>
                <div className="poster-video-container">
                    <div className="movie-poster">
                        <img src={`https://image.tmdb.org/t/p/w1280/${movieInfo.poster_path}`} alt="Movie Poster" />
                    </div>
                    <div className="movie-video">
                        <iframe
                            width="760"
                            height="815"
                            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1`}
                            title="YouTube video player"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
                <div className="movie-summary">
                    <p><span className="sub">Genre:</span> {movieInfo.genres && movieInfo.genres[0].name}</p>
                    <p>{movieInfo.overview}</p>
                </div>
                <hr />
                <div className="movie-cast">
                    <p><span className="sub">Tagline:</span> {movieInfo.tagline}</p>
                    <hr />
                    <p><span className="sub">Budget:</span> {movieInfo.budget} $</p>
                </div>
            </div>
        </div>
    );
};

export default Detail;