import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/movie-card.css";
import PropTypes from "prop-types";
import { Watchlist_Item } from "./watchlist-item";

export const MovieCard = (props) => {
    const { store, actions } = useContext(Context);

	return (
			<div className="card-wrapper container d-flex row">
                <div className="card p-0 col-3 mx-2">
                    <img src={`https://image.tmdb.org/t/p/original${props.img_src}`} className="img-card" alt="..."/>
                    <div className="card-body m-2 content">
                        <h4 className="card-title movie_title mb-3">{props.title}</h4>
                        <div className="card-bottom">
                            <div className="d-flex mb-3">
                                <p className="rating m-0 p-0">{props.rating} / 10 <i className="yellow fas fa-star ms-2"></i></p>
                                <Link to={`/detail/${props.id}`}>
                                <button type="button" className="info-button btn btn-outline-light">More Info!</button>
                                </ Link>
                            </div>
                            <h6 className="lighter watchl-btn" onClick={() => {store.token ? actions.addToWatchlist(props) : alert("Please, sign in or register first! :)")}}><i className="yellow fas fa-plus"></i> Add to watchlist</h6>
                            <Link to={`/trailer/${props.id}`} style={{ textDecoration: 'none' }}>
                               <h6 className="trailer-btn lighter"><i className="red fas fa-play-circle"></i> Watch Trailer</h6> 
                            </Link>
                            
                        </div>
                        
                    </div>
                </div>
			</div>
	);
};


/* Watchlist, trailer and more info should be links to other views */
