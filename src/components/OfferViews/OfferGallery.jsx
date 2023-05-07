import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import CommentThread from "../Comments/CommentThread/CommentThread";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  ListItem,
  IconButton,
  Button,
} from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function OfferGallery() {
  const dispatch = useDispatch();
  const history = useHistory();
  const offers = useSelector((store) => store.offers);
  const dataFromUser = useSelector(
    (store) => store.plantDetails.apiDetailsReducer
  );
  const [detailsId, setDetailsId] = useState(0);

  useEffect(() => {
    dispatch({
      type: "FETCH_OFFERS",
    });
  }, []);

  useEffect(() => {
    if (dataFromUser?.id) {
      // fetch all base comments on page load
      dispatch({
        type: "FETCH_BASE_COMMENTS",
        payload: { id: dataFromUser.id },
      });
    }
  }, [dataFromUser]);

  const goBack = () => {
    history.push("/browse");
  };

  return (
    <>
      <Box sx={{ align: "center", width: 500 }} />
      <ImageList
        style={{ fontWeight: "bold" }}
        // sx={{ align: "center", width: 500 }}
      >
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader
            component="div"
            sx={{ mb: 0 }}
            style={{
              fontFamily: "Oleo-Script",
              fontSize: 20,
              marginLeft: "0vh",
            }}
          >
            available plants
          </ListSubheader>
        </ImageListItem>

        {offers.map((offer) => (
          <>
            {detailsId == 0 ? (
              <div onClick={() => setDetailsId(offer.id)}>
                <ImageListItem
                  // onClick={goBack}
                  key={offer.id}
                  // sx={{ maxWidth: 240, ml: "10px", mr: "10px", mt: "5px", mb: "5px" }}
                >
                  <img
                    sx={{
                      height: 240,
                      width: 240,
                    }}
                    component="img"
                    src={offer.image_url}
                  />
                  <ImageListItemBar
                    // onClick={goToOfferDetails}
                    title={offer.nickname}
                    subtitle={`@${offer.username}`}
                    actionIcon={
                      <IconButton
                        sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                        aria-label={`info about ${offer.nickname}`}
                      >
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              </div>
            ) : (
              <>
                {offer.id == detailsId && (
                  <ImageListItem
                    onClick={goBack}
                    key={offer.id}
                    cols={2}
                    sx={{
                      maxWidth: 400,
                      ml: "5px",
                      mr: "5px",
                      mt: "5px",
                      mb: "5px",
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
                        src={offer?.image_url}
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
                        <CardContent
                          align="left"
                          style={{ padding: 5, marginBottom: 0 }}
                        >
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
                        <CardContent
                          align="left"
                          style={{ padding: 5, marginBottom: 0 }}
                        >
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
                        <CardContent
                          align="left"
                          style={{ padding: 5, marginBottom: 0 }}
                        >
                          <Typography
                            variant="subtitle2"
                            style={{ padding: 0 }}
                          >
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
                          onClick={() =>
                            axios.put(`/api/plants/claim/${offer.id}`)
                          }
                        >
                          Claim
                        </Button>
                      </Box>
                    </Card>
                    <CommentThread plant_id={offer.id} />
                  </ImageListItem>
                )}
              </>
            )}
          </>
        ))}
      </ImageList>
    </>
  );
}

export default OfferGallery;
