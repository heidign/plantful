import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, Button } from "@mui/material";
import Icon from "@mdi/react";
import { mdiReply } from "@mdi/js";

function CommentForm({
  plant_id,
  parent_id,
  setReplyId,
  handleAddThreadClick,
}) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState({
    plant_id,
    parent_id,
    comment: "",
  });

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (comment.comment === "") {
      return;
    }
    dispatch({
      type: "POST_COMMENT",
      payload: comment,
    });
    clearInput();
    setReplyId(-1);
  };

  // clearing text input field
  const clearInput = () => {
    // spreading comment object to preserve ids, clearing comment input value
    setComment({ ...comment, comment: "" });
  };

  return (
    <>
      <div className="comments-container">
        <form onSubmit={handleSubmitComment}>
          <TextField
            type="text"
            value={comment.comment}
            onChange={(e) =>
              setComment({ ...comment, comment: e.target.value })
            }
            placeholder={parent_id ? "Reply" : "New Comment"}
            style={{ width: "40%", marginLeft: "5rem", marginRight: "0rem" }}
          />
          <Button type="submit" color="success">
            <Icon path={mdiReply} size={1} color="#23422a" />
            {parent_id ? " Reply" : " Post"}
          </Button>
          {/* Conditionally rendering cancel button if parent id exists */}
          {parent_id ? (
            <Button color="success" onClick={() => setReplyId(-1)}> Cancel</Button>
          ) : (
            ""
          )}
        </form>
      </div>
    </>
  );
}

export default CommentForm;
