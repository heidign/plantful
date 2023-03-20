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
  const query = `SELECT * FROM plants
  WHERE user_id = $1
  ORDER BY id DESC
  ;`;
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

// router getting details from API details endpoint and db
router.get(`/details/:id`, rejectUnauthenticated, async (req, res) => {
  req.query.key = process.env.API_KEY;
  // req.query.key = process.env.API_KEY2;
  // * req.query.token = process.env.API_TOKEN;
  let id = req.params.id;
  console.log('REQ.PARAMS.ID:', req.params.id);

  const query = `
  SELECT * FROM plants
  WHERE id = $1
  ;`
;
  try {
    const dbRes = await pool.query(query, [id])
    const data = dbRes.rows[0]
    const apiId = data.api_id
    // const trefleId = data.api_id

    const detailsRes = await axios.get(
      `https://perenual.com/api/species/details/${apiId}?key=${req.query.key}`
      // `https://trefle.io/api/v1/species/${trefleId}?token=${req.query.token}`
    )
      
    res.send({
      dataFromUser: data,
      details: detailsRes.data
    })

    // res.send(dbRes.rows[0]);

  } catch (err) {
    console.error("Error: get all details router", err);
    res.sendStatus(500);
  }
  // finally {
  //   connection.release();
  //   res.end();
  // }
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

// * put router for updating plant details by item id
router.put('/edit/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `UPDATE "plants" 
  SET nickname = $3, notes = $4, dateWatered = $5, dateFertilized = $6, dateRepotted = $7, image_url = $8
  WHERE id = $1 AND user_id = $2`;
  // log to check errors
  console.log(`🔸PUT: in plants put router: editing id is: ${req.params.id}, req.user is:,${req.user.id}`);
  const queryParams = [
    req.params.id,
    req.user.user_id,
    req.body.nickname,
    req.body.notes,
    req.body.dateWatered,
    req.body.dateFertilized,
    req.body.dateRepotted,
    req.body.image_url
  ];
    pool
      .query(queryText, queryParams)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log(`PUT router editing details error", ${queryText}, ":", ${err}`);
        res.sendStatus(500);
      });
  });


// delete a plant
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const queryText = `DELETE FROM "plants" WHERE "id"=$1 AND "user_id"=$2`;
  pool
    .query(queryText, [req.params.id], [req.user.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error completing delete plant query", err);
      res.sendStatus(500);
    });
});


module.exports = router;
