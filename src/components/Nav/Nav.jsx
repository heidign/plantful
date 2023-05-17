import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <p
          className="nav-title"
          style={{ fontFamily: "Dangwa", fontSize: 38, marginLeft: "1vh" }}
        >
          Plantful
        </p>
      </Link>
    
      <div  style={{ marginRight: "1vh" }}>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/add-plant">
              Add Plant
            </Link>

            {/* <Link className="navLink" to="/user">
              Home
            </Link> */}

            <Link className="navLink" to="/info">
              Info
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        {/* <Link className="navLink" to="/about">
          About
        </Link> */}
      </div>
    </div>
  );
}

export default Nav;
