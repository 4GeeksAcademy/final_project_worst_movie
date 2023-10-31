import React, {useContext} from "react";
import { Link } from "react-router-dom";
import "../../styles/watchlist-item.css";
import { Context } from "../store/appContext";

export const Watchlist_Item = (props) => {
	const { store, actions } = useContext(Context);

	return (
			<div className="main-wrapper">
                <div className="d-flex">
					<Link to={`/detail/${props.id}`}>
						<img src={props.img_src} className="img-poster" alt="..."/>
					</Link>
					<div className="item-info ms-3 d-flex justify-content-between">
						<div className="m-4">
							<h6 className="watchlist-item-title"><strong>{props.title}</strong></h6>
							<p className="watchlist-rating">{props.rating} / 10 <i className="yellow fas fa-star"></i></p>
							<Link to={`/trailer/${props.id}`} style={{ textDecoration: 'none' }}>
								<h6 className="trailer-button"><i className="red fas fa-play-circle"></i> Watch Trailer</h6>
							</Link>
						</div>
						<i className="delete-icon fa-solid fa-delete-left me-4" onClick={() => actions.deleteFromWatchlist(props, props.index)}></i>
					</div>
				</div>
			</div>
	);
};
