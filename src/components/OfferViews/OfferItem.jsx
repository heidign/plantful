import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  ImageListItem,
  Button,
  CardHeader,
  Grid,
} from "@mui/material";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import CommentThread from "../Comments/CommentThread/CommentThread";

function OfferItem({ offer }) {
  const goBack = () => {
    history.push("/profile");
  };

  console.log(offer);
  return (
    <>
      <ImageListItem
        onClick={goBack}
        key={offer.id}
        cols={2}
        sx={{
          maxWidth: 400,
          margin: "5px",
        }}
      >
        <Card
          onClick={() => setDetailsId(0)}
          sx={{
            ml: "10px",
            mr: "10px",
            mt: "5px",
            mb: "10px",
          }}
        >
          {/* nickname header */}
          <CardHeader title={offer?.nickname} />
          {/* plant image */}
          <CardMedia
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
            style={{
              display: "block",
              height: 240,
              width: "100%",
            }}
            component="img"
            image={offer?.image_url}
            alt="plant-img"
          />
          <Grid sx={{ m: "1rem" }}>
            {/* notes */}
            <CardContent align="center" style={{ padding: 0 }}>
              <Typography
                variant="subtitle2"
                style={{
                  padding: -4,
                  marginTop: 4,
                  marginBottom: -4,
                }}
              >
                <strong>
                  <i>Notes: </i>
                </strong>
                {offer?.notes}
              </Typography>
            </CardContent>

            {/* watering */}
            <CardContent align="left" style={{ padding: 5, marginBottom: 0 }}>
              <Typography
                variant="subtitle2"
                style={{ padding: 0, marginBottom: 0 }}
              >
                {/* <ListItem> */}
                <strong>Last watering: </strong>
                {moment(offer?.dateWatered).format("ll")}
                {/* </ListItem> */}
              </Typography>
            </CardContent>

            {/* fertilized */}
            <CardContent align="left" style={{ padding: 5, marginBottom: 0 }}>
              <Typography
                variant="subtitle2"
                style={{ padding: 0, marginBottom: 0 }}
              >
                {/* <ListItem> */}
                <strong>Fertilized: </strong>
                {moment(offer?.dateFertilized).format("ll")}
                {/* </ListItem> */}
              </Typography>
            </CardContent>

            {/* re-pot */}
            <CardContent align="left" style={{ padding: 5, marginBottom: 0 }}>
              <Typography variant="subtitle2" style={{ padding: 0 }}>
                {/* <ListItem> */}
                <strong>Last Repot: </strong>{" "}
                {moment(offer?.dateRepotted).format("ll")}
                {/* </ListItem> */}
              </Typography>
            </CardContent>
          </Grid>
          <Box align="center">
            <Button
              variant="contained"
              size="small"
              color="success"
              sx={{
                marginBottom: 3,
                marginTop: 0,
                borderRadius: 15,
                align: "center",
              }}
              onClick={() => axios.put(`/api/plants/claim/${offer.id}`)}
            >
              Claim
            </Button>
          </Box>
        </Card>
        <CommentThread plant_id={offer.id} />
      </ImageListItem>
    </>
  );
}

export default OfferItem;
