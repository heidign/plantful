import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  // subscribe to plants reducer
  const plants = useSelector(store => store.plants.plantsReducer);

  // fetch all plants details on page load
  useEffect(() => {
      dispatch({
          type: 'FETCH_PLANTS'
      });
  }, []);

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      {plants && plants.map((plant) => (
         <div key={plant.id} >{plant.nickname}</div>
        ))}
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
