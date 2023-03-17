import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Typography, Box, TextField, InputLabel, Input } from "@mui/material";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

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
      type: "ADD_PLANT",
      payload: input,
    });
    history.push("/");
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
        history.push("/add-plant");
    };
    const handleChange = (e, key) => {
        setInput({ ...input, [key]: e.target.value });
      };
    
    return (
        <>
    <Paper align="center"
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
            <form onSubmit={handleSubmit}>
                <Typography type="h3">Add plant details</Typography>
                <div><TextField variant="outlined" size="small"  label="Nickname" type="text" 
                    onChange={(e) => handleChange(e, "nickname")}
                    value={input.nickname} /></div>
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
                        label="Notes"
                        id="outlined-size-small"
                        defaultValue="Small"
                        size="small"
                        rows="5"
                    cols="55"/>
                </div>
                <div><InputLabel htmlFor="dateWatered">Enter the date this plant was last watered</InputLabel>
                    <Input onChange={(e) => handleChange(e, "dateWatered")} value={input.dateWatered}
                        variant="filled" size="small"  label="date" name="dateWatered" type="date" placeholder="Date last watered" /></div>
                <div><InputLabel htmlFor="dateFertilized">When was this plant last fertilized?</InputLabel>
                    <Input onChange={(e) => handleChange(e, "dateFertilized")} value={input.dateFertilized}
                        name="dateFertilized" type="date" placeholder="Date last fertilized" /></div>
                <div><InputLabel htmlFor="dateRepotted">When was this plant last repotted?</InputLabel>
                    <Input onChange={(e) => handleChange(e, "dateRepotted")} value={input.dateRepotted}
                        name="dateRepotted" type="date" placeholder="Date of last re-pot" /></div>
                <div><Input onChange={(e) => handleChange(e, "image_url")} value={input.image_url}
                    type="text" placeholder="Image URL" /></div> 
            <Button variant="outlined" size="small" type="button" value="Cancel" onClick={cancelSubmit}>Cancel</Button>
            <Button variant="contained" size="small" type="submit" value="Save" onClick={handleSubmit}>Save</Button>
                </form>
                </Paper>
    </>
    );
};

export default PlantForm;
