import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";


export const Detail = () => {
    const {store, actions} = useContext (Context);
    const params = useParams();
    const [movieInfo, setMovieInfo] = useState ({});
    const [videoKey, setVideoKey] = useState()
    

    
    useEffect(() => {
        actions.getTrailerForMovie(params.movieId, setVideoKey);
        actions.getMovieById(params.movieId, setMovieInfo);
    }, [params.movieId, setMovieInfo, setVideoKey]);
    
    
 const style = {
        display: "flex",
        flexDirection: "column"  
    };

    const posterStyle = {
        maxWidth: "200px",
        border: "1px solid #ccc",
        marginBottom: "20px"  
    };

    const pageContent = {
        backgroundColor: "#111", 
        color: "white", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
    
    };
    

    const posterVideoContainer = {
        display: "flex",
        alignItems: "center" 
    };

    const moviePosterStyle = {
        maxWidth: "290px",
        border: "1px solid #ccc",
        marginRight: "20px", 
        marginLeft: "166px"
    };

    const movieVideoStyle = {
        width: "760px", 
        height: "430px",
         

    };

    const movieCastStyle = {
        marginTop: "5px",
        color: "white",
        fontSize: "1rem" 
        
    };

    const footerStyle = {
        textAlign: "center",
        padding: "10px",
        backgroundColor: "#222", 
        marginTop: "20px" 
    };

    return (
        <div className="page-content" style={pageContent}>
            <div className="movie-details" style={style}>
            <div className="movie-info">
    <div style={{ display: "flex", alignItems: "center" }}>
    <h1 style={{ marginLeft: "166px" }}>{movieInfo.original_title}<span style={{ fontSize: "1rem", marginLeft: "210px" }}>({movieInfo.vote_average})</span></h1>

        <button
            style={{
                marginLeft: "150px",
                padding: "8px 16px",
                backgroundColor: "#FFD700",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "1rem",
                color: "black"
            }}
        >
            Your Rating
        </button>
        <button
            style={{
                marginLeft: "10px",
                padding: "8px 16px",
                backgroundColor: "#FFD700",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "1rem",
                color: "black"
            }}
            onClick={() => addToWatchlist(element.id)}>Add to Watchlist</button>
       

    </div>
    <div style={{ display: "flex", alignItems: "center" }}>
    
    <p style={{ marginLeft: "166px" }}>{movieInfo.release_date} / {movieInfo.runtime}m</p>

</div>


</div>



                <div className="poster-video-container" style={posterVideoContainer}>
                    <div className="movie-poster" style={moviePosterStyle}>
                        <img src={`https://image.tmdb.org/t/p/w1280/${movieInfo.poster_path}`} alt="Movie Poster" style={{ maxWidth: "100%" }} />
                    </div>
                    <div className="movie-video">
                        <iframe
                            width="760"
                            height="815"
                            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1`} 
                            title="YouTube video player"
                            frameBorder="0"
                            allowFullScreen
                            style={movieVideoStyle}
                        ></iframe>
                    </div>
                </div>
                <div className="movie-summary">
                <p style={{ marginLeft: "165px" }}>Genre: {movieInfo.genres && movieInfo.genres[0].name}</p>

                    <p style={{ marginLeft: "165px" }}>{movieInfo.overview}</p>

                </div>
                <hr style={{ width: "100%", borderTop: "1px solid white", marginTop: "3px", marginBottom: "5px" }} /> {/* Horizontal line */}
                <div className="movie-cast" style={movieCastStyle}>
                <p style={{ marginLeft: "165px" }}>Tagline: {movieInfo.tagline}</p>

                    <hr style={{ width: "100%", borderTop: "1px solid white", marginTop: "3px", marginBottom: "5px"}} />
                    <p style={{ marginLeft: "165px" }}> Budget: {movieInfo.budget} $</p>

                </div>
                <div className="footer" style={footerStyle}>
                    &copy; 2023 Your Movie App
                </div>
            </div>
        </div>
    );
};

export default Detail;