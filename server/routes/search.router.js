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

});

module.exports = router;