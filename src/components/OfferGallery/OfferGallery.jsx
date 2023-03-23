import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function OfferGallery() {
    const dispatch = useDispatch();
    const history = useHistory();
   
    useEffect(() => {
        dispatch({
            type: 'FETCH_OFFERS',
        })
    }, [])
   
    return (
        <h3>Available Plants</h3>
    );
};


export default OfferGallery;