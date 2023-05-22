import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Box,
  Paper,
  Typography,
  FormControlLabel,
  InputLabel,
  Input,
  TextField,
  Button,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

function EditDetailsForm() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const editPlant = useSelector((store) => store.editPlant);
  const offeredStatus = useSelector((store) => store.editPlant.isOffered);

  function handleChange(e, key) {
    dispatch({
      type: "EDIT_ONCHANGE",
      payload: { property: key, value: e.target.value },
    });
    if (key == "isOffered") {
      dispatch({
        type: "EDIT_ONCHANGE",
        payload: { property: key, value: e.target.checked },
      });
    }
  }

  // called when the submit button is clicked
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "UPDATE_PLANT",
      payload: { newData: editPlant, id: Number(id) },
    });
    dispatch({
      // dispatch from put in saga
      type: "CLEAR_EDIT",
      payload: e.target.value,
    });
    // refresh will happen with useEffect on `submit`
    // bring user back to profile
    history.push("/profile");
  };
  // handle cancel edit, send user back to details view of plant
  const goBackToDetails = () => {
    history.goBack(`/details/${id}`);
  };

  //  dispatch to saga to fire action, send id
  const dispatchDelete = () => {
    dispatch({
      type: "DELETE_PLANT",
      payload: Number(id),
      // bring user back to profile after delete
      cb: () => { history.push("/profile") }
    });
};
  return (
    <>
      {/* <Grid padding={0.6} paddingTop={4} paddingBottom={4}>
        <Grid marginLeft={2} marginBottom={2} justifyContent="center">
          <Typography
            variant="h4"
            alignItems="center"
            style={{
              fontSize: 25,
              color: "#23422a",
              padding: "2vh",
            }}
          >
            dd care or offer your plant
          </Typography>
        </Grid> */}
      <Paper
        align="center"
        sx={{
          px: "20px",
          mx: "20px",
          display: "flex",
          width: 300,
          height: 650,
        }}
      >
        <Grid padding={0} paddingTop={4} paddingBottom={4}>
          <Grid marginLeft={-1} marginBottom={1} justifyContent="center">
            <Typography
              variant="h4"
              alignItems="center"
              style={{
                fontSize: 23,
                color: "#23422a",
                padding: "1vh",
                marginTop: 1,
              }}
            >
              Add Care or Offer Your Plant
            </Typography>
          </Grid>
          <Box
            sx={{
              align: "center",
            }}
          >
            <Button
              color="success"
              size="small"
              variant="outlined"
              onClick={dispatchDelete}
              sx={{ borderRadius: "10em", m: 1 }}
            >
              Delete Plant
            </Button>
          </Box>
          <form onSubmit={handleSubmit}>
            <TextField
              onChange={(e) => handleChange(e, "nickname")}
              placeholder="Name"
              property="nickname"
              value={editPlant.nickname}
              size="small"
              color="success"
              margin="normal"
            />
            <div>
              <InputLabel htmlFor="dateWatered">Date last watered:</InputLabel>
              <Input
                onChange={(e) => handleChange(e, "dateWatered")}
                value={editPlant.dateWatered}
                size="small"
                color="success"
                label="date watered*"
                name="dateWatered"
                type="date"
                placeholder="Date last watered"
              />
            </div>
            <div>
              <InputLabel htmlFor="dateFertilized">
                Date last fertilized:
              </InputLabel>
              <Input
                onChange={(e) => handleChange(e, "dateFertilized")}
                value={editPlant.dateFertilized}
                name="dateFertilized"
                type="date"
                placeholder="Date last fertilized"
              />
            </div>
            <div>
              <InputLabel htmlFor="dateRepotted">
                Date of last re-pot?
              </InputLabel>
              <Input
                color="success"
                onChange={(e) => handleChange(e, "dateRepotted")}
                value={editPlant.dateRepotted}
                name="dateRepotted"
                type="date"
                placeholder="Date of last re-pot"
              />
            </div>
            {/* image input */}
            <InputLabel htmlFor="imageInput">
              Replace image:
              <Input
                color="success"
                onChange={(e) => handleChange(e, "image_url")}
                value={editPlant.image_url}
                name="imageInput"
                type="text"
                placeholder="Image URL"
              />
            </InputLabel>
            {/* Notes */}
            <Grid
              flexGrow={1}
              marginTop={2}
              paddingLeft={1}
              justifyContent="center"
            >
              <InputLabel htmlFor="Notes">
                Any specfic instructions about this plant?
              </InputLabel>
              <TextField
                onChange={(e) => handleChange(e, "notes")}
                placeholder="Notes"
                name="Notes"
                value={editPlant.notes}
                color="success"
                multiline
                maxRows={4}
                margin="normal"
              />

              {/* check box for plant offer */}
              <FormControlLabel
                control={
                  <Checkbox
                    color="success"
                    checked={editPlant.isOffered}
                    onChange={(e) => handleChange(e, "isOffered")}
                    value={Boolean(editPlant.isOffered)}
                    name="isOffered"
                  />
                }
                label="Offer Plant"
                labelPlacement="start"
              />
            </Grid>
            {/* buttons */}
            <Grid marginLeft={1} marginBottom={1} >
              <Button
                onClick={goBackToDetails}
                color="success"
                size="small"
                variant="outlined"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                color="success"
                size="small"
                variant="contained"
              >
                Save
              </Button>
            </Grid>
          </form>
        </Grid>
      </Paper>
    </>
  );
}

export default EditDetailsForm;
