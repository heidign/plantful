import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlantItem from '../PlantItem/PlantItem';

// * Plant List/Collection component 
function PlantList() {
    const dispatch = useDispatch();

    // subscribe to plants reducer
    const plantGallery = useSelector(store => store.plants.plantsReducer);
  
    // fetch all plants from db on page load
    useEffect(() => {
        dispatch({
            type: 'FETCH_PLANTS'
        });
    }, []);
  
    return (
      <>
        <section className='plants'>
          {plantGallery.map((plant) => (
            <PlantItem key={plant.id} plant={plant} />
            ))}
          </section>
        </>
    );
};

export default PlantList;
