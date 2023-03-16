const express = require('express');
const pool = require('../modules/pool');
const axios = require("axios");
const router = express.Router();

// INJECT ENV VARIABLES
require("dotenv").config();

/**
 * GET route 
 **/
router.get('/', (req, res) => {
  const query = `
  SELECT * FROM "plants"
  JOIN "user" ON "user".id = "user_id";
  `
  pool.query(query)
    .then((dbRes) => {
    res.send(dbRes.rows);
  })
  .catch((err) => {
    res.sendStatus(500);
    console.error('GET all plants failed', err);
  })
});


/**
 * POST route 
 **/
// * add a new plant to db
router.post("/", (req, res) => {
  const queryText = `INSERT INTO "plants" ("api_id", "user_id")
  VALUES ($1, '1')`;
  console.log("sending post: req.body is:", req.body);
  const queryParams = [req.body.payload];
  pool
    .query(queryText, queryParams)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("Could not execute SQL query", queryText, " : ", error);
      res.sendStatus(500);
    });
});

module.exports = router;