import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  CircularProgress,
  Backdrop,
  Grid,
  Typography,
  TextField,
  InputLabel,
  Input,
  Button,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import "./PlantForm.css";

function PlantForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedPlant = useSelector((store) => store.currentPlant.image_url);
  const [nicknameLabel, setNicknameLabel] = useState("this plant");
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    nickname: "",
    notes: "",
    dateWatered: "",
    dateFertilized: "",
    dateRepotted: "",
    image_url: selectedPlant,
  });

  const handleSubmit = (e) => {
    setLoading(!loading);
    e.preventDefault();
    dispatch({
      type: "ADD_PLANT",
      payload: input,
    });
    history.push("/profile");
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
        sx={{
          px: "20px",
          mx: "20px",
          display: "flex",
          width: 300,
          height: 600,
        }}
      >
        <Grid padding={2} paddingTop={2} paddingBottom={4}>
          <Grid marginLeft={0} marginBottom={0} justifyContent="center">
            <Typography
              variant="h4"
              alignItems="center"
              style={{
                fontSize: 25,
                color: "#23422a",
                padding: "1vh",
              }}
            >
              Add details about your plant
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit} className="plant-form">
            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              marginTop={1}
            >
              <div>
                <InputLabel htmlFor="nickname" align="left">
                  What is your plant's name?
                </InputLabel>
                {/* name */}
                <TextField
                  name="nickname"
                  id="nickname"
                  variant="outlined"
                  color="success"
                  size="small"
                  sx={{ mx: "30px" }}
                  margin="normal"
                  label="Name"
                  type="text"
                  onChange={(e) => handleChange(e, "nickname")}
                  onBlur={() =>
                    setNicknameLabel(input.nickname || "this plant")
                  }
                  value={input.nickname}
                />
              </div>
            </Grid>
            {/* notes */}
            <Grid container direction="row" justifyContent="space-evenly">
              <InputLabel>Any specific notes about your plant?</InputLabel>
              <TextField
                variant="outlined"
                color="success"
                placeholder=""
                onChange={(e) => handleChange(e, "notes")}
                value={input.notes}
                margin="normal"
                label="Notes"
                sx={{ width: 195 }}
                maxRows={4}
                cols="55"
              />

              {/* watering */}
              <InputLabel htmlFor="dateWatered">
                When was {nicknameLabel} last watered?
              </InputLabel>
              <Input
                onChange={(e) => handleChange(e, "dateWatered")}
                value={input.dateWatered}
                color="success"
                size="small"
                label="date"
                name="dateWatered"
                type="date"
                placeholder="Date last watered"
              />
              {/* fertilized */}
              <InputLabel htmlFor="dateFertilized">
                When was {nicknameLabel} last fertilized?
              </InputLabel>
              <Input
                onChange={(e) => handleChange(e, "dateFertilized")}
                value={input.dateFertilized}
                color="success"
                name="dateFertilized"
                type="date"
                placeholder="Date last fertilized"
              />

              {/* repot */}
              <InputLabel htmlFor="dateRepotted">
                When was {nicknameLabel} last repotted?
              </InputLabel>
              <Input
                onChange={(e) => handleChange(e, "dateRepotted")}
                value={input.dateRepotted}
                color="success"
                name="dateRepotted"
                type="date"
                placeholder="Date of last re-pot"
              />
            </Grid>

            {/* image */}
            <Grid container direction="row" justifyContent="left" sx={{ m: 1 }}>
              <InputLabel htmlFor="imageInput" align="left">
                Replace image:
              </InputLabel>
              <Input
                align="right"
                onChange={(e) => handleChange(e, "image_url")}
                value={input.image_url}
                color="success"
                name="imageInput"
                type="text"
                placeholder=" Image URL"
                sx={{
                  width: "85%",
                }}
              />
            </Grid>

            {/* buttons */}
            <Grid
              marginLeft={7.5}
              marginTop={2}
              marginBottom={2}
              sx={{
                alignItems: "center",
              }}
            >
              <Button
                variant="outlined"
                color="success"
                size="small"
                type="button"
                value="Cancel"
                onClick={cancelSubmit}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="success"
                size="small"
                type="submit"
                value="Save"
                onClick={handleSubmit}
              >
                Save
              </Button>
            </Grid>

            {/* loading spinner on backdrop screen */}

            {/* <Backdrop open={loading} className={classes.backdrop}>
            <CircularProgress />
          </Backdrop> */}
          </form>
        </Grid>
      </Paper>
    </>
  );
}

export default PlantForm;
