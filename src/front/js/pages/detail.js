import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import "../../styles/detail.css";


export const Detail = () => {
    const {store, actions} = useContext (Context);
    const params = useParams();
    const [movieInfo, setMovieInfo] = useState ({});
    const [videoKey, setVideoKey] = useState()

    
    useEffect(() => {
        actions.getTrailerForMovie(params.movieId, setVideoKey);
        actions.getMovieById(params.movieId, setMovieInfo);
    }, [params.movieId, setMovieInfo, setVideoKey]);
    
    return (
        <div className="page-content">
            <div className="movie-details">
            <div className="movie-info">
    <div>
    <h1>{movieInfo.original_title}<span>({movieInfo.vote_average})</span></h1>
    <button>
            Your Rating
        </button>
        <button>
            Add to watchlist
            </button>
      </div>
    <div >
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
                <p>Genre: {movieInfo.genres && movieInfo.genres[0].name}</p>

                    <p>{movieInfo.overview}</p>

                </div>
                <hr/> 
                <div className="movie-cast">
                <p>Tagline: {movieInfo.tagline}</p>

                    <hr />
                    <p> Budget: {movieInfo.budget} $</p>

                </div>
                <div className="footer">
                    &copy; 2023 Your Movie App
                </div>
            </div>
        </div>
    );
};

export default Detail;