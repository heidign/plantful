import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
} from "@mui/material";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";


function OfferItem() {
  const dispatch = useDispatch();
  const history = useHistory();
  const offers = useSelector((store) => store.offers);

  useEffect(() => {
    dispatch({
      type: "FETCH_OFFERS",
    });
  }, []);

  const goBack = () => {
    history.push("/profile");
  };

  return (
    <>
      <Box>
        <h3>Available plants</h3>
        {offers.map((offer) => (
          <Card
            key={offer.id}
            // onClick={goBack}
            sx={{ maxWidth: 240, ml: "10px", mr: "10px", mt: "5px", mb: "5px" }}
          >
            <CardMedia
              sx={{
                height: 240,
                width: 240,
              }}
              component="img"
              src={offer.image_url}
            />
            <CardContent>
              <Typography size="h4" style={{ fontWeight: "bold" }}>
                {offer.nickname}
                {offer.common_name}
              </Typography>
            </CardContent>

            <ImageListItemBar
              title={offer.nickname}
              subtitle={offer.user}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${offer.title}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />

            {/* <IconButton aria-label="add to favorites">
                <FavoriteBorderIcon />
              </IconButton> */}
            <Button
              variant="contained"
              size="small"
              color="success"
              onClick={() => axios.put(`/api/plants/claim/${offer.id}`)}
            >
              Claim
            </Button>
          </Card>
        ))}
      </Box>
    </>
  );
}

export default OfferItem;
