const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const { rejectUnauthenticated } = require("../modules/authentication-middleware");


/**
 * GET route, getting all offers === true
 **/
router.get("/", rejectUnauthenticated, (req, res) => {
    console.log('getting all plants')
    const query = `SELECT * FROM plants
    WHERE "isOffered" = true
    ORDER BY id ASC
    ;`;
    pool
      .query(query)
      .then((dbRes) => {
        res.send(dbRes.rows);
      })
      .catch((err) => {
        res.sendStatus(500);
        console.error("GET all offers failed", err);
      });
});
  
module.exports = router;