import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Button, Typography, Box, TextField, InputLabel, Input } from "@mui/material";
function PlantForm() {

    const dispatch = useDispatch();
    const history = useHistory();

    const [input, setInput] = useState({
        nickname: '',
        notes: '',
        dateWatered: '',
        dateFertilized: '',
        dateRepotted: '',
        image_url: '',
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "SUBMIT_PLANT",
      payload: input,
    });
    // history.push("/");
    clearInput();
  };
    const clearInput = () => {
        setInput({
            nickname: '',
            notes: '',
            dateWatered: '',
            dateFertilized: '',
            dateRepotted: '',
            image_url: '',
        });
    };

    const cancelSubmit = () => {
        history.push("/");
    };
    
    return (
    <>
            <form onSubmit={handleSubmit}>
                <Typography type="h3">Add plant details</Typography>
                <div><Input type="text" placeholder="Nickname" /></div>
                <div>
                 <Box
                hiddenLabel
                id="filled-hidden-label-small"
                defaultValue="Small"
                variant="filled"
                size="small"
                    />
                <InputLabel shrink>Any specific notes about your plant?</InputLabel>
                <TextField placeholder=""
                onChange={(e) => handleChange(e, "notes")}
                value={input.notes}
                rows="5"
                cols="55"/>
                </div>
                <div><InputLabel htmlFor="dateWatered">Enter the date this plant was last watered</InputLabel>
                    <Input name="dateWatered" type="date" placeholder="Date last watered" /></div>
                <div><InputLabel htmlFor="dateFertilized">When was this plant last fertilized</InputLabel>
                    <Input name="dateFertilized" type="date" placeholder="Date last fertilized" /></div>
                
                <div><InputLabel htmlFor="dateRepotted">When was this plant last repotted?</InputLabel>
                    <Input name="dateRepotted" type="date" placeholder="Date of last re-pot" /></div>
                <div><Input type="text" placeholder="Image URL" onChange={(e) => handleChange(e, "image_url")} value={input.image_url} /></div> 
            <Button variant="outlined" size="small" type="button" value="Cancel" onClick={cancelSubmit}>Cancel</Button>
            <Button variant="contained" size="small" type="submit" value="Save" onClick={handleSubmit}>Save</Button>
        </form>
    </>
    );
};

export default PlantForm;
