import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// mui
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function UserPage() {
  const user = useSelector((store) => store.user);
  const plants = useSelector((store) => store.plants.plantsReducer);
  const history = useHistory();

  return (
    <div className="container" style={{ padding: "2vh" }}>
      {plants.length == 0 && (
        <>
          <h2
            className="nav-title"
            style={{
              fontFamily: "Oleo-Script",
              color: "#375379",
              fontSize: 32,
            }}
          >
            Hello, @{user.username}!
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              fontFamily: "Dangwa",
              fontSize: 40,
              color: "#dc445c",
              borderRadius: "1em 0",
              backgroundColor: "#f8f1e4",
              padding: "7vh",
              alignItems: "center"
            }}
          >
            <IconButton
              onClick={() => {
                history.push("/add-plant");
              }}
              size="large"
              sx={{ mx: '1rem', background: "#aaaaaa", width: 50, height: 50, borderRadius: "50%" }}
              
            >
              <AddIcon fontSize="large" />
            </IconButton>
            <h4
              style={{
                fontFamily: "Roboto",
                color: "#375379",
                fontSize: 22,
                marginLeft: 1,
              }}
            >
              {" "}
              add a new plant to your collection
            </h4>
          </div>
        </>
      )}
      <br></br>
    </div>
  );
}

export default UserPage;
