import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import "../../styles/trailer.css";

export const Trailer = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [videoKey, setVideoKey] = useState();

    useEffect(() => {
        actions.getTrailerForMovie(params.movieId, setVideoKey);
    }, [setVideoKey]);

    return (
        <div className="container">
            <div className="trailer-full-page">
                        <iframe
                            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1`}
                            title="YouTube video player"
                            allowFullScreen
                        ></iframe>
                    </div>
        </div>
    );
};

export default Trailer;