import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, InputLabel, Input, } from "@mui/material";

function EditDetailsForm() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const editPlant = useSelector((store) => store.editPlant);

  function handleChange(e, name) {
    dispatch({
      type: "EDIT_ONCHANGE",
      payload: { property: name, value: e.target.value },
    });
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
    // bring user back to plant gallery
    history.push("/");
  };
  // handle cancel edit, send user back to details view of plant
  const goBackToDetails = () => {
    history.goBack(`/details/${id}`);
  };

  //  dispatch to saga to fire action, send id
  const dispatchDelete = () => {
    dispatch({ type: "DELETE_PLANT", payload: Number(id) });
  };

  return (
    <>
      <h2>Edit Plant</h2>
      <Button variant="outlined" onClick={dispatchDelete}>Delete Plant</Button>
      <form onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => handleChange(e, "nickname")}
          placeholder="nickname"
          property="nickname"
          value={editPlant.nickname}
          size="small"
        />
        <TextField
          onChange={(e) => handleChange(e, "notes")}
          placeholder="notes"
          value={editPlant.notes}
          size="small"
        />

        <div>
          <InputLabel htmlFor="dateWatered">
            Date last watered:
          </InputLabel>
          <Input
            onChange={(e) => handleChange(e, "dateWatered")}
            value={editPlant.dateWatered}
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
            onChange={(e) => handleChange(e, "dateRepotted")}
            value={editPlant.dateRepotted}
            name="dateRepotted"
            type="date"
            placeholder="Date of last re-pot"
          />
        </div>

        <InputLabel htmlFor="imageInput">
          Replace image:
          <Input
            onChange={(e) => handleChange(e, "image_url")}
            value={editPlant.image_url}
            name="imageInput"
            type="text"
            placeholder="Image URL"
          />
        </InputLabel>

        <Button onClick={goBackToDetails}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Update Plant
        </Button>
      </form>
    </>
  );
}

export default EditDetailsForm;
