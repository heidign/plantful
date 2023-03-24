import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlantItem from '../PlantItem/PlantItem';
import { Grid } from '@mui/material';

// * Plant List/Collection component 
function PlantList({ item }) {
    const dispatch = useDispatch();

    // subscribe to plants reducer
  const plantGallery = useSelector(store => store.plants.plantsReducer);
  
    // fetch all plants from db on page load
    useEffect(() => {
        dispatch({
          type: 'FETCH_PLANTS',
          // payload: item?.default_image?.regular_url?.image_url
        });
    }, []);
  
    return (
      <>
        <section className='plants'>
        <Grid
        container
        spacing="2"
      >
            {plantGallery.map((item) => (
            <Grid item xs={12} md={4} sm={6}>
              
                <PlantItem key={item?.id} item={item} />
                </Grid>
          ))}
            </Grid>
          </section>
        </>
    );
};

export default PlantList;
