import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import {
  Box,
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
  const [detailsId, setDetailsId] = useState(0);

  useEffect(() => {
    dispatch({
      type: "FETCH_OFFERS",
    });
  }, []);

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
          <ListSubheader component="div" sx={{ mb: 0 }} style={{ fontFamily: "Oleo-Script", fontSize: 20, marginLeft: "1vh" }}>
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
                  <ImageListItem onClick={goBack}
                      key={offer.id}
                      cols={2}
                    sx={{
                      maxWidth: 400,
                      ml: "5px",
                      mr: "10px",
                      mt: "5px",
                      mb: "5px",
                    }}
                  >
                    <Card
                      onClick={() => setDetailsId(0)}
                      sx={
                        {
                          ml: "10px",
                          mr: "10px",
                          mt: "5px",
                          mb: "10px",
                        }
                      }
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
                        // loading="lazy"
                        style={{
                          // borderRadius: "10px",
                          display: "block",
                          height: 240,
                          width: "100%",
                        }}
                        component="img"
                        src={offer?.image_url}
                        alt="plant image from user"
                      />

                      {/* common name */}
                      <CardContent>
                        <Typography size="h4" style={{ fontWeight: "bold" }}>
                          {offer?.common_name}
                        </Typography>
                      </CardContent>
                      <Box>
                        {/* notes */}
                        <CardContent>
                          <Typography size="h4" style={{ padding: 0 }}>
                            <strong> Notes:</strong> {offer?.notes}
                          </Typography>
                          {/* <ListItem>{offer?.notes}</ListItem> */}
                        </CardContent>
                        {/* watering */}
                        <CardContent>
                          <Typography size="h4" style={{ fontWeight: "bold" }}>
                            Last watering:{" "}
                            {moment(offer?.dateWatered).format("ll")}
                          </Typography>
                        </CardContent>

                        {/* fertilized */}
                        <CardContent>
                          <Typography size="h4" style={{ fontWeight: "bold" }}>
                            Fertilized:{" "}
                            {moment(offer?.dateFertilized).format("ll")}
                          </Typography>
                        </CardContent>

                        {/* re-pot */}
                        <CardContent>
                          <Typography size="h4" style={{ fontWeight: "bold" }}>
                            Last Re-potting:{" "}
                            {moment(offer?.dateRepotted).format("ll")}
                          </Typography>
                        </CardContent>
                      </Box>
                      <Box align="right">
                        <Button
                          variant="contained"
                          size="small"
                          color="success"
                          sx={{
                            mx: 2,
                            my: 3,
                            borderRadius: 15,
                            align: 'center',
                          }}
                          onClick={() =>
                            axios.put(`/api/plants/claim/${offer.id}`)
                          }
                        >
                          Claim
                        </Button>
                      </Box>
                    </Card>
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
