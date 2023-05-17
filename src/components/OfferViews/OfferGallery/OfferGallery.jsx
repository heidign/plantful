import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import OfferItem from "../OfferItem/OfferItem";

function OfferGallery() {
  const dispatch = useDispatch();
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

  return (
    <>
      <Box sx={{ align: "center", width: 500 }} />
      <ImageList className="offer-list"
        style={{ fontWeight: "bold" }}
        // sx={{ align: "center", width: 500}}
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
              <div
                onClick={() => {
                  setDetailsId(offer.id);
                  console.log(offer.id);
                }}
              >
                <ImageListItem key={offer.id}>
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
                  <>
                    <OfferItem offer={offer} />
                  </>
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
