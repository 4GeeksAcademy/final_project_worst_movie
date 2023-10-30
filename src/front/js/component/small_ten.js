import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/movie-card.css";
import PropTypes from "prop-types";
import "../../styles/small_ten.css";

export const SmallTen = (props) => {
    const { store, actions } = useContext(Context);

    return (
        <div className="col-4 image-wrapper">
            <Link to={`/detail/${props.id}`}>
                <img className="sec-topt-img" src={props.image} alt="placeholder image" />
                <div className="floating-title">
                    <h4>#{props.number}</h4>
                    <h6 className="bold-fl-title">{props.title}</h6>
                </div>
            </Link>
        </div>
    );
};
