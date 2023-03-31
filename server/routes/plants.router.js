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
router.get("/", rejectUnauthenticated, (req, res) => {
  console.log('getting all plants')
  const query = `SELECT * FROM "plants"
  WHERE "user_id" = $1
  ORDER BY "dateWatered" ASC
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
  console.log('getting plant details')
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
});

// * put router for updating plant details by item id
router.put('/edit/:id', rejectUnauthenticated, (req, res) => {
  console.log(`req.params:' ${req.params.id}', 'req.body:'`, req.body.data)
  const queryText = `UPDATE "plants" 
  SET "nickname" = $2, "notes" = $3, "dateWatered" = $4, "dateFertilized" = $5, "dateRepotted" = $6, "isOffered" = $7, "image_url" = $8
  WHERE id = $1;`;
  // log to check errors
  console.log(`PUT: in plants put router: editing id is: ${req.params.id}, req.user is: ${req.user.id}`);
  const queryParams = [
    req.params.id,
    req.body.data.nickname,
    req.body.data.notes,
    req.body.data.dateWatered,
    req.body.data.dateFertilized,
    req.body.data.dateRepotted,
    req.body.data.isOffered,
    req.body.data.image_url,
  ];
  console.log("REQ BODY:", queryParams);
    pool
      .query(queryText, queryParams)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log(`PUT router editing details error", ${queryText}, ":" , ${err}`);
        res.sendStatus(500);
      });
});
  
router.put('/offer/:id', rejectUnauthenticated, (req, res) => {
  console.log(`req.params:' ${req.params.id}', 'req.body:'`, req.body.data)
  const queryText = `UPDATE "plants" 
  SET "isOffered" = true
  WHERE id = $1;`;
  // log to check errors
  console.log(`PUT: in plants put router: editing id is: ${req.params.id}, req.user is: ${req.user.id}`);
  const queryParams = [
    req.params.id,
  ];
  console.log("REQ BODY:", queryParams);
    pool
      .query(queryText, queryParams)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log(`PUT router editing details error", ${queryText}, ":" , ${err}`);
        res.sendStatus(500);
      });
});
  
router.put('/claim/:id', rejectUnauthenticated, (req, res) => {
  console.log(`req.params:' ${req.params.id}', 'req.body:'`, req.body.data)
  const queryText = `UPDATE "plants" 
  SET "isOffered" = false, "user_id" = $1
  WHERE id = $2;`;
  // log to check errors
  console.log(`PUT: in plants put router: editing id is: ${req.params.id}, req.user is: ${req.user.id}`);
  const queryParams = [
    req.user.id,
    req.params.id,
  ];
  console.log("REQ BODY:", queryParams);
    pool
      .query(queryText, queryParams)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log(`PUT router editing details error", ${queryText}, ":" , ${err}`);
        res.sendStatus(500);
      });
  });


// delete a plant by id
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const queryText = `DELETE FROM "plants" WHERE "id" = $1`;
  const queryParams = [req.params.id];
  // log id for bugs
  console.log(`IN req.params:' ${req.params.id}', 'queryParams:'`, queryParams)
  pool
    .query(queryText, queryParams)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error completing delete plant query", err);
      res.sendStatus(500);
    });
});


module.exports = router;
