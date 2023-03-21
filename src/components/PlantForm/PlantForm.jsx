import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Button,
  Typography,
  Box,
  TextField,
  InputLabel,
  Input,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import "./PlantForm.css"

function PlantForm() {
  const selectedPlant = useSelector((store) => store.currentPlant.image_url);
    // const selectedPlant = useSelector((store) => store.currentPlant);
  const dispatch = useDispatch();
  const history = useHistory();
  const [nicknameLabel, setNicknameLabel] = useState("this plant");

  const [input, setInput] = useState({
    nickname: "",
    notes: "",
    dateWatered: "",
    dateFertilized: "",
    dateRepotted: "",
    image_url: selectedPlant,
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
      nickname: "",
      notes: "",
      dateWatered: "",
      dateFertilized: "",
      dateRepotted: "",
      image_url: "",
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
      <Paper
        align="center"
        // component="form"
        sx={{
          px: "20px",
          mx: "20px",
          display: "flex",
          width: 300,
          height: 600,
        }}
      >
        <form onSubmit={handleSubmit} className="plant-form">
          <Typography type="h3">Add details about your plant...</Typography>
          <div>
            {/* <InputLabel htmlFor="nickname">Nickname</InputLabel> */}
            <TextField
              name="nickname"
              id="nickname"
              variant="outlined"
              size="small"
              sx={{ mx: "30px" }}
              label="Nickname"
              type="text"
              onChange={(e) => handleChange(e, "nickname")}
              onBlur={() => setNicknameLabel(input.nickname || "this plant")}
              value={input.nickname}
            />
          </div>

          <div>
            <InputLabel>Any specific notes about your plant?</InputLabel>
            <TextField
              placeholder=""
              onChange={(e) => handleChange(e, "notes")}
              value={input.notes}
              label="Notes"
              sx={{ width: 195 }}
              size="small" 
                maxRows={4}
              cols="55"
            />
          </div>

          <div>
            <InputLabel htmlFor="dateWatered">
              When was {nicknameLabel} last watered?
            </InputLabel>
            <Input
              onChange={(e) => handleChange(e, "dateWatered")}
              value={input.dateWatered}
              variant="filled"
              size="small"
              label="date"
              name="dateWatered"
              type="date"
              placeholder="Date last watered"
            />
          </div>

          <div>
            <InputLabel htmlFor="dateFertilized">
              When was {nicknameLabel} last fertilized?
            </InputLabel>
            <Input
              onChange={(e) => handleChange(e, "dateFertilized")}
              value={input.dateFertilized}
              name="dateFertilized"
              type="date"
              placeholder="Date last fertilized"
            />
          </div>
        <div>
          <InputLabel htmlFor="dateRepotted">
            When was {nicknameLabel} last repotted?
          </InputLabel>
          <Input
            onChange={(e) => handleChange(e, "dateRepotted")}
            value={input.dateRepotted}
            name="dateRepotted"
            type="date"
            placeholder="Date of last re-pot"
          />
        </div>
          <InputLabel htmlFor="imageInput">
            Replace default image:
            <Input
              onChange={(e) => handleChange(e, "image_url")}
              value={input.image_url}
              name="imageInput"
              type="text"
              placeholder=" Image URL"
            />
          </InputLabel>

          <div>
            <Button
              variant="outlined"
              size="small"
              type="button"
              value="Cancel"
              onClick={cancelSubmit}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              type="submit"
              value="Save"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
        </form>
      </Paper>
    </>
  );
}

export default PlantForm;
