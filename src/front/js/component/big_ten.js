import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/movie-card.css";
import PropTypes from "prop-types";
import "../../styles/big_ten.css";

export const BigTen = (props) => {
    const { store, actions } = useContext(Context);

    return (
        <div className="big-image-wrapper">
            <Link to={`/detail/${props.id}`}>
                <img className="main-topt-img" src={props.image} alt="placeholder image" />
                <div className="main-floating-title">
                    <h1>#1</h1>
                    <h3 className="bold-fl-title">{props.title}</h3>
                </div>
            </Link>
        </div>
    );
};
