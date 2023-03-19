const express = require("express");
const pool = require("../modules/pool");
const axios = require("axios");
const router = express.Router();
const { rejectUnauthenticated } = require("../modules/authentication-middleware");

// INJECT ENV VARIABLES
require("dotenv").config();

/**
 * GET route, getting all from db
 **/
router.get("/", (req, res) => {
  const query = `
  SELECT p.* FROM plants p
  WHERE user_id = $1
  ;`
;
  pool
    .query(query, [req.user.id])
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.error("GET all plants failed", err);
    });
});

// * router getting details from API details endpoint and db
router.get(`/details/:id`, async (req, res) => {
  // req.query.key = process.env.API_KEY;
  req.query.key = process.env.API_KEY2;
  let id = req.params.id;

  const query = `
  SELECT * FROM plants
  WHERE id = $1
  ;`
;
  try {
    const dbRes = await pool.query(query, [id])
    const data = dbRes.rows[0]
    const apiId = data.api_id

    const detailsRes = await axios.get(
      `https://perenual.com/api/species/details/${apiId}?key=${req.query.key}`
    )
      
    res.send({
      dataFromUser: data,
      details: detailsRes.data
    })

    res.send(dbRes.rows[0]);

  } catch (err) {
    console.error("Error: get all details router", err);
    res.sendStatus(500);
  }

});

// * router for server-side get details from db
// router.get("/:id",  (req, res) => {
//   const query = `
//   SELECT * FROM plants
//   WHERE id = $1
//   ;`;
//   pool
//     .query(query, [req.params.id])
//     .then((dbRes) => {
//       res.send(dbRes.rows[0]);
//       console.log('Results plants router GET:', req.params.id)
//     })
//     .catch((err) => {
//       console.error('Error: in get all details router', err);
//       res.sendStatus(500);
//     });
// });

// delete a plant
router.delete("/:id", (req, res) => {
  const queryText = "DELETE FROM plants WHERE id=$1";
  pool
    .query(queryText, [req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error completing DELETE plant query", err);
      res.sendStatus(500);
    });
});


module.exports = router;
