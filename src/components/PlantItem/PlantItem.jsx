import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, Typography, Card, CardMedia, CardContent, CardActions, Collapse, IconButton } from "@mui/material";
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FavoriteOutlined } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlantDetails from "../PlantDetails/PlantDetails";

// * plant item from db
function PlantItem({ item }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const detailFromAPI = useSelector((store) => store.plantDetails.data.details);
  // const detailsFromDb = useSelector(store => store.plants.plantsReducer);

  const handleClick = () => {
    goToDetailsPage();
  };

  const goToDetailsPage = () => {
    history.push(`/details/${item.id}`);
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  

  const [expanded, setExpanded] = useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
      // history.push(`/details/${item.id}`);
    };
  
  return (
    <>
      <div>
      <Box>
        <Card onClick={goToDetailsPage}
          sx={{ maxWidth: 240, ml: "10px", mr: "10px", mt: "5px", mb: "5px" }}
        >
            <CardMedia
            sx={{
              height: 240,
              width: 240,
            }}
            component="img"
            src={item.image_url}
          />

          <CardContent>
            <Typography size="h4" style={{ fontWeight: "bold" }}>
                {item.nickname}
                {item.common_name}
            </Typography>
          </CardContent>
        
          <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteBorderIcon />
            </IconButton>
       
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse onClick={handleExpandClick} in={expanded} timeout="auto" unmountOnExit>
              {/* <PlantDetails item={item} /> */}
              {/* <p><i>{detailFromAPI}</i></p> */}
          </Collapse>
          </Card>
        </Box>
      </div>
      </>
    );
};
export default PlantItem;
