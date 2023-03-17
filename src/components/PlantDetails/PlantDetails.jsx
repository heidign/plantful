import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
//  material ui
import { ClipLoader } from "react-spinners";
import { Button } from "@mui/material";
import EditDetails from "./EditDetails";

function PlantDetails() {
    const history = useHistory();
    // * getting id key from path params
    const { id } = useParams();
    const dispatch = useDispatch();
    const plantDetails = useSelector((store) => store.currentPlant);
    // * extracting id of current plant
    const apiData = useSelector((store) => store.currentPlant.id); 
    const loadingDetails = useSelector((store) => store.currentPlant.loading);
    const [edit, setEdit] = useState(false);

    useEffect

    return (
        <>
        <h3>Plant details</h3>
        <EditDetails />
        </>
    );
};

export default PlantDetails;