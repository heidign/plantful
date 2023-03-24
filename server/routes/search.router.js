const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//INJECT ENV VARIABLES
require("dotenv").config();

// * SEARCH: get plants from API 
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('getting searched plants')
    req.query.key = process.env.API_KEY;
    // req.query.key = process.env.API_KEY2;
    // req.query.token = process.env.API_TOKEN; 
    axios
      .get( 
        `https://www.perenual.com/api/species-list?key=${process.env.API_KEY}&q=${req.query.q}`
        // `https://trefle.io/api/v1/species/search?token=${process.env.API_TOKEN}&q=${req.query.q}&limit=15`
      )
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log(`Error making GET request from API search endpoint`, err);
      });
  });


// * POST searched plant's api_id, user_id, and rest of details to db
router.post('/', rejectUnauthenticated, (req, res) => {
  const queryText = `INSERT INTO "plants" ("api_id", "nickname", "notes",
    "dateWatered", "dateFertilized", "dateRepotted", "isOffered", "image_url", "user_id")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
  console.log('sending search router post: req.body is:', req.body, 'req.user is:', req.user.id );
  const queryParams = [
    req.body.api_id,
    req.body.nickname,
    req.body.notes,
    req.body.dateWatered,
    req.body.dateFertilized,
    req.body.dateRepotted,
    req.body.isOffered,
    req.body.image_url,
    req.user.id,
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