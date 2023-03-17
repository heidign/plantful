const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

//INJECT ENV VARIABLES
require("dotenv").config();

// * SEARCH: get plants from API 
  router.get('/', (req, res) => {
    req.query.key = process.env.API_KEY;
    axios
      .get( // * Perenual API Search endpoint
        `https://www.perenual.com/api/species-list?key=${process.env.API_KEY}&q=${req.query.q}`
      )
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log(`Error making GET request from API search endpoint`, err);
      });
  });

// * POST searched plant's api_id, user_id to db
router.post('/', (req, res) => {
  const queryText = `INSERT INTO "plants" ("api_id", "nickname", "notes",
    "dateWatered", "dateFertilized", "dateRepotted", "image_url", "user_id")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    console.log("sending search router post: req.body is:", req.body, );
  const queryParams = [
    req.body.api_id,
    req.body.nickname,
    req.body.notes,
    req.body.dateWatered,
    req.body.dateFertilized,
    req.body.dateRepotted,
    req.body.image_url,
    req.user.id
  ];
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